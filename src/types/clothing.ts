export type Category = "top" | "bottom";

export type Season = "Winter" | "Spring" | "Summer" | "Fall";

export interface ClothingItem {
  id?: string; // optional to be auto incremented by indexeddb
  name: string;
  category: Category;
  seasons: Season[];
  image: string | File;
}
