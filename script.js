/* =========================================================================
   JESUS SALON — Interações (JavaScript puro)
   ========================================================================= */

/* -------------------------------------------------------------------------
   ⚙️  CONFIGURAÇÃO — EDITE AQUI O WHATSAPP E A MENSAGEM
   -------------------------------------------------------------------------
   • WHATSAPP_NUMERO: número no formato internacional, somente dígitos
     (código do país 55 + DDD 61 + número). Ex.: 5561994431731
   • WHATSAPP_MENSAGEM: texto que já vem digitado quando o cliente abre a conversa.
   ------------------------------------------------------------------------- */
const WHATSAPP_NUMERO   = "5561994431731";
const WHATSAPP_MENSAGEM = "Olá, vi seus serviços e quero mais informações.";

/* Monta o link final do WhatsApp (não precisa editar). */
const WHATSAPP_LINK =
  "https://wa.me/" + WHATSAPP_NUMERO + "?text=" + encodeURIComponent(WHATSAPP_MENSAGEM);

/* -------------------------------------------------------------------------
   📊 CONVERSÃO DO GOOGLE ADS (CLIQUE WPP)
   Identificador do evento de conversão (rótulo). Para trocar, edite aqui.
   A tag base (AW-18275338840) fica no <head> do index.html.
   ------------------------------------------------------------------------- */
const GADS_CONVERSAO_SEND_TO = "AW-18275338840/xf7WCNXtn8YcENiUropE";

/* Dispara o evento de conversão no Google Ads (sem redirecionar:
   o link do WhatsApp continua abrindo normalmente em nova aba). */
function reportarConversaoWhatsApp() {
  if (typeof gtag === "function") {
    gtag("event", "conversion", {
      send_to: GADS_CONVERSAO_SEND_TO,
      value: 1.0,
      currency: "BRL"
    });
  }
}

/* -------------------------------------------------------------------------
   Aplica o link em todos os botões/links com a classe ".js-whatsapp",
   garante abertura em nova aba com segurança e registra a conversão no clique.
   ------------------------------------------------------------------------- */
document.querySelectorAll(".js-whatsapp").forEach(function (el) {
  el.setAttribute("href", WHATSAPP_LINK);
  el.setAttribute("target", "_blank");
  el.setAttribute("rel", "noopener");
  el.addEventListener("click", reportarConversaoWhatsApp);
});

/* -------------------------------------------------------------------------
   Menu mobile (abre/fecha)
   ------------------------------------------------------------------------- */
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", function () {
    const aberto = navMenu.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", aberto ? "true" : "false");
    navToggle.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
  });

  /* Fecha o menu ao clicar em qualquer link */
  navMenu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      navMenu.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Abrir menu");
    });
  });
}

/* -------------------------------------------------------------------------
   Sombra no header ao rolar a página
   ------------------------------------------------------------------------- */
const header = document.querySelector(".site-header");
if (header) {
  window.addEventListener(
    "scroll",
    function () {
      header.classList.toggle("scrolled", window.scrollY > 10);
    },
    { passive: true }
  );
}

/* -------------------------------------------------------------------------
   Ano automático no rodapé
   ------------------------------------------------------------------------- */
const anoEl = document.getElementById("ano");
if (anoEl) anoEl.textContent = new Date().getFullYear();
