// background.js
// Handles extension lifecycle, context menus, and side panel opening.

// Default to popup mode on install
chrome.runtime.onInstalled.addListener(() => {
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: false });

  chrome.contextMenus.create({
    id: "add-all-tabs",
    title: "Add all tabs to Collections",
    contexts: ["all"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "add-all-tabs") {
    // TODO: implement in context-menu feature chat
  }
});

// Listen for pin/unpin messages from popup or side panel
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'PIN_PANEL') {
    chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
    sendResponse({ success: true });
  }
  if (message.type === 'UNPIN_PANEL') {
    chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: false });
    sendResponse({ success: true });
  }
});
