export interface Outfit {
  id?: number; // optional to be auto incremented by indexeddb
  itemIDs: number[]; // array to store ids of each piece in outfit
}
