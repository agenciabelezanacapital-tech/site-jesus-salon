// Keep the dated, verified summary if the live source is unavailable.
(async function updateReviews() {
  try {
    const response = await fetch('/api/reviews', { signal: AbortSignal.timeout(18000) });
    if (!response.ok) return;
    const data = await response.json();
    const updated = new Date(data.updatedAt);
    if (!data.available || !Number.isInteger(data.count) || data.count < 0 ||
        !Number.isFinite(data.rating) || data.rating < 1 || data.rating > 5 ||
        !Number.isFinite(updated.getTime()) || Date.now() - updated.getTime() > 7200000) return;
    const rating = data.rating.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
    const count = data.count.toLocaleString('pt-BR');
    document.querySelectorAll('[data-review-count]').forEach(el => { el.textContent = count; });
    document.querySelectorAll('[data-review-rating]').forEach(el => { el.textContent = rating; });
    document.querySelectorAll('[data-review-summary]').forEach(el => {
      el.textContent = `★ ${rating} · ${count} avaliações no Google`;
    });
    const label = document.getElementById('review-update');
    if (label) label.textContent = `Nota e quantidade atualizadas em ${updated.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo', dateStyle: 'short', timeStyle: 'short' })}.`;
  } catch { /* The verified, dated HTML remains readable. */ }
})();
