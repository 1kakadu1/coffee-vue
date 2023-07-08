export interface IProductModel {
    id: string;
    name: string;
    description: string;
    preview: string;
    code: string;
    price: { [key: string]: number };
    categorys: string[];
    size: string[];
    measurement_value: string;
    isPublic: boolean;
    gallary: string[];
    energy_and_nutritional_value: { [key: string]: unknown }[];
    composition: string[];
    rating: number;
    slug: string
}

export type ProductCardSize = "small" | "full";