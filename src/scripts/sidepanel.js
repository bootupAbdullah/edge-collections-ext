import '../modules/ui.js';

// Disable toolbar icon when side panel is open
window.addEventListener('load', () => {
  console.log('[SIDEPANEL] loaded');
  chrome.storage.local.set({ sidePanelOpen: true });
  chrome.action.disable();
});

// Re-enable toolbar icon when side panel is closed
window.addEventListener('beforeunload', () => {
  console.log('[SIDEPANEL] unloading');
  chrome.storage.local.set({ sidePanelOpen: false });
  chrome.action.enable();
});
