// js/ui.js
// Controls screen transitions and shared UI behaviour.

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById('screen-' + id);
  if (target) target.classList.add('active');
}

// ── Pin toggle ──
const PIN_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 4.5l-4 4l-4 1.5l-1.5 1.5l7 7l1.5 -1.5l1.5 -4l4 -4" /><path d="M9 15l-4.5 4.5" /><path d="M14.5 4l5.5 5.5" /></svg>`;
const UNPIN_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 3l18 18" /><path d="M15 4.5l-3.249 3.249m-2.57 1.433l-2.181 .818l-1.5 1.5l7 7l1.5 -1.5l.82 -2.186m1.43 -2.563l3.25 -3.251" /><path d="M9 15l-4.5 4.5" /><path d="M14.5 4l5.5 5.5" /></svg>`;

async function unpin() {
  await chrome.runtime.sendMessage({ type: 'UNPIN_PANEL' });
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: false });
}

['btn-pin-list', 'btn-pin-detail'].forEach(id => {
  document.getElementById(id)?.addEventListener('click', async function() {
    const pinned = this.dataset.pinned === 'true';
    if (pinned) {
      await unpin();
      this.dataset.pinned = 'false';
      this.innerHTML = PIN_SVG;
    } else {
      await chrome.runtime.sendMessage({ type: 'PIN_PANEL' });
      this.dataset.pinned = 'true';
      this.innerHTML = UNPIN_SVG;
    }
  });
});

// ── Navigation ──
document.getElementById('btn-back')?.addEventListener('click', () => showScreen('list'));
document.getElementById('btn-close-list')?.addEventListener('click', () => window.close());
document.getElementById('btn-close-detail')?.addEventListener('click', () => window.close());

// ── New collection ──
document.getElementById('btn-new-collection')?.addEventListener('click', () => {
  showScreen('detail');
  const input = document.getElementById('detail-title');
  if (input) {
    input.value = 'New collection';
    setTimeout(() => { input.focus(); input.select(); }, 50);
  }
});

// ── Settings ──
document.getElementById('btn-settings')?.addEventListener('click', () => {
  // TODO: wire to settings.js
});
document.getElementById('btn-settings-detail')?.addEventListener('click', () => {
  // TODO: wire to settings.js
});

// ── Add current page ──
function onPageAdded() {
  document.getElementById('btn-more-detail').style.display = 'flex';
  // TODO: wire to items.js
}

document.getElementById('btn-add-page')?.addEventListener('click', onPageAdded);
document.getElementById('btn-add-page-empty')?.addEventListener('click', onPageAdded);
