/* =========================================================================
   JESUS SALON — Interações (JavaScript puro)
   ========================================================================= */

/* -------------------------------------------------------------------------
   ⚙️  CONFIGURAÇÃO — EDITE AQUI O WHATSAPP E A MENSAGEM
   -------------------------------------------------------------------------
   • WHATSAPP_NUMERO: número no formato internacional, somente dígitos
     (código do país 55 + DDD 61 + número). Ex.: 5561994431731
   • WHATSAPP_MENSAGENS: textos por serviço; o atributo data-whatsapp-servico
     escolhe a mensagem. Botões sem esse atributo usam a mensagem geral.
   ------------------------------------------------------------------------- */
const WHATSAPP_NUMERO   = "5561994431731";
const WHATSAPP_MENSAGENS = {
  geral: "Olá! Vim pelo site e gostaria de consultar os serviços e horários do Jesus Salon.",
  mechas: "Olá! Tenho interesse em mechas e gostaria de saber como funciona a avaliação e consultar horários.",
  morena: "Olá! Tenho interesse em morena iluminada e gostaria de saber como funciona a avaliação e consultar horários.",
  corte: "Olá! Gostaria de consultar valores e horários para um corte de cabelo.",
  tratamento: "Olá! Gostaria de conversar sobre tratamentos para o meu cabelo e consultar horários.",
  finalizacao: "Olá! Gostaria de consultar as opções de finalização e os horários disponíveis.",
  iluminacao: "Olá! Tenho interesse em iluminação capilar e gostaria de consultar as opções e horários."
};

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
  const servico = el.getAttribute("data-whatsapp-servico") || "geral";
  const mensagem = WHATSAPP_MENSAGENS[servico] || WHATSAPP_MENSAGENS.geral;
  const link = "https://wa.me/" + WHATSAPP_NUMERO + "?text=" + encodeURIComponent(mensagem);
  el.setAttribute("href", link);
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
