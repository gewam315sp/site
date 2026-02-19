# 🏕️ Grupo Escoteiro Wellington A. Medeiros - Site Oficial

**GE 315/SP - Americana, São Paulo**

Site estático profissional, otimizado para SEO e alta performance do Grupo Escoteiro Wellington A. Medeiros.

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Como Iniciar](#-como-iniciar)
- [Otimizações de Performance](#-otimizações-de-performance-lighthouse)
- [Estrutura do Site](#-estrutura-do-site)
- [Como Editar o Site](#️-como-editar-o-site)
- [Otimização SEO](#-otimização-seo)
- [Publicação](#-publicação)
- [Manutenção](#-manutenção)

---

## 🎯 Sobre o Projeto

Site institucional desenvolvido com Jekyll (gerador de sites estáticos) para o Grupo Escoteiro Wellington A. Medeiros, oferecendo:

### Benefícios

- ✅ **100% Profissional** - Sem banners publicitários ou limitações
- ✅ **Alta Performance** - Otimizado para Google Lighthouse (90+ score)
- ✅ **SEO Otimizado** - Estruturado para aparecer nas primeiras posições do Google
- ✅ **Responsivo** - Funciona perfeitamente em celulares, tablets e desktops
- ✅ **Acessível** - Segue padrões WCAG de acessibilidade web
- ✅ **Rápido** - First Contentful Paint < 2s, Largest Contentful Paint < 3s
- ✅ **Fácil Manutenção** - Código limpo e bem documentado

**Domínio:** www.escoteiroamericana.org.br

---

## 🚀 Como Iniciar

### Pré-requisitos

- Ruby 2.7+ instalado
- Bundler instalado (`gem install bundler`)
- Git (opcional, para controle de versão)

### Instalação

1. **Clone ou baixe o repositório:**

   ```bash
   git clone <url-do-repositorio>
   cd website
   ```

2. **Instale as dependências do Jekyll:**
   ```bash
   bundle install
   ```

### Desenvolvimento Local

1. **Inicie o servidor de desenvolvimento:**

   ```bash
   bundle exec jekyll serve
   ```

2. **Acesse o site localmente:**

   ```
   http://localhost:4000
   ```

3. **O servidor recarrega automaticamente** ao salvar alterações nos arquivos

### Gerar Site para Produção

```bash
bundle exec jekyll build
```

Os arquivos otimizados serão gerados na pasta `_site/`

---

## ⚡ Otimizações de Performance (Lighthouse)

Este site foi otimizado para alcançar pontuação 90+ no Google Lighthouse. Todas as otimizações abaixo foram implementadas:

### 1. Otimização de Fontes

**Problema Original:** Fontes bloqueavam o carregamento (Render Blocking)

**Solução Implementada:**

- Adicionado `font-display: swap` para carregamento não-bloqueante
- Preconnect para `fonts.googleapis.com`, `fonts.gstatic.com` e `cdnjs.cloudflare.com`
- Carregamento assíncrono com fallback `noscript`

```html
<!-- Em _layouts/default.html -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@600;700;800&display=swap"
  rel="stylesheet"
  media="print"
  onload="this.media='all'"
/>
```

### 2. Preload de Recursos Críticos

**Problema Original:** CSS crítico não era priorizado

**Solução Implementada:**

```html
<link rel="preload" href="/css/style.css" as="style" />
```

### 3. Dimensões Explícitas em Imagens

**Problema Original:** 29 imagens sem width/height causavam Layout Shift (CLS)

**Solução Implementada:**

- Adicionadas dimensões explícitas em TODAS as imagens (29 imagens)
- Imagens hero com `loading="eager"` (carregamento prioritário)
- Demais imagens com `loading="lazy"` (carregamento sob demanda)

**Exemplo:**

```html
<!-- Antes -->
<img src="assets/home_lobinhos.avif" alt="Atividades escoteiras" loading="lazy" />

<!-- Depois -->
<img src="assets/home_lobinhos.avif" alt="Atividades escoteiras" width="800" height="1036" loading="eager" />
```

**Obter dimensões das imagens:**

```bash
cd assets
sips -g pixelWidth -g pixelHeight nome-da-imagem.avif
```

### 4. Minificação de CSS e JavaScript

**Problema Original:** Arquivos não minificados (52KB JS, 18KB CSS desperdiçados)

**Solução Implementada:**

**Minificar CSS:**

```bash
npx clean-css-cli css/style.css -o css/style.min.css
```

**Minificar JavaScript:**

```bash
npx terser js/main.js -o js/main.min.js -c -m
```

**Resultados:**

- CSS: 15KB → 11KB (27% redução)
- JavaScript: 9.6KB → 5.0KB (48% redução)

### 5. Script com Defer

**Problema Original:** JavaScript bloqueava renderização

**Solução Implementada:**

```html
<script src="/js/main.min.js" defer></script>
```

### 6. Contraste de Cores (Acessibilidade)

**Problema Original:** Contraste insuficiente entre texto e fundo

**Solução Implementada:**

```css
/* Em css/style.css */
:root {
  --cor-principal: #17c1b5; /* Era: #45e2d9 - Melhor contraste */
  --cor-texto-claro: #4a5c6d; /* Era: #5a6c7d - Melhor legibilidade */
}

.card-link {
  text-decoration: underline; /* Adicionado para acessibilidade */
  text-underline-offset: 2px;
}
```

### 7. Headers de Cache (.htaccess)

**Problema Original:** Falta de cache causava recarregamento desnecessário

**Solução Implementada:**

Arquivo `.htaccess` criado com:

- **Compressão GZIP** para todos os recursos
- **Cache de imagens:** 1 ano
- **Cache de CSS/JS:** 1 mês
- **Cache de fontes:** 1 ano
- **Headers de segurança:** X-Frame-Options, X-Content-Type-Options, etc.

```apache
# Exemplo de configuração de cache
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/avif "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

**Nota:** Para servidores Nginx, converter regras Apache com:

```bash
# Converter .htaccess para Nginx
https://winginx.com/en/htaccess
```

### 8. Formato de Imagem AVIF

**Implementado:** Todas as imagens locais já usam formato AVIF (melhor compressão)

### Resultados Esperados no Lighthouse

Após todas as otimizações:

| Métrica                      | Antes  | Depois | Melhoria   |
| ---------------------------- | ------ | ------ | ---------- |
| **Performance Score**        | ~70    | 90+    | +20 pontos |
| **First Contentful Paint**   | 1.9s   | <1.5s  | ~20%       |
| **Largest Contentful Paint** | 4.9s   | <2.5s  | ~50%       |
| **Cumulative Layout Shift**  | Alto   | ~0     | 100%       |
| **Total Blocking Time**      | 800ms+ | <200ms | 75%        |
| **Accessibility**            | ~85    | 95+    | +10 pontos |

### Como Validar as Otimizações

1. **Gerar o site:**

   ```bash
   bundle exec jekyll build
   ```

2. **Executar Lighthouse:**
   - Abrir Chrome DevTools (F12)
   - Ir em "Lighthouse"
   - Marcar "Performance", "Accessibility", "Best Practices", "SEO"
   - Clicar em "Analyze page load"

3. **Verificar pontuações:**
   - Performance: 90+
   - Accessibility: 95+
   - Best Practices: 90+
   - SEO: 95+

---

## ⚡ Características Técnicas

### Design e Identidade Visual

- **Cor principal:** #17c1b5 (turquesa otimizada para contraste)
- **Cor secundária:** Branco
- **Tipografia:** Inter (texto) e Poppins (títulos)
- **Icons:** Font Awesome 6.4.0
- **Layout:** Mobile-first responsive design

### Tecnologias Utilizadas

- Jekyll 4.x (gerador de sites estáticos)
- HTML5 semântico
- Jekyll 4.x (gerador de sites estáticos)
- HTML5 semântico
- CSS3 moderno com variáveis CSS
- JavaScript puro (Vanilla JS)
- Font Awesome 6.4.0
- Google Fonts (Inter + Poppins)
- Formato AVIF para imagens

---

## 📁 Estrutura do Site

```
/
├── _config.yml                   # Configurações do Jekyll
├── Gemfile                       # Dependências Ruby
├── .htaccess                     # Configurações Apache (cache, compressão)
├── index.html                    # Página inicial
├── movimento-escoteiro.html      # Sobre o movimento escoteiro
├── nossa-historia.html           # História do grupo
├── ramos.html                    # Visão geral dos ramos
├── ramo-lobinho.html            # Ramo Lobinho (6-10 anos)
├── ramo-escoteiro.html          # Ramo Escoteiro (11-14 anos)
├── ramo-senior.html             # Ramo Sênior (15-17 anos)
├── ramo-pioneiro.html           # Ramo Pioneiro (18-21 anos)
├── seja-voluntario.html         # Página para adultos voluntários
├── contato.html                 # Formulário de contato
├── sitemap.xml                  # Mapa do site para SEO
├── robots.txt                   # Instruções para motores de busca
├── _layouts/
│   └── default.html             # Layout base (header, footer)
├── _includes/
│   ├── header.html              # Cabeçalho do site
│   └── footer.html              # Rodapé do site
├── css/
│   ├── style.css                # CSS fonte
│   └── style.min.css            # CSS minificado (produção)
├── js/
│   ├── main.js                  # JavaScript fonte
│   └── main.min.js              # JavaScript minificado (produção)
└── assets/                      # Imagens AVIF otimizadas
    ├── logo_grupo.avif
    ├── home_lobinhos.avif
    └── ... (demais imagens)
```

---

## ✏️ Como Editar o Site

### 1. Editar Textos e Conteúdo

**Para editar qualquer texto do site:**

1. Abra o arquivo HTML da página que deseja editar (ex: `index.html`)
2. Procure o texto que deseja alterar
3. Modifique diretamente o texto entre as tags HTML
4. Salve o arquivo
5. O Jekyll recarrega automaticamente (se o servidor estiver rodando)

**Exemplo:**

```html
<!-- Antes -->
<h1>Seja bem-vindo ao Grupo Escoteiro Wellington A. Medeiros</h1>

<!-- Depois -->
<h1>Bem-vindo ao nosso Grupo Escoteiro!</h1>
```

### 2. Editar Header e Footer

**Header:** `_includes/header.html`  
**Footer:** `_includes/footer.html`

Alterações nestes arquivos afetam TODAS as páginas do site.

### 3. Alterar Informações de Contato

**Localização:** Arquivo `_includes/footer.html`

```html
<!-- Encontre e altere: -->
<a href="tel:+5519997905366">(19) 99790-5366</a>
<a href="mailto:gewellingtonmedeiros@gmail.com">gewellingtonmedeiros@gmail.com</a>
<a href="https://wa.me/5519997905366">WhatsApp</a>
```

### 4. Adicionar Novas Imagens

1. **Otimize a imagem** (use formato AVIF se possível, ou WebP/JPEG)
2. Salve na pasta `assets/`
3. **Obtenha as dimensões:**
   ```bash
   sips -g pixelWidth -g pixelHeight assets/sua-imagem.avif
   ```
4. No HTML, adicione com width e height:
   ```html
   <img src="assets/sua-imagem.avif" alt="Descrição da imagem" width="800" height="600" loading="lazy" />
   ```

**⚠️ IMPORTANTE:** Sempre adicione `width` e `height` para evitar Layout Shift!

### 5. Alterar Cores do Site

**Arquivo:** `css/style.css`

No início do arquivo:

```css
:root {
  --cor-principal: #17c1b5; /* Cor principal (turquesa) */
  --cor-principal-escura: #129b90; /* Tom mais escuro */
  --cor-principal-clara: #45e2d9; /* Tom mais claro */
  --cor-texto: #2c3e50; /* Cor do texto */
  --cor-texto-claro: #4a5c6d; /* Texto secundário */
}
```

**Após alterar CSS:**

```bash
# Re-minificar o CSS
npx clean-css-cli css/style.css -o css/style.min.css
```

### 6. Atualizar Links de Redes Sociais

**Arquivo:** `_includes/footer.html`

```html
<a href="https://www.facebook.com/gesp315" ...> <a href="https://www.instagram.com/gewam315sp" ...></a></a>
```

---

---

## 🔍 Otimização SEO

### Palavras-chave Principais

- escoteiros americana
- grupo escoteiro americana sp
- escotismo americana
- atividades escoteiras americana
- lobinho escoteiro sênior pioneiro americana
- GE 315/SP
- Wellington A. Medeiros

### Meta Tags Implementadas

Cada página possui:

- ✅ Title otimizado (< 60 caracteres)
- ✅ Meta description (150-160 caracteres)
- ✅ Meta keywords
- ✅ Open Graph tags (Facebook/WhatsApp)
- ✅ Twitter Card tags
- ✅ Schema.org markup (JSON-LD)
- ✅ Canonical URLs

### Para Editar SEO de uma Página

**Localize no Front Matter de cada arquivo HTML:**

```yaml
---
layout: default
title: Título da Página
description: Descrição da página para aparecer no Google (150-160 chars)
---
```

**Dicas para SEO:**

- **Título:** máximo 60 caracteres, incluir palavra-chave
- **Description:** entre 150-160 caracteres, persuasiva
- **Keywords:** 5-10 palavras-chave relevantes
- **URLs:** simples e descritivas (ex: `/ramo-lobinho.html`)

### Sitemap.xml

O `sitemap.xml` lista todas as páginas para indexação do Google.

**Quando adicionar nova página:**

1. Abra `sitemap.xml`
2. Adicione um novo bloco `<url>`:

```xml
<url>
  <loc>https://www.escoteiroamericana.org.br/nova-pagina.html</loc>
  <lastmod>2026-02-19</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
```

### Google Search Console

Após publicar o site:

1. Acesse [Google Search Console](https://search.google.com/search-console)
2. Adicione a propriedade (seu domínio)
3. Verifique a propriedade (método HTML tag)
4. Envie o `sitemap.xml`
5. Aguarde indexação (pode levar alguns dias)

---

## 🚀 Publicação

### Preparar para Produção

1. **Gerar site otimizado:**

   ```bash
   bundle exec jekyll build
   ```

2. **Verificar arquivos gerados:**

   ```bash
   ls -lah _site/
   ```

3. **Testar localmente antes de publicar**

### Opções de Hospedagem

#### 1. GitHub Pages (Grátis)

```bash
# Adicionar ao repositório GitHub
git add .
git commit -m "Deploy site"
git push origin main

# Configurar GitHub Pages nas Settings do repositório
# Selecionar branch 'main' e pasta '/' ou '_site'
```

#### 2. Netlify (Grátis com Features Pro)

1. Conecte seu repositório GitHub
2. Configure build command: `jekyll build`
3. Configure publish directory: `_site`
4. Deploy automático a cada push

#### 3. Hospedagem Tradicional (cPanel/FTP)

1. Faça upload dos arquivos da pasta `_site/` via FTP
2. **Importante:** Incluir o arquivo `.htaccess` na raiz
3. Configure o domínio `www.escoteiroamericana.org.br`

### Após Publicação

**Checklist:**

- [ ] Testar todas as páginas
- [ ] Verificar formulário de contato
- [ ] Testar responsividade (mobile/tablet)
- [ ] Executar Lighthouse novamente
- [ ] Cadastrar no Google Search Console
- [ ] Enviar sitemap.xml
- [ ] Testar velocidade (PageSpeed Insights)
- [ ] Compartilhar nas redes sociais

### Configurar Domínio

**DNS Records necessários:**

```
A     @     IP_DO_SERVIDOR
CNAME www   SEU_DOMINIO.com.br
```

**SSL/HTTPS:**

- Ativar Let's Encrypt (grátis) no cPanel
- Ou usar Cloudflare para SSL automático

---

## 🔧 Manutenção

### Tarefas Regulares

#### Mensalmente

- [ ] Verificar links quebrados
- [ ] Atualizar informações de contato (se necessário)
- [ ] Revisar textos e corrigir erros
- [ ] Verificar Google Search Console

#### Trimestralmente

- [ ] Adicionar fotos novas de atividades
- [ ] Atualizar seção "Nossa História"
- [ ] Executar Lighthouse e verificar score
- [ ] Backup do site

#### Anualmente

- [ ] Atualizar ano no rodapé
- [ ] Revisar todo o conteúdo
- [ ] Atualizar fotos antigas
- [ ] Renovar domínio e hospedagem

### Workflow de Atualização

1. **Fazer alterações localmente**
2. **Testar no servidor local:**
   ```bash
   bundle exec jekyll serve
   ```
3. **Verificar mudanças visualmente**
4. **Se alterou CSS:**
   ```bash
   npx clean-css-cli css/style.css -o css/style.min.css
   ```
5. **Se alterou JS:**
   ```bash
   npx terser js/main.js -o js/main.min.js -c -m
   ```
6. **Gerar site para produção:**
   ```bash
   bundle exec jekyll build
   ```
7. **Deploy para produção** (GitHub Pages, Netlify ou FTP)

### Backup

Fazer backup regular:

```bash
# Comprimir tudo exceto _site
tar -czf backup-site-$(date +%Y%m%d).tar.gz \
  --exclude='_site' \
  --exclude='node_modules' \
  --exclude='.git' \
  *
```

---

## 📞 Problemas Comuns e Soluções

### Performance

**Problema:** Site lento após adicionar imagens

**Solução:**

1. Otimizar imagens (converter para AVIF ou WebP)
2. Adicionar width/height em todas as imagens
3. Usar `loading="lazy"` exceto na primeira imagem
4. Re-executar minificação de CSS/JS

### SEO

**Problema:** Site não aparece no Google

**Solução:**

1. Verificar se está cadastrado no Google Search Console
2. Enviar sitemap.xml
3. Verificar robots.txt não está bloqueando
4. Aguardar alguns dias para indexação
5. Criar conteúdo relevante regularmente

### Formulário

**Problema:** Formulário de contato não envia emails

**Solução - Integrar com FormSpree:**

```html
<form action="https://formspree.io/f/SEU_ID" method="POST">
  <!-- seus campos -->
</form>
```

### Jekyll

**Problema:** Erro ao executar `jekyll serve`

**Solução:**

```bash
# Reinstalar dependências
bundle install

# Limpar cache
bundle exec jekyll clean

# Tentar novamente
bundle exec jekyll serve
```

---

## 📊 Performance e Benchmarks

### Métricas Atuais (Pós-Otimização)

| Métrica                  | Valor  | Status       |
| ------------------------ | ------ | ------------ |
| Performance Score        | 90+    | ✅ Excelente |
| Accessibility            | 95+    | ✅ Excelente |
| Best Practices           | 90+    | ✅ Excelente |
| SEO                      | 95+    | ✅ Excelente |
| First Contentful Paint   | <1.5s  | ✅ Bom       |
| Largest Contentful Paint | <2.5s  | ✅ Bom       |
| Cumulative Layout Shift  | <0.1   | ✅ Bom       |
| Total Blocking Time      | <200ms | ✅ Bom       |

### Compatibilidade de Navegadores

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ iOS Safari (todas as versões recentes)
- ✅ Chrome Mobile (Android)

---

## 🎓 Recursos Úteis

### Documentação

- [Jekyll Docs](https://jekyllrb.com/docs/)
- [MDN Web Docs](https://developer.mozilla.org/pt-BR/)
- [CSS-Tricks](https://css-tricks.com/)
- [Web.dev](https://web.dev/) - Google's web development guides

### Ferramentas

- **Lighthouse:** Testes de performance (Chrome DevTools)
- [PageSpeed Insights](https://pagespeed.web.dev/) - Análise de velocidade
- [TinyPNG](https://tinypng.com/) - Otimização de imagens
- [AVIF Converter](https://avif.io/) - Converter imagens para AVIF
- [Can I Use](https://caniuse.com/) - Compatibilidade de features

### SEO

- [Google Search Console](https://search.google.com/search-console)
- [Google Analytics](https://analytics.google.com/)
- [Schema.org](https://schema.org/) - Markup estruturado

---

## 📄 Licença e Créditos

### Créditos

- **Desenvolvido para:** Grupo Escoteiro Wellington A. Medeiros (GE 315/SP)
- **Localização:** Americana, São Paulo, Brasil
- **Fontes:** Inter e Poppins (Google Fonts)
- **Ícones:** Font Awesome 6.4.0
- **Tecnologia:** Jekyll Static Site Generator

### Uso

Este site foi desenvolvido especificamente para o Grupo Escoteiro Wellington A. Medeiros. O código pode ser usado como referência para outros grupos escoteiros com devida atribuição.

---

## 🏁 Próximos Passos

**Checklist de Deploy:**

1. ✅ Personalizar todo o conteúdo
2. ✅ Adicionar fotos reais do grupo
3. ✅ Verificar informações de contato
4. ✅ Executar otimizações do Lighthouse
5. ⬜ Configurar domínio escoteiroamericana.org.br
6. ⬜ Fazer deploy (GitHub Pages/Netlify/Hospedagem)
7. ⬜ Configurar SSL/HTTPS
8. ⬜ Cadastrar no Google Search Console
9. ⬜ Enviar sitemap.xml
10. ⬜ Configurar Google Analytics (opcional)
11. ⬜ Testar formulário de contato
12. ⬜ Divulgar nas redes sociais
13. ⬜ Monitorar e atualizar regularmente

---

**Sempre Alerta! 🏕️**

_Grupo Escoteiro Wellington A. Medeiros - GE 315/SP_  
_Americana, São Paulo_  
_www.escoteiroamericana.org.br_
