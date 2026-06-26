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
   Aplica o link em todos os botões/links com a classe ".js-whatsapp"
   e garante abertura em nova aba com segurança.
   ------------------------------------------------------------------------- */
document.querySelectorAll(".js-whatsapp").forEach(function (el) {
  el.setAttribute("href", WHATSAPP_LINK);
  el.setAttribute("target", "_blank");
  el.setAttribute("rel", "noopener");
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
