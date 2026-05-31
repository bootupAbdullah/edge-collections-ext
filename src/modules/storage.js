// js/storage.js
// All reads and writes to chrome.storage.sync go through here.
// Other modules call these functions — they never touch storage directly.

// TODO: implement in storage feature chat

const Storage = {
  getCollections: async () => {},
  saveCollection: async (collection) => {},
  deleteCollection: async (id) => {},
  getItems: async (collectionId) => {},
  saveItem: async (collectionId, item) => {},
  deleteItem: async (collectionId, itemId) => {}
};
