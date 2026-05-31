import '../modules/ui.js';

// Pin button — switches from popup to side panel mode
document.getElementById('btn-pin-list')?.addEventListener('click', async () => {
  await chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
  await chrome.sidePanel.open({ windowId: (await chrome.windows.getCurrent()).id });
  window.close();
});

document.getElementById('btn-close-list')?.addEventListener('click', () => {
  window.close();
});
