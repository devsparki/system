# Explicacao do HTML e do CSS do Sistema GFG

Este arquivo explica a estrutura visual do projeto. O foco aqui e somente:

- `index.html`: estrutura e conteudo da pagina;
- `style.css`: cores, tamanhos, posicionamento, responsividade e efeitos;
- `mudanca de cor/style.css`: tema vermelho, que usa a mesma estrutura HTML;
- `imagens/`: imagens usadas pela pagina.

O arquivo `script.js` controla comportamentos, como cliques e troca de tema, mas nao sera explicado aqui porque este documento trata apenas de HTML e CSS.

## 1. Como os arquivos se relacionam

O navegador interpreta o HTML e monta a pagina. Depois, ele le o CSS e aplica as regras visuais aos elementos HTML.

```text
index.html
	├── importa style.css                  -> tema cinza/original
	├── importa mudança de cor/style.css   -> tema vermelho, inicialmente desativado
	└── cria os elementos da pagina

style.css
	└── define a aparencia cinza/original

mudança de cor/style.css
	└── redefine varias regras para o visual vermelho
```

O segundo CSS e carregado com:

```html
<link id="redThemeStylesheet" rel="stylesheet" href="mudan%C3%A7a%20de%20cor/style.css" disabled>
```

- `link` importa um arquivo externo;
- `id` identifica esse link;
- `href` informa o caminho do arquivo;
- `disabled` faz o navegador manter a folha desativada no inicio;
- `%20` representa um espaco no caminho da pasta;
- `mudan%C3%A7a` representa a letra `ç` codificada para URL.

Quando a folha vermelha e ativada, suas regras aparecem depois das regras do CSS original e podem substituir regras anteriores. As duas folhas usam as mesmas classes, por isso nao e necessario criar um HTML diferente para cada tema.

---

## 2. HTML: estrutura completa

### 2.1 Declaracao e elemento raiz

```html
<!DOCTYPE html>
<html lang="pt-BR">
```

`<!DOCTYPE html>` informa ao navegador que o documento usa HTML5. Isso evita que o navegador entre em um modo antigo de interpretacao.

`<html>` e o elemento que envolve todo o documento. O atributo `lang="pt-BR"` informa que o idioma principal e portugues do Brasil. Isso ajuda leitores de tela, mecanismos de busca e ferramentas de traducao.

### 2.2 Cabecalho `<head>`

O `<head>` guarda informacoes sobre a pagina e arquivos que precisam ser carregados. O conteudo dele normalmente nao aparece diretamente na pagina.

#### Codificacao

```html
<meta charset="UTF-8">
```

`meta` fornece metadados. `charset="UTF-8"` permite acentos, cedilha e outros caracteres, como em `evolucao`, `Jiu-Jitsu` e textos em portugues.

#### Ajuste para celulares

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

- `width=device-width`: a largura da pagina acompanha a largura do dispositivo;
- `initial-scale=1.0`: a pagina inicia sem zoom artificial.

Sem essa meta tag, a pagina poderia aparecer muito pequena em celulares.

#### Titulo e descricao

```html
<title>GFG | Centro de Treinamento</title>
<meta name="description" content="...">
```

`title` e o titulo mostrado na aba do navegador.

`description` descreve a pagina para mecanismos de busca e compartilhamentos.

#### Metadados de compartilhamento

```html
<meta name="theme-color" content="#111111">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Sistema GFG">
<meta property="og:title" content="GFG | Centro de Treinamento">
<meta property="og:description" content="...">
<meta property="og:image" content="imagens/gfg.png">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="GFG | Centro de Treinamento">
<meta name="twitter:description" content="...">
```

- `theme-color` sugere uma cor para a interface do navegador;
- `og:*` define como a pagina pode aparecer quando compartilhada em redes sociais;
- `twitter:*` define informacoes especificas para o Twitter/X;
- `og:image` indica a imagem de destaque do compartilhamento;
- `summary_large_image` pede um cartao com imagem grande.

#### Icone e fontes

```html
<link rel="icon" type="image/png" href="imagens/logo.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Anton&display=swap" rel="stylesheet">
```

- `rel="icon"` define o favicon da aba;
- `type="image/png"` informa o formato da imagem;
- `preconnect` tenta antecipar a conexao com o servidor de fontes;
- `crossorigin` permite a conexao externa necessaria;
- o ultimo `link` importa a fonte Anton do Google Fonts.

#### Folhas de estilo

```html
<link rel="stylesheet" href="style.css">
<link id="redThemeStylesheet" rel="stylesheet" href="mudan%C3%A7a%20de%20cor/style.css" disabled>
```

`rel="stylesheet"` diz que o arquivo e uma folha CSS. `href` aponta para o arquivo. O primeiro CSS e o visual original. O segundo e o visual vermelho e inicia desativado.

---

## 3. Corpo da pagina: `<body>`

```html
<body>
```

`body` contem tudo o que o usuario ve e usa: cabecalho, menu, conteudo, cards e tela de autenticacao.

Os comentarios HTML, escritos entre `<!--` e `-->`, sao anotacoes para quem le o codigo. O navegador nao mostra esses comentarios.

---

## 4. Cabecalho e navegacao

### 4.1 Elemento `<header>`

```html
<header class="navbar">
```

`header` representa o cabecalho da pagina. A classe `navbar` conecta esse elemento as regras CSS da barra fixa no alto da tela.

No CSS, `.navbar` usa:

- `position: fixed`: fica preso a uma posicao da janela;
- `top: 18px`: distancia do topo;
- `left: 50%` e `transform: translateX(-50%)`: centralizam a barra;
- `z-index: 1000`: coloca a barra acima do conteudo;
- `width: min(1440px, calc(100% - 40px))`: limita a largura a 1440 pixels, mas deixa margem em telas menores;
- `height: 76px`: define a altura;
- `display: flex`: coloca os filhos em uma linha flexivel;
- `align-items: center`: centraliza os filhos verticalmente;
- `justify-content: space-between`: distribui os grupos nas extremidades;
- `padding`: cria espaco interno;
- `background`: cria o fundo em gradiente;
- `border`: cria uma borda;
- `border-radius`: arredonda os cantos;
- `box-shadow`: cria sombra;
- `backdrop-filter`: desfoca o que fica atras da barra.

### 4.2 Logo

```html
<a href="#" class="logo" aria-label="VerdeTech - início">
	<span class="logo-icon" aria-hidden="true"></span>
	System<span>GFG</span>
</a>
```

`a` cria um link. `href="#"` aponta para o inicio da pagina.

`class="logo"` aplica o estilo da marca. `aria-label` fornece um nome acessivel para leitores de tela.

O primeiro `span` e uma forma decorativa. `aria-hidden="true"` diz que ela nao precisa ser lida por tecnologia assistiva.

O segundo `span` envolve somente `GFG`, permitindo que o CSS pinte essa parte com a cor de destaque usando:

```css
.logo span:last-child {
	color: var(--red-400);
}
```

O seletor `:last-child` escolhe o ultimo filho `span` dentro do logo.

### 4.3 Navegacao desktop

```html
<nav class="nav-links" aria-label="Navegação principal">
	<a href="#" class="nav-link active" aria-current="page">Início</a>
	<a href="#" class="nav-link">Modalidades</a>
	<a href="#" class="nav-link">Sobre</a>
	<a href="#" class="nav-link">Contato</a>
</nav>
```

`nav` representa um conjunto de links de navegacao.

`aria-label` identifica esse conjunto para leitores de tela.

Cada `a` e um link. A classe `nav-link` aplica o estilo individual. A classe `active` marca a pagina atual. `aria-current="page"` informa semanticamente que o link representa a pagina atual.

No CSS:

- `.nav-links` usa flexbox para alinhar os links;
- `gap` define a distancia entre eles;
- `margin-left: auto` empurra a navegacao para a direita;
- `.nav-link` define altura, espaco interno, cor, fonte e arredondamento;
- `.nav-link::after` cria a linha decorativa abaixo do link;
- `:hover` muda o visual quando o mouse passa por cima;
- `.active` deixa o link atual destacado;
- `.active::after` aumenta a linha do link ativo.

`::after` e um pseudo-elemento. Ele nao existe no HTML, mas pode ser desenhado pelo CSS quando possui `content`.

### 4.4 Grupo de acoes

```html
<div class="nav-actions">
```

`div` e um conteiner generico. Aqui ele agrupa seletor de tema, pesquisa, CTA e menu mobile.

### 4.5 Botoes de tema

```html
<div class="theme-switcher" aria-label="Escolha de cor">
	<button class="theme-option theme-option-red" type="button" data-theme-option="red" aria-label="Usar tema vermelho" aria-pressed="false">
		<span aria-hidden="true"></span>
		Vermelho
	</button>
	<button class="theme-option theme-option-gray" type="button" data-theme-option="gray" aria-label="Usar tema cinza" aria-pressed="false">
		<span aria-hidden="true"></span>
		Cinza
	</button>
</div>
```

`button` cria um botao clicavel.

- `type="button"` evita que o botao tente enviar um formulario;
- `data-theme-option` e um atributo personalizado para guardar o valor do tema;
- `aria-label` descreve a acao;
- `aria-pressed` informa se o botao esta selecionado;
- o `span` e a bolinha de cor;
- `theme-option-red` pinta a bolinha de vermelho;
- `theme-option-gray` pinta a bolinha de cinza.

No CSS, `.theme-switcher` alinha os botoes. `.theme-option` define formato de pildora, fonte, espaco, borda e transicao. O seletor combinado:

```css
.theme-option:hover,
.theme-option.is-active { ... }
```

aplica o mesmo destaque ao botao sob o mouse e ao botao ativo.

### 4.6 Botao de pesquisa e SVG

```html
<button class="search-btn" aria-label="Pesquisar">
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
		<circle cx="11" cy="11" r="7"></circle>
		<path d="m20 20-4-4"></path>
	</svg>
</button>
```

O botao representa a pesquisa. `aria-label` da um nome para quem nao consegue ver o icone.

`svg` cria uma imagem vetorial. Seus atributos significam:

- `viewBox="0 0 24 24"`: area interna de coordenadas;
- `fill="none"`: nao preenche as formas;
- `stroke="currentColor"`: usa a cor atual do texto;
- `stroke-width`: espessura da linha;
- `stroke-linecap`: formato das pontas;
- `stroke-linejoin`: formato das unioes.

`circle` cria o circulo da lupa. `cx`, `cy` definem o centro e `r` o raio. `path` desenha a haste da lupa usando o atributo `d`.

### 4.7 CTA

CTA significa “Call To Action”, ou chamada para uma acao.

```html
<a href="#" class="cta auth-trigger">
	Comece agora
	<svg>...</svg>
</a>
```

A classe `cta` cria um botao visual mesmo sendo um link. A classe `auth-trigger` identifica os links que abrem a tela de acesso.

No CSS, `.cta` usa `inline-flex`, `gap`, `border-radius: 999px`, gradiente, sombra e `transition`. O valor 999px deixa o formato bem arredondado.

`.cta::before` cria um brilho que passa pelo botao no hover. `overflow: hidden` impede que o brilho apareca fora dos limites.

### 4.8 Menu hamburger

```html
<button class="menu-btn" id="menuBtn" aria-label="Abrir menu" aria-expanded="false" aria-controls="mobileMenu">
	<span class="menu-icon">
		<span></span>
		<span></span>
		<span></span>
	</span>
</button>
```

Os tres `span` internos formam as tres linhas do icone.

- `id="menuBtn"` identifica o botao;
- `aria-expanded` informa se o menu esta aberto;
- `aria-controls="mobileMenu"` relaciona o botao ao menu controlado;
- `.menu-btn` fica oculto em telas grandes e aparece no mobile;
- `.menu-btn.open` muda as linhas para formar um X;
- `nth-child(1)`, `nth-child(2)` e `nth-child(3)` selecionam cada linha pela ordem.

---

## 5. Menu mobile

```html
<nav class="mobile-menu" id="mobileMenu" aria-label="Navegação mobile">
	<a href="#" class="mobile-link active">Início</a>
	...
	<div class="mobile-divider"></div>
	<a href="#" class="cta mobile-cta auth-trigger">Comece agora ...</a>
</nav>
```

E outro elemento `nav`, separado da navegacao desktop, criado para telas pequenas.

`id="mobileMenu"` permite que o botao hamburger se relacione com ele.

`.mobile-menu` fica invisivel por padrao com:

- `opacity: 0`: transparencia total;
- `visibility: hidden`: nao fica visivel nem disponivel normalmente;
- `transform`: inicia deslocado e levemente reduzido;
- `transition`: anima a abertura.

Quando recebe `.open`, o CSS aplica `opacity: 1`, `visibility: visible` e a transformacao final.

`mobile-divider` e uma linha separadora. `mobile-cta` faz o CTA ocupar toda a largura do menu.

---

## 6. Conteudo principal

### 6.1 `<main>` e a secao hero

```html
<main class="landing-content">
	<section class="hero-content" aria-labelledby="heroTitle">
```

`main` representa o conteudo principal da pagina. A classe `landing-content` limita a largura e cria espacos.

`section` agrupa uma parte tematica do conteudo. `aria-labelledby="heroTitle"` diz que o titulo com `id="heroTitle"` nomeia essa secao.

### 6.2 Textos do hero

```html
<div class="hero-copy">
	<p class="hero-eyebrow">CT - Sistema GFG</p>
	<h1 id="heroTitle">Disciplina<br>foco<br><span>evolução</span></h1>
	<p class="hero-description">...</p>
</div>
```

- `div.hero-copy` agrupa os textos;
- `p` representa paragrafos;
- `hero-eyebrow` e o pequeno texto acima do titulo;
- `h1` e o titulo principal da pagina e deve ser o titulo mais importante;
- `br` quebra a linha manualmente;
- `span` permite destacar apenas `evolução`;
- `hero-description` e o texto explicativo.

O CSS usa `clamp()` no titulo:

```css
font-size: clamp(3.4rem, 8vw, 6.6rem);
```

`clamp(minimo, valor preferencial, maximo)` deixa o tamanho responsivo sem ficar menor ou maior que os limites.

### 6.3 Imagem principal

```html
<img class="hero-image"
	src="imagens/gfg.png"
	data-gray-src="imagens/gfg.png"
	data-red-src="mudan%C3%A7a%20de%20cor/imagens/gfg.png"
	alt="Atleta treinando no centro GFG">
```

`img` exibe uma imagem e nao possui tag de fechamento.

- `src` e o caminho inicial;
- `data-gray-src` guarda o caminho do tema cinza;
- `data-red-src` guarda o caminho do tema vermelho;
- `alt` descreve a imagem para leitores de tela e quando a imagem nao carrega;
- `hero-image` aplica tamanho, borda, opacidade e mascara.

Os atributos `data-*` sao atributos personalizados validos em HTML5. Eles guardam informacoes sem criar elementos visuais.

No CSS:

- `object-fit: cover` preenche a area cortando o excesso sem deformar;
- `object-position: center` centraliza o corte;
- `mask-image` cria uma transicao de transparencia em uma extremidade;
- `opacity: .72` deixa a imagem parcialmente transparente.

### 6.4 Botoes de acao do hero

```html
<div class="hero-actions">
	<a href="#" class="cta auth-trigger">Comece agora ...</a>
	<a href="#modalidades" class="secondary-cta">Conheça as modalidades</a>
</div>
```

O primeiro link usa o estilo principal `cta`. O segundo usa `href="#modalidades"`, que leva o navegador ao elemento com `id="modalidades"`.

`.hero-actions` usa flexbox, permite quebra de linha com `flex-wrap` e cria espaco com `gap`.

### 6.5 Secao de modalidades

```html
<section class="modalities-section" id="modalidades" aria-labelledby="modalitiesTitle">
	<div class="section-heading">
		<h2 id="modalitiesTitle">Nossas modalidades</h2>
		<p>...</p>
	</div>
	<div class="modality-grid">...</div>
</section>
```

`id="modalidades"` e o destino do link “Conheça as modalidades”.

`h2` e um titulo de segundo nivel, usado depois do `h1`.

`.modality-grid` usa:

```css
display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 16px;
```

Isso cria tres colunas de tamanho igual com 16 pixels de espaco.

### 6.6 Cards e elemento `<article>`

```html
<article class="modality-card">
	<img class="modality-image" ...>
	<span class="modality-number">01</span>
	<h3>Muay Thai</h3>
	<p>...</p>
	<a href="#" aria-label="Conheça Muay Thai">Conhecer <span aria-hidden="true">&rarr;</span></a>
</article>
```

`article` representa um bloco independente de conteudo. Cada modalidade e um artigo separado.

- `modality-image`: imagem do card;
- `modality-number`: numeracao;
- `h3`: titulo do card;
- `p`: descricao;
- `a`: link de detalhes;
- `aria-label`: nome completo do link;
- `&rarr;`: entidade HTML que representa uma seta;
- `aria-hidden="true"`: a seta e decorativa e nao precisa ser lida.

No CSS, o card possui `overflow: hidden`, fundo em gradiente, borda, raio, sombra e uma animacao de elevacao no `:hover` com `transform: translateY(-5px)`.

---

## 7. Tela de autenticacao

```html
<main class="auth-screen" id="authScreen" aria-hidden="true">
	<section class="auth-card" role="dialog" aria-modal="true" aria-labelledby="authTitle">
```

Essa estrutura representa uma tela sobreposta para login/cadastro.

- `auth-screen` ocupa a janela inteira;
- `id="authScreen"` identifica a tela;
- `aria-hidden="true"` informa que ela comeca escondida;
- `role="dialog"` informa que o conteudo funciona como uma caixa de dialogo;
- `aria-modal="true"` informa que o usuario deve interagir com essa janela;
- `aria-labelledby="authTitle"` relaciona a janela ao titulo.

No CSS, `.auth-screen` usa:

- `position: fixed` e `inset: 0` para cobrir a janela;
- `z-index: 2000` para ficar acima da navbar;
- `display: grid` e `place-items: center` para centralizar o cartao;
- `opacity`, `visibility` e `pointer-events` para manter a tela fechada;
- `.is-visible` para tornar a tela visivel;
- `backdrop-filter` para criar o efeito de vidro.

### 7.1 Fechamento e avatar

```html
<button class="auth-close" id="authClose" type="button" aria-label="Fechar autenticação">&times;</button>
<div class="auth-avatar" aria-hidden="true">
	<svg>...</svg>
</div>
```

`&times;` representa o simbolo de fechar. O SVG desenha um avatar decorativo usando `circle` e `path`.

### 7.2 Cabecalho da autenticacao

```html
<div class="auth-heading">
	<p class="auth-kicker">System GFG</p>
	<h1 id="authTitle">Bem-vindo de volta</h1>
	<p id="authSubtitle">Acesse sua conta para continuar</p>
</div>
```

`auth-kicker` e o pequeno rotulo. `authTitle` e o titulo da janela. `authSubtitle` e o texto complementar.

### 7.3 Abas

```html
<div class="auth-tabs" role="tablist" aria-label="Tipo de acesso">
	<button class="auth-tab is-active" id="loginTab" type="button" role="tab" aria-selected="true">Entrar</button>
	<button class="auth-tab" id="registerTab" type="button" role="tab" aria-selected="false">Criar conta</button>
</div>
```

`role="tablist"` informa que o conteiner possui abas. Cada botao recebe `role="tab"`. `aria-selected` informa qual aba esta selecionada.

O CSS transforma `.auth-tabs` em duas colunas usando `grid-template-columns: 1fr 1fr`.

### 7.4 Formulario visual

```html
<div class="auth-form">
	<label class="auth-field">...</label>
	<label class="auth-field name-field" id="nameField" hidden>...</label>
	<label class="auth-field">...</label>
	<div class="auth-options">...</div>
	<button class="auth-submit" type="button">ENTRAR</button>
</div>
```

`label` associa um texto a um campo. Mesmo quando a associacao automatica nao usa `for`, o input esta dentro do label.

`hidden` e um atributo HTML que inicia o campo de nome escondido.

`input` cria campos de entrada:

- `type="email"` indica campo de e-mail;
- `type="text"` indica texto comum;
- `type="password"` esconde a senha;
- `placeholder` mostra uma dica antes da digitacao;
- `aria-label` da um nome acessivel.

`checkbox` cria a caixa “Lembrar de mim”.

`auth-submit` e o botao visual de envio. Como o projeto nao possui formulario com `form action`, ele e apenas uma interface visual.

---

## 8. CSS: reset e regras globais

### 8.1 Reset universal

```css
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}
```

`*` seleciona todos os elementos.

- `margin: 0` remove margens padrao;
- `padding: 0` remove espacos internos padrao;
- `box-sizing: border-box` faz largura e altura incluir padding e borda, facilitando o controle dos tamanhos.

### 8.2 Variaveis CSS

```css
:root {
	--brand: #d7d7d7;
	--bg-1: #050505;
	--white: #ffffff;
	--border: rgba(255, 255, 255, 0.18);
}
```

`:root` representa o elemento raiz do documento. Variaveis iniciadas com `--` armazenam valores reutilizaveis. Elas sao usadas com `var(--nome)`.

Vantagens:

- trocar uma cor em um unico lugar;
- manter consistencia entre componentes;
- facilitar a criacao de temas;
- evitar repetir valores.

As principais variaveis sao:

- `--font-body` e `--font-display`: fontes;
- `--brand`, `--brand-strong`, `--brand-soft`: cores da marca;
- `--brand-contrast`: cor do texto sobre a marca;
- `--bg-1`, `--bg-2`, `--bg-3`: cores do fundo;
- `--red-950` ate `--red-400`: nomes historicos para niveis de destaque;
- `--white`: texto claro;
- `--muted`: texto secundario;
- `--border`: bordas semitransparentes.

### 8.3 Seletor do tema cinza

```css
:root[data-theme="gray"] {
	--brand: #9ca3af;
	--bg-1: #111111;
	--red-400: var(--brand-soft);
}
```

Esse seletor escolhe o `:root` somente quando ele possui o atributo `data-theme="gray"`. Assim, o mesmo HTML pode receber outro conjunto de variaveis sem trocar todas as classes.

---

## 9. CSS: cores e funcoes usadas

### 9.1 Hexadecimal

`#ffffff` representa branco. O formato possui seis caracteres: dois para vermelho, dois para verde e dois para azul.

Exemplo: `#ff0000` e vermelho puro.

### 9.2 `rgba()`

```css
rgba(255, 255, 255, 0.18)
```

Os tres primeiros valores sao vermelho, verde e azul. O quarto e a opacidade. `0` e transparente e `1` e totalmente opaco.

### 9.3 `linear-gradient()`

```css
linear-gradient(135deg, #050505 0%, #171717 52%, #000000 100%)
```

Cria uma transicao linear entre cores. `135deg` define a direcao. As porcentagens indicam onde cada cor aparece.

### 9.4 `radial-gradient()`

```css
radial-gradient(circle at 68% 34%, rgba(...), transparent 30%)
```

Cria uma transicao que parte de um ponto e se espalha em formato circular.

### 9.5 `calc()`, `min()` e `clamp()`

- `calc(100% - 40px)` faz uma conta entre unidades;
- `min(1440px, calc(...))` escolhe o menor valor;
- `clamp(3rem, 16vw, 5rem)` limita um valor entre minimo e maximo.

---

## 10. CSS: layout da pagina

### 10.1 Corpo

```css
body {
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	overflow-x: hidden;
	padding: 140px 24px 80px;
}
```

- `min-height: 100vh`: pelo menos a altura total da janela;
- `display: flex`: ativa flexbox;
- `flex-direction: column`: organiza filhos verticalmente;
- `align-items: center`: centraliza horizontalmente;
- `justify-content: center`: distribui no eixo vertical;
- `overflow-x: hidden`: evita rolagem horizontal acidental;
- `padding`: reserva espaco para navbar e conteudo.

O fundo possui varios gradientes sobrepostos. A ordem do CSS coloca o primeiro gradiente na frente dos seguintes.

### 10.2 Pseudo-elemento do fundo

```css
body::before {
	content: "";
	position: fixed;
	inset: 0;
	z-index: -1;
	pointer-events: none;
}
```

Esse pseudo-elemento cria uma grade decorativa sem adicionar um elemento ao HTML.

- `content: ""` torna o pseudo-elemento existente;
- `fixed` faz a grade acompanhar a janela;
- `inset: 0` equivale a top, right, bottom e left iguais a zero;
- `z-index: -1` coloca a decoracao atras;
- `pointer-events: none` permite clicar atraves dela.

### 10.3 Grid e Flexbox

O projeto usa dois sistemas principais:

**Flexbox** e usado em barras, botoes e grupos em uma dimensao. Propriedades principais: `display: flex`, `align-items`, `justify-content`, `gap`, `flex-wrap`.

**Grid** e usado quando o layout precisa de linhas e colunas. Propriedades principais: `display: grid`, `grid-template-columns`, `gap`, `place-items`.

---

## 11. CSS: imagens, cards e tipografia

### Imagens

```css
.modality-image {
	display: block;
	width: calc(100% + 48px);
	height: 145px;
	margin: 0 -24px 20px;
	object-fit: cover;
	filter: saturate(.85) contrast(1.05);
}
```

`display: block` remove o espaco inesperado de imagens inline. A largura maior e a margem negativa fazem a imagem encostar nas bordas internas do card. `filter` reduz um pouco a saturacao e aumenta o contraste.

### Tipografia

- `font-family`: escolhe a fonte;
- `font-size`: tamanho;
- `font-weight`: espessura;
- `line-height`: altura das linhas;
- `letter-spacing`: espaco entre letras;
- `text-transform: uppercase`: converte visualmente para maiusculas;
- `text-decoration: none`: remove sublinhado dos links.

### Transicoes

```css
transition: transform .25s ease, border-color .25s ease;
```

`transition` suaviza mudancas entre estados. `ease` faz a animacao com aceleracao e desaceleracao naturais.

### Hover

`:hover` e aplicado quando o ponteiro esta sobre o elemento. No projeto ele muda fundo, borda, sombra e posicao dos botoes e cards.

### Focus acessivel

```css
:focus-visible {
	outline: 2px solid var(--red-400);
	outline-offset: 3px;
}
```

`:focus-visible` mostra o contorno quando o elemento recebe foco de uma forma que precisa ser indicada, especialmente pelo teclado. `outline-offset` afasta o contorno do elemento.

---

## 12. Media queries e responsividade

### Tablet: `max-width: 1050px`

```css
@media (max-width: 1050px) { ... }
```

A regra vale quando a largura da janela e no maximo 1050 pixels. Os links ficam menores e o botao de pesquisa desaparece para economizar espaco.

### Celular: `max-width: 780px`

Nessa largura:

- o hero passa de duas colunas para uma;
- a imagem fica abaixo do texto;
- os cards passam de tres colunas para uma;
- links desktop desaparecem;
- o botao hamburger aparece;
- o menu mobile fica disponivel visualmente quando aberto;
- o CTA da navbar desaparece.

```css
.hero-content {
	grid-template-columns: 1fr;
}

.modality-grid {
	grid-template-columns: 1fr;
}
```

`1fr` significa uma fracao flexivel ocupando todo o espaco disponivel.

### Celular pequeno: `max-width: 400px`

Reduz ainda mais a altura da navbar, o tamanho do logo e os espacos internos. Os botoes do hero passam a ocupar toda a largura e ficam empilhados.

### Reducao de movimento

```css
@media (prefers-reduced-motion: reduce) {
	*,
	*::before,
	*::after {
		scroll-behavior: auto !important;
		transition-duration: 0.01ms !important;
		animation-duration: 0.01ms !important;
		animation-iteration-count: 1 !important;
	}
}
```

Essa media query respeita a preferencia do sistema operacional de usuarios que sentem desconforto com movimento. Ela praticamente desliga transicoes e animacoes.

`!important` aumenta a prioridade da regra para garantir que a reducao seja respeitada.

---

## 13. Diferenca do tema vermelho

O arquivo `mudança de cor/style.css` conserva a mesma estrutura de seletores, mas troca valores visuais. Entre as principais alteracoes estao:

- fundo preto com gradientes vermelhos;
- bordas com vermelho semitransparente;
- sombras vermelhas;
- `--brand` e `--red-400` com tons de vermelho;
- links ativos em vermelho;
- CTA com gradiente vermelho;
- menu mobile com fundo vermelho escuro;
- cards com fundo vermelho escuro;
- tela de autenticacao com brilho vermelho;
- campos e botoes de login com detalhes vermelhos.

Como os seletores continuam iguais, o mesmo HTML funciona nos dois temas. As imagens tambem possuem dois caminhos em `data-gray-src` e `data-red-src`, permitindo que cada tema use seu proprio arquivo.

---

## 14. Resumo dos elementos HTML

| Elemento | Funcao |
| --- | --- |
| `html` | Raiz do documento |
| `head` | Metadados e imports |
| `meta` | Informacoes tecnicas e sociais |
| `title` | Titulo da aba |
| `link` | Favicon, fonte ou CSS externo |
| `body` | Conteudo visivel |
| `header` | Cabecalho |
| `nav` | Navegacao |
| `main` | Conteudo principal |
| `section` | Secao tematica |
| `div` | Agrupamento generico |
| `article` | Conteudo independente, como um card |
| `a` | Link |
| `button` | Botao clicavel |
| `img` | Imagem |
| `svg` | Desenho vetorial |
| `circle` | Circulo dentro do SVG |
| `path` | Linha ou forma dentro do SVG |
| `p` | Paragrafo |
| `h1`, `h2`, `h3` | Titulos hierarquicos |
| `span` | Pequeno agrupamento de texto ou decoracao |
| `label` | Nome e agrupamento de campo |
| `input` | Entrada de dados |
| `br` | Quebra de linha |

## 15. Resumo das propriedades CSS mais importantes

| Propriedade | Funcao |
| --- | --- |
| `display` | Define o modelo de exibicao |
| `position` | Define o tipo de posicionamento |
| `top`, `left`, `inset` | Posicionam elementos |
| `z-index` | Controla camadas |
| `width`, `height` | Controlam dimensoes |
| `margin`, `padding` | Controlam espacos |
| `color` | Cor do texto |
| `background` | Fundo, cor ou gradiente |
| `border` | Borda |
| `border-radius` | Arredondamento |
| `box-shadow` | Sombra |
| `font-family` | Familia de fonte |
| `font-size` | Tamanho da fonte |
| `font-weight` | Peso da fonte |
| `line-height` | Altura da linha |
| `gap` | Espaco entre itens flex ou grid |
| `grid-template-columns` | Colunas do grid |
| `align-items` | Alinhamento no eixo cruzado |
| `justify-content` | Distribuicao no eixo principal |
| `object-fit` | Ajuste de imagem |
| `opacity` | Transparencia |
| `filter` | Efeitos visuais |
| `transform` | Deslocamento, escala ou rotacao |
| `transition` | Animacao suave de mudancas |
| `overflow` | Controle do conteudo que ultrapassa limites |
| `cursor` | Aparencia do cursor |
| `outline` | Contorno de foco |
| `mask-image` | Mascara de transparencia |

## Conclusao

O HTML organiza semanticamente a pagina em cabecalho, navegacao, hero, modalidades e autenticacao. O CSS transforma essa estrutura em uma interface visual com tema cinza, tema vermelho, gradientes, imagens, cards, efeitos de hover, menu responsivo e suporte a telas pequenas.

O ponto principal da troca visual e a reutilizacao da mesma estrutura: o HTML permanece igual, enquanto as variaveis, cores e regras da folha vermelha alteram a aparencia.
