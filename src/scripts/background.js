// background.js
// Handles extension lifecycle, context menus, and side panel opening.

const POPUP_PATH = 'src/pages/popup.html';
let isHandlingClick = false;

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
  await chrome.storage.local.set({ pinned: false, sidePanelOpen: false });
  applyPinState(false);

  chrome.contextMenus.create({
    id: "add-all-tabs",
    title: "Add all tabs to Collections",
    contexts: ["all"]
  });
});

chrome.runtime.onStartup.addListener(async () => {
  await chrome.storage.local.set({ sidePanelOpen: false, pinned: false });
});

// Listen for pin/unpin messages from popup or side panel
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  (async () => {
    if (message.type === 'PIN_PANEL') {
      chrome.storage.local.set({ pinned: true });
      applyPinState(true);
      sendResponse({ success: true });
    }
    if (message.type === 'UNPIN_PANEL') {
      await chrome.storage.local.set({ pinned: false, sidePanelOpen: false });
      const verify = await chrome.storage.local.get('pinned');
      console.log('[UNPIN] pinned in storage:', verify.pinned);
      console.log('[UNPIN] sidePanelOpen set to: false');
      await chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: false });
      console.log('[UNPIN] openPanelOnActionClick set to: false');
      sendResponse({ success: true });
    }
  })();
  return true; // keep channel open for async sendResponse
});

chrome.action.onClicked.addListener(async (tab) => {
  if (isHandlingClick) return;
  isHandlingClick = true;
  try {
    const pinned = await getPinState();
    console.log('[ACTION CLICKED] pinned state:', pinned);
    if (pinned) {
      await chrome.sidePanel.open({ windowId: tab.windowId });
    } else {
      await chrome.action.setPopup({ popup: 'src/pages/popup.html' });
      await chrome.action.openPopup();
    }
  } finally {
    isHandlingClick = false;
  }
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "add-all-tabs") {
    // TODO: implement in context-menu feature chat
  }
});
