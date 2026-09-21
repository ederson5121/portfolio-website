'use strict';

/* ==============================================================
   Ederson Serafim — Portfolio
   JavaScript puro (sem dependências), modular por funcionalidade.
   Carregado com `defer`: o DOM já está disponível quando este
   ficheiro corre, por isso os módulos abaixo podem inicializar-se
   diretamente, sem esperar por DOMContentLoaded.
   ============================================================== */

const prefersReducedMotion = window.matchMedia
  ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
  : false;

function debounce(fn, wait) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}

function throttleRAF(fn) {
  let ticking = false;
  return (...args) => {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(() => {
        fn(...args);
        ticking = false;
      });
    }
  };
}

/* ---------------------------------------------------------------
   1. Tema claro / escuro
   O <head> já aplica data-theme antes do primeiro paint (evita
   flash). Aqui só ligamos os botões e mantemos tudo sincronizado.
   --------------------------------------------------------------- */
function initTheme() {
  const STORAGE_KEY = 'es-theme';
  const root = document.documentElement;
  const toggles = [
    document.getElementById('themeToggle'),
    document.getElementById('themeToggleMobile'),
  ].filter(Boolean);

  if (!toggles.length) return;

  function syncToggles(theme) {
    toggles.forEach((btn) => {
      btn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
      btn.setAttribute('aria-label', theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro');
    });
  }

  function setTheme(theme, persist) {
    root.setAttribute('data-theme', theme);
    syncToggles(theme);
    if (persist) {
      try { localStorage.setItem(STORAGE_KEY, theme); } catch (e) { /* Safari privado, etc. */ }
    }
  }

  syncToggles(root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');

  toggles.forEach((btn) => {
    btn.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      setTheme(next, true);
    });
  });

  // Só segue o SO em direto se a pessoa nunca escolheu manualmente
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      let stored = null;
      try { stored = localStorage.getItem(STORAGE_KEY); } catch (err) { /* noop */ }
      if (!stored) setTheme(e.matches ? 'dark' : 'light', false);
    });
  }
}

/* ---------------------------------------------------------------
   2. Menu mobile — abre/fecha, trap de foco real (Tab cicla dentro
      do painel), fecha com Escape e devolve o foco ao botão.
   --------------------------------------------------------------- */
function initMobileMenu() {
  const toggle = document.getElementById('menuToggle');
  const menu = document.getElementById('mobileMenu');
  if (!toggle || !menu) return;

  const FOCUSABLE = 'a[href], button:not([disabled])';

  function onKeydown(e) {
    if (e.key === 'Escape') {
      close(true);
      return;
    }
    if (e.key !== 'Tab') return;
    const focusables = Array.from(menu.querySelectorAll(FOCUSABLE));
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement;
    // Enquanto a transição de abertura do painel ainda não assentou, o
    // browser pode continuar a tratar o toggle como o elemento focado
    // (o focus() automático no 1º link só "pega" depois da transição
    // terminar — ver focusFirst/transitionend abaixo). Sem este caso, um
    // Tab pressionado nessa janela escapa para o conteúdo por trás do
    // overlay. Tratamos o toggle como fronteira do trap também.
    if (active === toggle) {
      e.preventDefault();
      (e.shiftKey ? last : first).focus();
      return;
    }
    if (e.shiftKey && active === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    }
  }

  function open() {
    menu.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Fechar menu');
    document.body.classList.add('menu-open');
    document.addEventListener('keydown', onKeydown);

    // O painel só aceita foco depois de a transição de abertura terminar —
    // chamar focus() antes disso (mesmo 1 frame depois) falha em silêncio,
    // porque o browser ainda trata o alvo como não focável enquanto a
    // opacidade está perto de 0. Por isso esperamos por 'transitionend' em
    // vez de adivinhar um tempo fixo; o setTimeout é só uma rede de
    // segurança caso o evento não chegue a disparar.
    let focused = false;
    function focusFirst() {
      if (focused) return;
      focused = true;
      menu.removeEventListener('transitionend', onOpenTransitionEnd);
      const first = menu.querySelector(FOCUSABLE);
      if (first) first.focus();
    }
    function onOpenTransitionEnd(e) {
      if (e.target === menu) focusFirst();
    }
    menu.addEventListener('transitionend', onOpenTransitionEnd);
    setTimeout(focusFirst, 320);
  }

  function close(returnFocus) {
    menu.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menu');
    document.body.classList.remove('menu-open');
    document.removeEventListener('keydown', onKeydown);
    if (returnFocus) toggle.focus();
  }

  toggle.addEventListener('click', () => {
    if (menu.classList.contains('is-open')) close(true); else open();
  });

  menu.querySelectorAll('[data-mobile-link]').forEach((link) => {
    link.addEventListener('click', () => close(false));
  });

  window.addEventListener('resize', debounce(() => {
    if (window.innerWidth >= 1024 && menu.classList.contains('is-open')) close(false);
  }, 150));
}

/* ---------------------------------------------------------------
   3. Navbar dinâmica ao fazer scroll
   --------------------------------------------------------------- */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  const THRESHOLD = 24;

  function update() {
    navbar.classList.toggle('is-scrolled', window.scrollY > THRESHOLD);
  }

  update();
  window.addEventListener('scroll', throttleRAF(update), { passive: true });
}

/* ---------------------------------------------------------------
   4. Estado ativo da navegação (scrollspy)
   Marca o link ativo com a classe .is-active (para o sublinhado
   visual) E com aria-current="page" (para leitores de ecrã) —
   sempre um único link "atual" de cada vez, em ambos os menus.
   --------------------------------------------------------------- */
function initScrollSpy() {
  const links = Array.from(document.querySelectorAll('[data-nav-link]'));
  if (!links.length || !('IntersectionObserver' in window)) return;

  const linksBySection = new Map();
  links.forEach((link) => {
    const section = document.querySelector(link.getAttribute('href'));
    if (!section) return;
    if (!linksBySection.has(section)) linksBySection.set(section, []);
    linksBySection.get(section).push(link);
  });

  if (!linksBySection.size) return;

  function setActive(activeLinks) {
    links.forEach((l) => {
      l.classList.remove('is-active');
      l.removeAttribute('aria-current');
    });
    activeLinks.forEach((l) => {
      l.classList.add('is-active');
      l.setAttribute('aria-current', 'page');
    });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      setActive(linksBySection.get(entry.target) || []);
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

  linksBySection.forEach((_links, section) => observer.observe(section));
}

/* ---------------------------------------------------------------
   5. Reveal suave ao entrar no viewport
   --------------------------------------------------------------- */
function initRevealOnScroll() {
  const items = Array.from(document.querySelectorAll('[data-reveal]'));
  if (!items.length) return;

  if (!('IntersectionObserver' in window) || prefersReducedMotion) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  // Pequeno stagger entre elementos irmãos do mesmo contentor
  const groups = new Map();
  items.forEach((el) => {
    const parent = el.parentElement;
    if (!groups.has(parent)) groups.set(parent, []);
    groups.get(parent).push(el);
  });
  groups.forEach((siblings) => {
    siblings.forEach((el, i) => {
      el.style.transitionDelay = `${Math.min(i * 60, 240)}ms`;
    });
  });

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  items.forEach((el) => observer.observe(el));
}

/* ---------------------------------------------------------------
   6. Loading screen
   Duração mínima curta para não "piscar" em ligações rápidas, com
   salvaguarda para nunca ficar presa se o evento load atrasar
   (importante em ligações mais lentas — realidade comum em Angola).
   --------------------------------------------------------------- */
function initLoader() {
  const MIN_DISPLAY = 500;
  const MAX_WAIT = 4000;
  const start = Date.now();
  let done = false;

  function reveal() {
    if (done) return;
    done = true;
    const wait = Math.max(0, MIN_DISPLAY - (Date.now() - start));
    setTimeout(() => {
      document.body.classList.add('is-loaded');
    }, prefersReducedMotion ? 0 : wait);
  }

  if (document.readyState === 'complete') {
    reveal();
  } else {
    window.addEventListener('load', reveal);
  }
  setTimeout(reveal, MAX_WAIT);
}

/* ---------------------------------------------------------------
   7. Formulário de contacto — validação e feedback
   Sem backend nesta fase (Fase 2 é PHP + MySQL — ver README). A
   mensagem de sucesso é deliberadamente honesta: confirma que os
   dados estão válidos, mas não afirma que algo foi "enviado", já
   que nada sai do browser ainda.
   --------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const status = document.getElementById('formStatus');
  const fieldKeys = ['name', 'email', 'subject', 'message'];
  const fields = {};
  fieldKeys.forEach((key) => {
    fields[key] = {
      el: document.getElementById(key),
      error: document.getElementById(`${key}Error`),
    };
  });

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validators = {
    name: (v) => {
      if (!v.trim()) return 'Indica o teu nome.';
      if (v.trim().length < 2) return 'Nome demasiado curto.';
      return '';
    },
    email: (v) => {
      if (!v.trim()) return 'Indica o teu email.';
      if (!EMAIL_RE.test(v.trim())) return 'Introduz um email válido.';
      return '';
    },
    subject: (v) => {
      if (!v.trim()) return 'Indica um assunto.';
      return '';
    },
    message: (v) => {
      if (!v.trim()) return 'Escreve a tua mensagem.';
      if (v.trim().length < 10) return 'Conta-me um pouco mais (mín. 10 caracteres).';
      return '';
    },
  };

  function validateField(key) {
    const field = fields[key];
    const message = validators[key](field.el.value);
    field.error.textContent = message;
    field.el.closest('.form-field').classList.toggle('is-invalid', Boolean(message));
    field.el.setAttribute('aria-invalid', message ? 'true' : 'false');
    return !message;
  }

  fieldKeys.forEach((key) => {
    const el = fields[key].el;
    el.addEventListener('blur', () => validateField(key));
    el.addEventListener('input', () => {
      if (el.closest('.form-field').classList.contains('is-invalid')) validateField(key);
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const results = fieldKeys.map(validateField);
    const allValid = results.every(Boolean);

    if (!allValid) {
      status.setAttribute('data-state', 'error');
      status.textContent = 'Revê os campos assinalados antes de enviar.';
      const firstInvalid = fieldKeys[results.indexOf(false)];
      fields[firstInvalid].el.focus();
      return;
    }

    const submitBtn = form.querySelector('.form-submit');
    const label = submitBtn.querySelector('.form-submit__label');
    const originalLabel = label.textContent;

    submitBtn.disabled = true;
    label.textContent = 'A validar...';
    status.removeAttribute('data-state');
    status.textContent = '';

    // Sem backend nesta fase: valida localmente e é direto sobre isso.
    setTimeout(() => {
      submitBtn.disabled = false;
      label.textContent = originalLabel;
      status.setAttribute('data-state', 'success');
      status.textContent = 'Formulário validado com sucesso. O envio automático chega numa fase seguinte — por agora, contacta-me diretamente pelo email ou telefone acima.';
      form.reset();
    }, 700);
  });
}

/* ---------------------------------------------------------------
   8. Ano no rodapé
   --------------------------------------------------------------- */
function initFooterYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = String(new Date().getFullYear());
}

/* ---------------------------------------------------------------
   Arranque
   --------------------------------------------------------------- */
initLoader();
initTheme();
initMobileMenu();
initNavbarScroll();
initScrollSpy();
initRevealOnScroll();
initContactForm();
initFooterYear();
