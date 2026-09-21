# Ederson Serafim — Portfólio (V1.5)

Landing page pessoal de **Ederson Serafim Malanda**, estudante de Gestão de Sistemas Informáticos, Luanda, Angola.

100% **HTML5 + CSS3 + JavaScript puro** — sem frameworks, sem bibliotecas externas, sem CDNs. Toda a tipografia, ícones e assets de marca são servidos localmente, uma decisão deliberada para as condições de rede em Angola.

Esta versão (V1.5) é o resultado de um **merge de três implementações independentes** da V1 (`Claude`, `Cursor`, `GitHub`), combinando o melhor de cada uma numa quarta versão única.

---

## Como correr localmente

Não há build, não há dependências para instalar. Precisas só de um servidor estático (para os `fetch`/caminhos relativos funcionarem corretamente):

```bash
# Com Python (já vem instalado na maioria dos sistemas)
python3 -m http.server 8000

# Depois abre no browser:
http://localhost:8000
```

Abrir o `index.html` diretamente com duplo-clique (`file://`) também funciona, mas alguns browsers restringem `fetch`/fontes locais sob `file://` — o servidor local é a forma recomendada.

---

## Estrutura

```
portfolio/
├── index.html
├── css/
│   ├── variables.css     — tokens de marca e tema (cor, tipografia, espaçamento)
│   ├── base.css          — reset, @font-face self-hosted, acessibilidade base
│   ├── components.css    — todos os componentes visuais (navbar → footer)
│   └── responsive.css    — todas as media queries, consolidadas num só lugar
├── js/
│   └── script.js         — tema, menu mobile, scroll, reveal, formulário
├── assets/
│   ├── logo/             — variantes oficiais do logótipo (SVG)
│   ├── images/           — avatar e loader-mark (SVG)
│   ├── favicon/          — favicon set completo + site.webmanifest
│   ├── fonts/            — Inter + JetBrains Mono, self-hosted (.woff2)
│   └── cv/                — Ederson-Serafim-Malanda-CV.pdf (download real)
├── docs/
│   └── BRAND_GUIDELINES.md
└── README.md
```

---

## Merge Decisions

Os três projetos originais (`Claude.zip`, `Cursor.zip`, `GitHub.zip`) foram lidos, comparados e auditados por completo antes de qualquer código ser escrito — incluindo checksums MD5 dos assets de marca para confirmar fidelidade ao Brand Kit (todos idênticos, byte a byte, nos três).

### O que veio do Claude
- **Estrutura base do HTML e do JavaScript** — era a implementação mais completa: fontes self-hosted (as únicas das três a não depender de CDN), skip link, sprite de ícones SVG, fallback `<noscript>` completo.
- **Focus trap real** no menu mobile (Tab cicla dentro do painel, `Escape` fecha e devolve o foco ao botão) — verificado com testes automatizados (Playwright), não só por inspeção do código.
- Painel do menu mobile posicionado **fora do `<header>`** — o header usa `backdrop-filter`, que cria um novo *containing block* para descendentes `position:fixed` e quebraria o overlay se o painel vivesse lá dentro.
- Escala de breakpoints responsivos (480 / 640 / 768 / 1024 / 1440), consolidados num único ficheiro.
- Loader com duração mínima + limite máximo de segurança (nunca fica preso se a ligação for lenta).

### O que veio do Cursor
- **Estratégia de dark mode por tokens semânticos**: em vez de ~20 overrides `[data-theme="dark"] .componente {}` espalhados pelo CSS (como no Claude original), os tokens de cor mudam uma única vez em `variables.css` (`--color-accent`, `--color-bg`, etc.) e todos os componentes apontam sempre para o mesmo nome de variável. Menos código, mais fácil de manter — sem mudar o resultado visual.
- Nomenclatura de navegação (**"Percurso"** como link de nav) e a organização geral, mais direta.
- Honestidade da mensagem de sucesso do formulário: valida e confirma os dados, sem afirmar que algo foi "enviado" — não há backend nesta fase.

### O que veio do GitHub
- Inspiração para a organização de **design tokens** em ficheiro próprio (`variables.css`).
- A ideia de **`aria-current="page"`** no link de navegação ativo, gerido via JavaScript (nem Claude nem Cursor faziam isto) — mantida e combinada com o sistema de deteção de secção ativa (scrollspy) do Claude.

### O que foi reconstruído
- **Botão "Baixar currículo"** — nenhuma das três implementações o tinha, apesar de ser obrigatório no briefing. Adicionado como CTA no hero (substituindo "Entrar em contacto", já coberto pelo CTA da navbar) e como atalho de ícone na navbar desktop, ambos a apontar para `assets/cv/Ederson-Serafim-Malanda-CV.pdf`.
- Ícone SVG de download, adicionado ao sprite existente.

### Problemas corrigidos
- **GitHub**: carregava Google Fonts via CDN (removido — fontes agora 100% self-hosted); usava `href="#"` em 4 links reais de GitHub/LinkedIn (substituído por botões desativados com "Em breve", já usado no Claude); tinha **`js/main.js`, `css/variables.css`, `css/base.css` e `css/layout.css` completamente órfãos** — nunca eram carregados pelo `index.html`, e o `layout.css` continha CSS inválido (`@media (min-width: var(--breakpoint-md))`, uma variável CSS não pode ser usada dentro da condição de uma media query). Nenhum destes ficheiros foi transportado para a V1.5.
- **Cursor**: também carregava Google Fonts via CDN (removido); não tinha skip link (adicionado); o menu mobile fechava com `Escape` mas não tinha *focus trap* real (adicionado).
- Duplicação de assets: tanto o Cursor como o GitHub tinham os mesmos ficheiros SVG guardados em duas pastas diferentes (confirmado por checksum). A V1.5 usa uma única localização por asset.

### Verificação (Playwright, automatizada)
- Zero erros de consola, zero pedidos de rede falhados e **zero pedidos externos** (nenhuma chamada a domínios fora do localhost) — confirmado em 7 larguras de ecrã: 320 / 375 / 430 / 768 / 1024 / 1440 / 1920px, em claro e escuro.
- Focus trap testado com simulação real de `Tab` (14 pressões consecutivas): o foco nunca sai do painel mobile e cicla corretamente entre os 5 links, tema, CV e CTA.
- `prefers-reduced-motion: reduce` testado via emulação: todo o conteúdo `[data-reveal]` fica visível de imediato, sem depender de scroll.
- Link de download do CV testado via pedido HTTP real: `200 OK`, `content-type: application/pdf`, idêntico no hero e na navbar.

---

## Sobre o ficheiro do currículo

O PDF em `assets/cv/Ederson-Serafim-Malanda-CV.pdf` foi construído a partir do documento **`CV_Ederson_Serafim_Malanda1.pdf`** (entre os dois currículos fornecidos, este foi o escolhido por já usar o título "Desenvolvedor Web Júnior" — igual ao `<title>` e ao hero do próprio site — e por incluir os placeholders de LinkedIn/GitHub consistentes com a secção de contacto).

Se preferires usar o outro documento (`Curriculo_Ederson_Serafim_Malanda.pdf`, mais focado em suporte técnico e redes) ou uma versão mais recente, basta substituir o ficheiro em `assets/cv/` — mantendo exatamente o mesmo nome — que o site não precisa de nenhuma outra alteração.

Nota à parte: nenhum dos dois documentos usa ainda as cores da marca (Petrol Blue / Sand Mist / Amber Gold) — são baseados num template genérico. Redesenhar o próprio CV com a identidade visual do Epic 9.5 seria um bom próximo passo, separado deste merge.

---

## O que fica preparado para a Fase 2 (PHP + MySQL)

Esta versão mantém-se estritamente HTML/CSS/JS, mas a estrutura já facilita a conversão futura:

- Todas as secções têm IDs semânticos e independentes (`#sobre`, `#skills`, `#projetos`, `#formacao`, `#contacto`) — mapeiam diretamente para possíveis `includes`/componentes PHP.
- Nomenclatura de classes consistente (BEM-like: `bloco__elemento--modificador`).
- O formulário de contacto já separa validação (JS) da apresentação (HTML) — a Fase 2 só precisa de substituir a simulação em `initContactForm()` por um `fetch()` real para um endpoint PHP.
- Nenhum dado está hardcoded de forma a impedir vir a ser dinâmico (ex: os projetos estão em blocos HTML repetíveis, prontos a tornarem-se um `foreach` no futuro).

**Não foi criado nenhum código PHP nesta fase** — isso fica para quando decidires avançar para a Fase 2.
