/**
 * Padles MediaDB — High-Capacity IndexedDB Binary Storage Engine
 * 
 * Provides local binary blob persistence for photos, video recordings,
 * audio memos, and canvas sketches without consuming localStorage quota.
 * Resolves active session Object URLs and handles offline draft staging.
 */

class PadlesMediaDB {
  constructor() {
    this.dbName = 'PadlesMediaDB_v1';
    this.storeName = 'attachments';
    this.db = null;
    this.sessionUrls = new Map(); // storageId -> active blobUrl
    this.initPromise = this.init();
  }

  async init() {
    if (typeof window === 'undefined' || !window.indexedDB) {
      console.warn('[PadlesMediaDB] IndexedDB not available on this platform');
      return null;
    }

    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open(this.dbName, 1);

      request.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          const store = db.createObjectStore(this.storeName, { keyPath: 'id' });
          store.createIndex('createdAt', 'createdAt', { unique: false });
          store.createIndex('type', 'type', { unique: false });
        }
      };

      request.onsuccess = (e) => {
        this.db = e.target.result;
        console.log('[PadlesMediaDB] IndexedDB storage initialized');
        resolve(this.db);
      };

      request.onerror = (e) => {
        console.error('[PadlesMediaDB] Failed to open IndexedDB:', e.target.error);
        reject(e.target.error);
      };
    });
  }

  async storeBlob(blob, type = 'image', filename = '') {
    await this.initPromise;
    if (!this.db) throw new Error('IndexedDB not initialized');

    const id = 'att_' + Date.now() + '_' + Math.random().toString(36).substring(2, 8);
    const record = {
      id,
      type,
      filename: filename || `${type}_${Date.now()}`,
      mimeType: blob.type || 'application/octet-stream',
      size: blob.size,
      blob,
      uploadedToR2: false,
      createdAt: Date.now()
    };

    return new Promise((resolve, reject) => {
      const tx = this.db.transaction([this.storeName], 'readwrite');
      const store = tx.objectStore(this.storeName);
      const req = store.put(record);

      req.onsuccess = () => {
        const blobUrl = URL.createObjectURL(blob);
        this.sessionUrls.set(id, blobUrl);
        resolve({
          storageId: id,
          url: blobUrl,
          thumbnailUrl: type === 'image' || type === 'drawing' ? blobUrl : '',
          size: record.size,
          mimeType: record.mimeType
        });
      };

      req.onerror = (e) => reject(e.target.error);
    });
  }

  async getBlob(id) {
    await this.initPromise;
    if (!this.db) return null;

    return new Promise((resolve, reject) => {
      const tx = this.db.transaction([this.storeName], 'readonly');
      const store = tx.objectStore(this.storeName);
      const req = store.get(id);

      req.onsuccess = () => resolve(req.result ? req.result.blob : null);
      req.onerror = (e) => reject(e.target.error);
    });
  }

  async resolveUrl(id) {
    if (this.sessionUrls.has(id)) {
      return this.sessionUrls.get(id);
    }
    const blob = await this.getBlob(id);
    if (blob) {
      const url = URL.createObjectURL(blob);
      this.sessionUrls.set(id, url);
      return url;
    }
    return null;
  }

  async deleteBlob(id) {
    await this.initPromise;
    if (!this.db) return;

    if (this.sessionUrls.has(id)) {
      URL.revokeObjectURL(this.sessionUrls.get(id));
      this.sessionUrls.delete(id);
    }

    return new Promise((resolve, reject) => {
      const tx = this.db.transaction([this.storeName], 'readwrite');
      const store = tx.objectStore(this.storeName);
      const req = store.delete(id);
      req.onsuccess = () => resolve();
      req.onerror = (e) => reject(e.target.error);
    });
  }

  async listUnsynced() {
    await this.initPromise;
    if (!this.db) return [];

    return new Promise((resolve, reject) => {
      const tx = this.db.transaction([this.storeName], 'readonly');
      const store = tx.objectStore(this.storeName);
      const req = store.getAll();

      req.onsuccess = () => {
        const unsynced = (req.result || []).filter(r => !r.uploadedToR2);
        resolve(unsynced);
      };
      req.onerror = (e) => reject(e.target.error);
    });
  }

  async markAsSynced(id, r2Url) {
    await this.initPromise;
    if (!this.db) return;

    return new Promise((resolve, reject) => {
      const tx = this.db.transaction([this.storeName], 'readwrite');
      const store = tx.objectStore(this.storeName);
      const req = store.get(id);

      req.onsuccess = () => {
        if (req.result) {
          const updated = req.result;
          updated.uploadedToR2 = true;
          updated.r2Url = r2Url;
          store.put(updated);
          resolve();
        } else {
          resolve();
        }
      };
      req.onerror = (e) => reject(e.target.error);
    });
  }
}

// Global instance
window.padlesMediaDB = new PadlesMediaDB();
