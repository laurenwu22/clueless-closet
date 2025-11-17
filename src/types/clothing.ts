export type Category =
    | "top"
    | "bottom"

export type Season =
    | "winter"
    | "spring"
    | "summer"
    | "fall"

export interface ClothingItem {
    id: string;
    name: string;
    category: Category;
    seasons: Season[];
    image?: string;
}