# Audit Log — Ronda de Correção Pós-V1.5

Esta ronda auditou o pacote `portfolio (Claude).zip` (a V1.5 já mesclada,
documentada em `README.md`) contra as 17 categorias do brief de auditoria,
com leitura completa de todos os ficheiros antes de qualquer alteração,
seguida de QA dinâmico real em Chromium via Playwright (não apenas leitura
estática). Nenhum texto, cor, fonte, layout, projeto ou CTA foi alterado.

## Alterações aplicadas (todas puramente técnicas, zero impacto visual)

1. **`js/script.js` — bug real no focus trap do menu mobile (corrigido e verificado)**
   Confirmado com Playwright (200 Tabs simulados, 10 execuções): se o
   utilizador pressionasse Tab durante a janela em que a transição de
   abertura do painel ainda não tinha assentado (a opacidade só fica
   focável perto do fim dos ~240ms de transição), o foco escapava para
   conteúdo por trás do overlay (links de telefone/email, campos do
   formulário de contacto). Corrigido em duas frentes: (a) o auto-focus no
   primeiro link agora espera pelo evento `transitionend` do painel em vez
   de assumir que está pronto de imediato; (b) o `onKeydown` do trap passou
   a tratar o próprio botão de toggle como fronteira do trap, para que
   nenhum Tab escape mesmo na janela de transição. Reverificado: 0 escapas
   para conteúdo de fundo em 200 tentativas no pior caso (Tab imediato,
   0ms de atraso).

2. **`css/variables.css` — contraste do tema claro**
   `--color-text-muted` tinha 4.45:1 sobre o fundo claro (WCAG AA exige
   4.5:1) — usado em conteúdo real: links da navbar, lede do hero, texto de
   "Sobre", descrições de projetos. Opacidade subida de 64% para 68%
   (→ 5.07:1). Alteração visualmente impercetível. Tema escuro já passava
   (5.37:1) e não foi tocado.

3. **`index.html` — acessibilidade do formulário**
   Os 4 campos (nome, email, assunto, mensagem) já eram validados como
   obrigatórios via JS, mas isso nunca era exposto a leitores de ecrã.
   Adicionado `required` (o `novalidate` no `<form>` mantém-se, por isso o
   comportamento de bloqueio nativo não muda) e `aria-describedby` a ligar
   cada campo ao seu `<span class="form-error">` correspondente.

4. **`index.html` — dados estruturados (SEO)**
   Adicionado um bloco `<script type="application/ld+json">` com schema.org
   `Person`, usando apenas informação já visível na própria página (nome,
   cargo, localização, email, telefone — nada inventado).

5. **`.gitignore` (novo ficheiro)**
   Não existia nenhum. Criado um básico, já preparado para a Fase 2 (PHP):
   `/vendor/`, `.env`, ficheiros de SO/editor.

## Verificado e confirmado correto (nenhuma alteração necessária)

- Zero dependências externas/CDN — confirmado empiricamente via monitor de
  rede do Chromium (não apenas grep): 0 pedidos fora de `localhost` em 14
  combinações de largura × tema.
- Zero erros de consola em 14 combinações de largura × tema.
- Zero overflow horizontal em 320–1920px.
- `prefers-reduced-motion`: todo o conteúdo `[data-reveal]` fica visível de
  imediato, confirmado via emulação real.
- Alternância de tema: persiste corretamente após reload (localStorage).
- Download do CV: pedido HTTP real devolve 200 + `application/pdf`.
- Cores do footer fixas (não seguem o tema) são intencionais — Brand
  Guidelines §11 exige sempre Sand-sobre-Petrol-escuro no footer,
  independentemente do tema da página.
- `assets/icons/` só tem um README — intencional e documentado (o Brand Kit
  não fornece ícones de tecnologias; a secção Skills usa etiquetas
  tipográficas em vez de logótipos de terceiros, para não inventar ícones).

Ver relatório completo (17 auditorias, PASS/WARN/FAIL, pendências) na
conversa onde esta correção foi pedida.
