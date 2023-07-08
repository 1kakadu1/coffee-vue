import { type ICartModel, type IProductModel } from "@/types";

export const countProduct = (product: IProductModel, products: ICartModel[]): { 'all': number, [key: string]: number } => {
    const count: { [key: string]: number } = {};
    product.size.forEach((item) => {
        const cartProduct = products.find((value) => value.id === product.id && value.size === item);
        if (cartProduct) {
            count[cartProduct.size] = cartProduct.count;
        }
    });

    let allCount = 0;
    Object.keys(count).forEach((key) => {
        allCount += count[key]
    });

    return {
        'all': allCount,
        ...count
    };
}

export const countCart = (products: ICartModel[]) => products.reduce((accumulator, currentValue) => accumulator + currentValue.count, 0);

export const totalPrice = (products: ICartModel[]) => products.reduce((accumulator, currentValue) => accumulator + (currentValue.count * currentValue.product.price[currentValue.size]), 0);
