import { type ClothingItem } from "../types/clothing";

const DB_NAME = "closetDB";

// Open/create closet database
const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains("clothes")) {
        db.createObjectStore("clothes", { keyPath: "id", autoIncrement: true });
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

// Add item to clothes store
export const addClothes = async (data: ClothingItem): Promise<void> => {
  const db = await openDB();
  const transaction: IDBTransaction = db.transaction("clothes", "readwrite");
  const store = transaction.objectStore("clothes");

  store.add(data);

  return new Promise<void>((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = (event) => reject(event);
  });
};

// Retrieve all items from database
export const getAllItems = async (storeName: string): Promise<ClothingItem[]> => 
{
    const db = await openDB();
    const transaction: IDBTransaction = db.transaction(storeName, 'readonly');
    const store = transaction.objectStore(storeName);

    const request = store.getAll();

    return new Promise<ClothingItem[]>((resolve, reject) => {
      request.onsuccess = () => {
        resolve(request.result as ClothingItem[]);
      };
  
      request.onerror = () => {
        reject(`Error retrieving items: ${request.error}`);
      };
    });
}