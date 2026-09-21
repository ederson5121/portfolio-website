# Brand Guidelines — Ederson Serafim

**Versão 1.0** · Sistema de identidade visual para portfólio pessoal, dashboard e presença profissional.

---

## 1. Identidade

### Nome da marca
**Ederson Serafim**

### Conceito
A identidade representa um estudante de Gestão de Sistemas Informáticos em evolução para uma carreira em Tecnologia da Informação. Não é a marca de uma empresa, nem a estética de um "hacker" — é a assinatura visual de um profissional de tecnologia em construção, com base sólida em fundamentos (sistemas, redes, desenvolvimento) e visão de crescimento contínuo.

### Personalidade da marca
| Atributo | O que significa na prática |
|---|---|
| Profissional | Cores sóbrias, tipografia limpa, sem exageros |
| Tecnológico | Geometria precisa, grid modular, referência visual a sistemas e blocos de construção |
| Em aprendizagem contínua | Filosofia "Always Learning. Always Building." presente na comunicação da marca |
| Organizado | Sistema consistente de regras, não decisões ad-hoc por aplicação |
| Confiante, sem arrogância | Minimalista, nunca gritante; o Amber é usado com moderação extrema |

### Filosofia pessoal
> "Always Learning. Always Building."

---

## 2. Logo

### 2.1 Construção do símbolo

O símbolo **ES** é um monograma geométrico construído sobre um grid modular de 100×100 unidades, usando exclusivamente blocos retangulares com cantos suavemente arredondados (`rx = 3`). Não existem curvas livres, traços caligráficos ou elementos decorativos — cada peça do símbolo é um bloco com posição e dimensão exatas, o que garante:

- Reprodutibilidade perfeita em qualquer ferramenta (Figma, Illustrator, código);
- Legibilidade estável em qualquer escala, de 512px a 16px;
- Coerência visual entre o "E" e o "S", que partilham o mesmo peso de traço (14–16 unidades) e o mesmo raio de canto.

O "E" ocupa a metade esquerda do grid (coluna vertical + três braços horizontais). O "S" ocupa a metade direita, construído como uma sequência de três blocos horizontais ligados por dois conectores verticais — uma leitura geométrica do S, não uma curva desenhada à mão. As duas metades funcionam como uma unidade única, não como duas letras coladas.

![Símbolo ES sobre fundo claro e escuro](guidelines-assets/mark-light.png)

### 2.2 Logo principal

Composição: **[Símbolo ES] + [Ederson Serafim]**, alinhados verticalmente pelo centro óptico do símbolo e o cap-height do nome.

O lettering "Ederson Serafim" **não usa a fonte Inter carregada em runtime** — os caracteres foram convertidos em outlines (paths) vetoriais reais, extraídos diretamente do ficheiro da fonte Inter SemiBold (600). Isto significa que o logo é 100% autossuficiente: renderiza de forma idêntica em qualquer navegador, sistema operativo ou ferramenta de design, com ou sem a fonte Inter instalada.

**Versão clara** — para fundos claros (`#FAF8F3` ou branco):

![Logo principal claro](guidelines-assets/logo-light.png)

**Versão escura** — para fundos escuros (`#1E2A33`):

![Logo principal escuro](guidelines-assets/logo-dark.png)

Existem três ficheiros do logo principal:
- `logo-primary-light.svg` — símbolo em Petrol Blue, nome em cinza-escuro, fundo transparente.
- `logo-primary-dark.svg` — inclui o fundo `#1E2A33` embutido no SVG (pronto a usar diretamente).
- `logo-primary-dark-transparent.svg` — mesma paleta clara-sobre-escuro, mas **sem** fundo embutido, para colar sobre qualquer superfície escura já existente (ex: hero de website com imagem de fundo).

### 2.3 Logo mark (símbolo isolado)

Versão do monograma sem o nome, para espaços reduzidos onde o logo completo não cabe ou seria redundante.

| Ficheiro | Cor do símbolo | Uso recomendado |
|---|---|---|
| `logo-mark-light.svg` | Petrol Blue `#326586` | Navbar sobre fundo claro, footer, favicon-source |
| `logo-mark-dark.svg` | Sand Mist `#F4E9D4` | Navbar sobre fundo escuro, dashboard em dark mode |

Aplicações previstas: navbar compacta, dashboard, footer, loader, redes sociais, avatar de aplicações futuras.

---

## 3. Cores

### Paleta oficial

| Nome | Hex | Papel |
|---|---|---|
| **Petrol Blue** | `#326586` | Primária — símbolo, texto de destaque, elementos de confiança |
| **Sand Mist** | `#F4E9D4` | Secundária — fundos suaves, texto sobre fundo escuro |
| **Amber Gold** | `#D4A017` | Accent — **apenas** para pequenos destaques, nunca dominante |
| Background claro | `#FAF8F3` | Fundo padrão em modo claro |
| Dark | `#1E2A33` | Fundo padrão em modo escuro |
| Texto | `#1F2937` | Texto de corpo em modo claro |

### Regra de utilização do Amber

O Amber Gold é a cor mais restrita da paleta. Está limitado a:
- Divisores/separadores pequenos (ex: o traço no loader);
- Estados de destaque pontuais (badge "novo", indicador ativo);
- Nunca como cor de preenchimento do símbolo ou do texto principal, exceto casos muito específicos de contraste em fundo escuro.

Se o Amber está a ocupar mais de ~10% da composição visual, está a ser usado incorretamente.

### Combinações permitidas

✓ Petrol Blue sobre `#FAF8F3` ou branco
✓ Sand Mist sobre `#1E2A33` ou Petrol Blue
✓ Amber como acento sobre qualquer uma das combinações acima
✗ Amber como cor dominante do símbolo
✗ Cores fora desta paleta em qualquer aplicação da marca

---

## 4. Tipografia

| Uso | Fonte | Peso |
|---|---|---|
| Nome, títulos, interface | **Inter** | SemiBold (600) para o nome; Medium (500) para subtítulos e UI |
| Código, elementos técnicos | **JetBrains Mono** | Regular |

Nos assets de marca (logo, loader), o texto é sempre fornecido como outline vetorial — não depende da fonte estar instalada. Em contextos de interface viva (website, dashboard), a Inter deve ser carregada normalmente via `@font-face` ou Google Fonts.

---

## 5. Avatar

Formato quadrado 1:1, fundo Petrol Blue sólido, símbolo em Sand Mist centrado com margem generosa (o símbolo ocupa ~58% da área total), preparado para recorte circular sem cortar nenhuma parte do monograma.

![Avatar](guidelines-assets/avatar.png)

Testado e validado em 32px, 64px, 128px e 512px — mantém-se legível em todos os tamanhos.

Ficheiro: `avatar.svg`

---

## 6. Favicon

Versão simplificada do símbolo, com fundo Petrol Blue e cantos arredondados generosos (otimizados para o formato de ícone de app/browser), priorizando reconhecimento por forma e contraste de cor sobre leitura literal das letras em tamanhos extremos.

![Favicon](guidelines-assets/favicon-big.png)

| Ficheiro | Tamanho | Uso |
|---|---|---|
| `favicon.svg` | Vetorial | Browsers modernos (favicon SVG) |
| `favicon-16.png` | 16×16 | Aba do browser |
| `favicon-32.png` | 32×32 | Favicon padrão, atalhos |
| `favicon-48.png` | 48×48 | Ícones de alta densidade |
| `apple-touch-icon.png` | 180×180 | iOS home screen (sem cantos arredondados no ficheiro — o iOS aplica a máscara) |

**Nota honesta sobre legibilidade:** a 16px reais, o símbolo é reconhecível pela sua estrutura de blocos e contraste de cor, mas a leitura literal de "E" e "S" fica no limite — isto é esperado e normal para qualquer monograma a este tamanho extremo (o mesmo acontece com a generalidade dos favicons da indústria). A partir de 32px a leitura é imediata e nítida.

---

## 7. Loader

Composição vertical centrada: símbolo → nome → tagline ("Gestão de Sistemas Informáticos") → divisor Amber → "Loading Portfolio...".

![Loader](guidelines-assets/loader.png)

O ficheiro `loader-mark.svg` é **estático** — a animação (pulsação, fade, spinner, etc.) deve ser implementada externamente via CSS/JavaScript no momento da integração no website, não faz parte do asset de marca.

---

## 8. Área de proteção

Regra: a área mínima livre em torno do símbolo, em qualquer aplicação, deve ser igual à **altura do próprio símbolo (X)**.

![Área de proteção](guidelines-assets/protection-zone.png)

Nenhum texto, imagem, borda de contentor ou outro elemento gráfico deve invadir esta área. Esta regra aplica-se tanto ao logo mark isolado como ao logo completo (medindo a partir da altura total do conjunto símbolo+nome).

---

## 9. Tamanho mínimo

| Elemento | Largura/altura mínima |
|---|---|
| Logo completo (símbolo + nome) | 120px de largura |
| Logo mark (símbolo isolado) | 32px |
| Favicon | Otimizado para 16px, 32px e 48px especificamente |

Abaixo destes valores, a legibilidade não é garantida e a marca não deve ser reproduzida.

---

## 10. Usos incorretos

![Usos incorretos](guidelines-assets/incorrect-usage.png)

Adicionalmente às violações ilustradas acima, também não é permitido:

- Rodar ou inclinar o símbolo;
- Adicionar contorno (stroke) ao redor do símbolo;
- Colocar o logo sobre fundos com baixo contraste (ex: Petrol Blue sobre azul escuro semelhante);
- Reconstruir o símbolo à mão em vez de usar os ficheiros oficiais;
- Separar as duas metades do símbolo (E e S) e usá-las isoladamente;
- Adicionar sombras projetadas, brilhos, biséis ou qualquer efeito 3D;
- Combinar o símbolo com ícones genéricos de tecnologia (circuitos, cadeados, escudos, terminais).

---

## 11. Aplicações

| Contexto | Asset recomendado |
|---|---|
| Website — header/navbar | `logo-primary-light.svg` (ou `logo-mark-light.svg` em navbar compacta/mobile) |
| Website — footer | `logo-mark-light.svg` ou `logo-mark-dark.svg`, conforme o fundo |
| Dashboard administrativo | `logo-mark-light.svg` / `logo-mark-dark.svg` consoante o tema ativo |
| Loading screen | `loader-mark.svg` + animação CSS/JS |
| GitHub (avatar de perfil) | `avatar.svg` exportado em 512×512 |
| LinkedIn (avatar de perfil) | `avatar.svg` exportado em 512×512 |
| Favicon do website | conjunto completo da pasta `favicon/` |
| CV / documentos profissionais | `logo-primary-light.svg` no cabeçalho |
| Redes sociais — posts | `logo-mark-light.svg` ou `logo-mark-dark.svg`, conforme o design do post |

---

## 12. Estrutura de ficheiros

```text
brand/
├── logo/
│   ├── logo-primary-light.svg
│   ├── logo-primary-dark.svg
│   ├── logo-primary-dark-transparent.svg
│   ├── logo-mark-light.svg
│   └── logo-mark-dark.svg
├── avatar/
│   └── avatar.svg
├── favicon/
│   ├── favicon.svg
│   ├── favicon-16.png
│   ├── favicon-32.png
│   ├── favicon-48.png
│   └── apple-touch-icon.png
├── loader/
│   └── loader-mark.svg
└── BRAND_GUIDELINES.md   (este documento)
```

---

## 13. Nota técnica de produção

Todos os SVGs desta entrega:
- Usam exclusivamente `<rect>` com `rx` (símbolo) e `<path>` de outline real de fonte (lettering) — nenhum texto depende de `<text>` nem de fontes carregadas externamente;
- Têm `viewBox` correto e proporções preservadas, sendo escaláveis sem perda de qualidade;
- Não têm metadata desnecessária, camadas ocultas ou dependências externas;
- Funcionam em todos os browsers modernos;
- As versões "light" têm fundo transparente (exceto `logo-primary-dark.svg`, que inclui o fundo por design, e `favicon.svg`, cujo fundo sólido é parte intencional do ícone).

Os PNGs foram exportados com renderização vetorial de alta fidelidade (resvg), garantindo bordas nítidas e cores exatas em todos os tamanhos.

---

*Documento vivo — atualizar esta versão sempre que o sistema de marca evoluir.*
