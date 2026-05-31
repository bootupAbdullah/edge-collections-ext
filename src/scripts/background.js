// background.js
// Handles extension lifecycle, context menus, and side panel opening.

const POPUP_PATH = 'src/pages/popup.html';

async function getPinState() {
  const result = await chrome.storage.local.get('pinned');
  return result.pinned ?? false;
}

async function applyPinState(pinned) {
  if (pinned) {
    chrome.action.setPopup({ popup: '' });
    chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
  } else {
    chrome.action.setPopup({ popup: POPUP_PATH });
    chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: false });
  }
}

// Restore state on service worker startup (can be killed/restarted)
getPinState().then(applyPinState);

// On install — default to unpinned/popup mode
chrome.runtime.onInstalled.addListener(async () => {
  await chrome.storage.local.set({ pinned: false });
  applyPinState(false);

  chrome.contextMenus.create({
    id: "add-all-tabs",
    title: "Add all tabs to Collections",
    contexts: ["all"]
  });
});

// Listen for pin/unpin messages from popup or side panel
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'PIN_PANEL') {
    chrome.storage.local.set({ pinned: true });
    applyPinState(true);
    sendResponse({ success: true });
  }
  if (message.type === 'UNPIN_PANEL') {
    chrome.storage.local.set({ pinned: false });
    applyPinState(false);
    sendResponse({ success: true });
  }
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "add-all-tabs") {
    // TODO: implement in context-menu feature chat
  }
});
