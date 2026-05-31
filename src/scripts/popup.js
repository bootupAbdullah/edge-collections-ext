import '../modules/ui.js';

// Pin button — send message to background, open side panel, close popup
document.getElementById('btn-pin-list')?.addEventListener('click', async () => {
  await chrome.runtime.sendMessage({ type: 'PIN_PANEL' });
  const { id: windowId } = await chrome.windows.getCurrent();
  await chrome.sidePanel.open({ windowId });
  window.close();
});

document.getElementById('btn-close-list')?.addEventListener('click', () => {
  window.close();
});
