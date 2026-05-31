// background.js
// Handles extension lifecycle, context menus, and side panel opening.

chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });

// ── Context menu setup ──
// Feature: save image, add all tabs to collection
// TODO: implement in context-menu feature chat
chrome.runtime.onInstalled.addListener(() => {
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
