# Jesus Salon — Landing Page

Landing page de alta conversão para campanhas de Google Ads, com foco em agendamento via WhatsApp.

Feita em **HTML5 + CSS3 + JavaScript puro** (sem frameworks). Para visualizar, basta dar **duplo clique no `index.html`** — abre direto no navegador.

## 📁 Arquivos

| Arquivo | O que é |
|---|---|
| `index.html` | Estrutura e conteúdo da página |
| `styles.css` | Todo o estilo visual (cores, layout, responsivo) |
| `script.js` | Interações (WhatsApp, menu mobile, etc.) |
| `robots.txt` / `sitemap.xml` | Arquivos de SEO (troque o domínio antes de publicar) |
| `assets/` | Pasta para você colocar as imagens (crie se não existir) |

---

## ✏️ Como editar (o essencial)

### 1) Trocar o número de WhatsApp e a mensagem
Abra `script.js` e edite as **duas primeiras variáveis** no topo:

```js
const WHATSAPP_NUMERO   = "5561994431731"; // país (55) + DDD (61) + número
const WHATSAPP_MENSAGEM = "Olá, vi seus serviços e quero mais informações.";
```

Pronto — **todos** os botões da página (hero, serviços, rodapé, botão flutuante, etc.) são atualizados automaticamente.

### 2) Trocar os textos dos serviços e depoimentos
Abra `index.html` e procure os comentários em maiúsculas:

- **Serviços:** procure por `TROQUE OS TEXTOS DOS SERVIÇOS`. Edite o título (`<h3>`) e a descrição (`<p>`) de cada card.
- **Depoimentos:** procure por `TROQUE OS DEPOIMENTOS`. Edite o texto entre `<p>...</p>` e o nome da cliente em `<footer>`.
- **Headline do topo:** procure por `TROQUE O TEXTO DA HEADLINE`.

### 3) Trocar as fotos
Crie uma pasta `assets/` e coloque suas imagens nela. No `index.html`, procure pelos comentários `Insira sua foto aqui` / `FOTO DE DESTAQUE` / `GALERIA DE FOTOS` e substitua cada `<div class="photo-placeholder">` por uma tag de imagem, por exemplo:

```html
<img src="assets/hero.jpg" alt="Cliente do Jesus Salon com mechas iluminadas"
     width="560" height="640" loading="lazy" />
```

Dimensões recomendadas:
- **Foto do topo (hero):** 560 × 640px (vertical)
- **Galeria de resultados:** 400 × 400px (quadradas, todas no mesmo tamanho)
- **Imagem de compartilhamento (OG):** 1200 × 630px → salve como `assets/og-image.jpg`
- **Logo:** já incluída em `images/`. Existem duas versões geradas a partir da sua logo:
  - `logo-marrom.png` → usada no **header** (fundo claro) e no favicon
  - `logo-branca.png` → usada no **rodapé** (fundo escuro)
  - `logo.svg` → arquivo original. Para trocar a logo, substitua os dois PNGs (mesmos nomes) ou me peça para regerar a partir de um novo SVG. O tamanho é controlado no `styles.css` pela classe `.logo-img` (`height`).

---

## 🔧 Outros ajustes

- **Endereço / horário:** no `index.html`, seção `Localização` (procure por `id="localizacao"`).
- **Mapa do Google:** na mesma seção, troque o `src` do `<iframe>` pelo código "Incorporar um mapa" do Google Maps.
- **Redes sociais:** no rodapé, troque os `href="#"` dos links Instagram/Facebook.
- **Domínio (SEO):** ao publicar, troque `https://www.jesussalon.com.br/` pelo domínio real em `index.html` (tags canonical/OG e JSON-LD), `robots.txt` e `sitemap.xml`.

---

## ✅ Já incluso
SEO técnico (meta tags, Open Graph, Twitter Card, JSON-LD `HairSalon` com nota 5,0 / 66 avaliações), HTML semântico, design responsivo (mobile-first, ok em 360px), botão flutuante de WhatsApp com animação, e múltiplos CTAs ao longo da página.
