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

### 1) Trocar o número de WhatsApp e as mensagens
Abra `script.js`: `WHATSAPP_NUMERO` define o telefone e `WHATSAPP_MENSAGENS` contém as mensagens geral e por serviço. O atributo `data-whatsapp-servico` dos botões em `index.html` seleciona a mensagem; botões sem atributo usam `geral`.

A conversão do Google Ads continua registrada somente no clique em `.js-whatsapp`, com o mesmo identificador de evento.

### 2) Textos e depoimentos
Os serviços e o título ficam em `index.html`. Os depoimentos provisórios foram retirados; publique apenas depoimentos reais autorizados. Os links sociais sem destino confirmado também foram retirados.

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
- **Redes sociais:** perfis oficiais do salão e do Laécio publicados no rodapé.
- **Domínio (SEO):** ao publicar, troque `https://www.jesussalon.com.br/` pelo domínio real em `index.html` (tags canonical/OG e JSON-LD), `robots.txt` e `sitemap.xml`.

---

## ✅ Já incluso
SEO técnico (meta tags, Open Graph, Twitter Card, JSON-LD `HairSalon` com nota 5,0 / 66 avaliações), HTML semântico, design responsivo (mobile-first, ok em 360px), botão flutuante de WhatsApp com animação, e múltiplos CTAs ao longo da página.


## Atualização de avaliações (15/09/2026)

A página usa avaliações reais e uma contagem conferida em 15/09/2026, com data visível.
O endpoint `/api/reviews` consulta somente a nota e a quantidade do Jesus Salon na
API Google Business Profile. O cache dura até uma hora. Os depoimentos selecionados
não são trocados automaticamente. Não há coleta de avaliações por scraping.

A integração só fica ativa após configurar no Vercel, como variáveis sensíveis de
servidor: `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REFRESH_TOKEN`.
Usar o projeto OAuth aprovado da BNC e uma autorização existente para este perfil,
com escopo `https://www.googleapis.com/auth/business.manage`. Nunca colocar esses
valores no HTML, JavaScript do navegador ou GitHub. Fazer novo deploy após configurá-los.

Sem credenciais ou em falha do Google, o endpoint retorna 503 e o site mantém o
registro datado, sem afirmar que está atualizado em tempo real. Para validar a
ativação, `/api/reviews` deve retornar HTTP 200, `available: true`, `rating`, `count`
e `updatedAt`; verificar a data na página. A implementação não comprova recebimento
da conversão no painel Google Ads; isso requer teste no Tag Assistant/conta de Ads.

Perfis oficiais confirmados pelo cliente: https://www.instagram.com/jesussalonn/
(salão) e https://www.instagram.com/laeciodejesus_/ (Laécio de Jesus).

Pendências externas: Meta Pixel específico, credenciais Google para a integração
e atualizar o site no Google Business Profile, ainda apontado ao Carrd no levantamento.
