import { collection, getDocs, where, query, limit, addDoc } from "firebase/firestore";
import { firebaseDB } from "@/services/firebase";
import { type ICartModel, type ICategoryModel, type IProductModel } from "@/types";

class Api {

    async getHomeData() {
        try {
            const special: IProductModel[] = []
            const qSpecial = await query(collection(firebaseDB, "products"), where('isSpecial', '==', true));
            const querySnapSpecial = await getDocs(qSpecial);
            querySnapSpecial.forEach((doc) => {
                special.push(doc.data() as IProductModel)
            })
            const products: IProductModel[] = []
            const q = await query(collection(firebaseDB, "products"), limit(6));
            const querySnap = await getDocs(q);
            querySnap.forEach((doc) => {
                products.push(doc.data() as IProductModel)
            })
            return {
                special: special,
                products: products,
            };
        } catch (e: unknown) {
            throw JSON.stringify(e);
        }

    }

    async getCartData(ids: string[]) {
        try {
            const products: IProductModel[] = []
            const q = await query(collection(firebaseDB, "products"), where('id', 'in', ids));
            const querySnap = await getDocs(q);
            querySnap.forEach((doc) => {
                products.push(doc.data() as IProductModel)
            })
            return products;
        } catch (e: unknown) {
            throw JSON.stringify(e);
        }

    }

    async getProductBySlugData(slug: string) {
        try {
            const products: IProductModel[] = [];
            const q = await query(collection(firebaseDB, "products"), where('slug', '==', slug), limit(10));
            const querySnap = await getDocs(q);

            querySnap.forEach((doc) => {
                products.push(doc.data() as IProductModel)
            })
            return products[0];
        } catch (e: unknown) {
            return Promise.reject(e);
        }

    }

    async getProductsByCategoryID(cat: string) {
        try {
            const products: IProductModel[] = [];
            const q = await query(collection(firebaseDB, "products"), where('categorys', 'array-contains', cat));
            const querySnap = await getDocs(q);

            querySnap.forEach((doc) => {
                products.push(doc.data() as IProductModel)
            })

            return products;
        } catch (e: unknown) {
            console.log("Error", e)
            return Promise.reject(e);
        }

    }

    async getProductsSearch(q: string) {
        try {
            const products: IProductModel[] = []
            const response = await query(collection(firebaseDB, "products"), where('search_name', 'array-contains', q));
            const queryProducts = await getDocs(response);
            queryProducts.forEach((doc) => {
                products.push(doc.data() as IProductModel)
            })
            return Promise.resolve(products);
        } catch (e: unknown) {
            return Promise.reject(e);
        }
    }

    async createOrder(data: { products: ICartModel[], name: string, phone: string, email: string, comments?: string, date?: string }): Promise<string> {
        try {
            const docRef = await addDoc(collection(firebaseDB, "orders"), {
                "key": 'key',
                "name": data.name,
                "email": data.phone,
                "date": data?.date || Date.now(),
                "comments": data?.comments || "",
                "address": "London",
                "products": data.products,
                "userID": 'not_register_user',
            });
            return Promise.resolve(docRef.id);
        } catch (e: unknown) {
            return Promise.reject(e);
        }
    }

    async getCategoryList() {
        try {
            const category: ICategoryModel[] = []
            const response = await query(collection(firebaseDB, "categorys"));
            const queryCategory = await getDocs(response);
            queryCategory.forEach((doc) => {
                category.push(doc.data() as ICategoryModel)
            })
            return Promise.resolve(category);
        } catch (e: unknown) {
            return Promise.reject(e);
        }
    }
}

export const api = new Api();