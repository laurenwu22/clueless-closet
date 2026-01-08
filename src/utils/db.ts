import { type ClothingItem } from "../types/clothing";
import type { Outfit } from "../types/outfit";

const DB_NAME = "closetDB";

// Open/create closet database
const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 2);

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains("clothes")) {
        db.createObjectStore("clothes", { keyPath: "id", autoIncrement: true });
      }
      if (!db.objectStoreNames.contains("graph")) {
        db.createObjectStore("graph", { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains("outfits")) {
        db.createObjectStore("outfits", { keyPath: "id", autoIncrement: true });
      }
    };

    request.onsuccess = (event: Event) => {
      resolve((event.target as IDBOpenDBRequest).result);
    };

    request.onerror = (event: Event) => {
      reject("Error opening database");
    };
  });
};

// Add data to specified store
export const addData = async (
  data: ClothingItem | Outfit | Node,
  storeName: string,
): Promise<void> => {
  const db = await openDB();
  const transaction: IDBTransaction = db.transaction(storeName, "readwrite");
  const store = transaction.objectStore(storeName);

  store.add(data);

  return new Promise<void>((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = (event) => reject(event);
  });
};

// Retrieve all items from database
export const getAllItems = async <T>(storeName: string): Promise<T[]> => {
  const db = await openDB();
  const transaction: IDBTransaction = db.transaction(storeName, "readonly");
  const store = transaction.objectStore(storeName);

  const request = store.getAll();

  return new Promise<T[]>((resolve, reject) => {
    request.onsuccess = () => {
      resolve(request.result as T[]);
    };

    request.onerror = () => {
      reject(`Error retrieving items: ${request.error}`);
    };
  });
};

// Retrieve item with matching id
export const getItem = async <T>(
  storeName: string,
  id: IDBValidKey,
): Promise<T> => {
  const db = await openDB();
  const transaction: IDBTransaction = db.transaction(storeName, "readonly");
  const store = transaction.objectStore(storeName);

  const request = store.get(id);

  return new Promise<T>((resolve, reject) => {
    request.onsuccess = () => {
      resolve(request.result as T);
    };

    request.onerror = () => {
      reject(`Error retrieving items: ${request.error}`);
    };
  });
};
