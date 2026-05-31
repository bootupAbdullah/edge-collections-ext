// js/ui.js
// Controls screen transitions and shared UI behaviour.

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById('screen-' + id);
  if (target) target.classList.add('active');
}

// ── Navigation ──
document.getElementById('btn-back')?.addEventListener('click', () => showScreen('list'));
document.getElementById('btn-close-list')?.addEventListener('click', () => window.close());
document.getElementById('btn-close-detail')?.addEventListener('click', () => window.close());

// ── New collection ──
document.getElementById('btn-new-collection')?.addEventListener('click', () => {
  // TODO: wire to collections.js
  showScreen('detail');
});

// ── Settings ──
document.getElementById('btn-settings')?.addEventListener('click', () => {
  // TODO: wire to settings.js
});
document.getElementById('btn-settings-detail')?.addEventListener('click', () => {
  // TODO: wire to settings.js
});

// ── Add current page ──
document.getElementById('btn-add-page')?.addEventListener('click', () => {
  // TODO: wire to items.js
});
