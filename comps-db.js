// comps-db.js
export const DB = {
  db: null,
  open() {
    return new Promise((res, rej) => {
      const r = indexedDB.open('fishing-db', 1);
      r.onupgradeneeded = e => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains('comps')) db.createObjectStore('comps', { keyPath: 'id' });
        if (!db.objectStoreNames.contains('competitors')) db.createObjectStore('competitors', { keyPath: 'id' });
      };
      r.onsuccess = e => { this.db = e.target.result; res(this); };
      r.onerror = e => rej(e);
    });
  },
  add(store, item) {
    return new Promise((res, rej) => {
      const tx = this.db.transaction(store, 'readwrite');
      const os = tx.objectStore(store);
      const op = os.put(item); // put to create or update
      op.onsuccess = () => res(true);
      op.onerror = e => rej(e);
    });
  },
  get(store, key) {
    return new Promise((res, rej) => {
      const tx = this.db.transaction(store);
      const req = tx.objectStore(store).get(key);
      req.onsuccess = e => res(e.target.result);
      req.onerror = e => rej(e);
    });
  },
  getAll(store) {
    return new Promise((res, rej) => {
      const tx = this.db.transaction(store);
      const req = tx.objectStore(store).getAll();
      req.onsuccess = e => res(e.target.result);
      req.onerror = e => rej(e);
    });
  }
};
