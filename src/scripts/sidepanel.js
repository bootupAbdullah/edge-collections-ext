import '../modules/ui.js';

window.addEventListener('load', () => {
  chrome.storage.local.set({ sidePanelOpen: true });
});

window.addEventListener('beforeunload', () => {
  chrome.storage.local.set({ sidePanelOpen: false });
});
