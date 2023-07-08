import { type IProductModel } from "./products.model";

export interface ICartModel {
    id: string;
    size: string;
    count: number;
    product: IProductModel;
}