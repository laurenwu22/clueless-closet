export type Category = "top" | "bottom";

export type Season = "Winter" | "Spring" | "Summer" | "Fall";

export interface ClothingItem {
  id: string;
  name: string;
  category: Category;
  seasons: Season[];
  image: string;
}
