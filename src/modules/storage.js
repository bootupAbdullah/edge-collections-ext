// storage.js
// All reads and writes to chrome.storage go through here.
// Other modules call these functions — they never touch storage directly.

const Storage = {
  // ── Collections ──
  getCollections: async () => {
    const result = await chrome.storage.local.get('collections');
    return result.collections ?? [];
  },
  saveCollection: async (collection) => {
    const collections = await Storage.getCollections();
    const existing = collections.findIndex(c => c.id === collection.id);
    if (existing >= 0) collections[existing] = collection;
    else collections.push(collection);
    await chrome.storage.local.set({ collections });
  },
  deleteCollection: async (id) => {
    const collections = await Storage.getCollections();
    await chrome.storage.local.set({ collections: collections.filter(c => c.id !== id) });
  },

  // ── Items ──
  getItems: async (collectionId) => {
    const result = await chrome.storage.local.get(`items_${collectionId}`);
    return result[`items_${collectionId}`] ?? [];
  },
  saveItem: async (collectionId, item) => {
    const items = await Storage.getItems(collectionId);
    const existing = items.findIndex(i => i.id === item.id);
    if (existing >= 0) items[existing] = item;
    else items.push(item);
    await chrome.storage.local.set({ [`items_${collectionId}`]: items });
  },
  deleteItem: async (collectionId, itemId) => {
    const items = await Storage.getItems(collectionId);
    await chrome.storage.local.set({ [`items_${collectionId}`]: items.filter(i => i.id !== itemId) });
  },

  // ── Pin state ──
  getPinState: async () => {
    const result = await chrome.storage.local.get('pinned');
    return result.pinned ?? false;
  },
  setPinState: async (pinned) => {
    await chrome.storage.local.set({ pinned });
  }
};

export default Storage;
