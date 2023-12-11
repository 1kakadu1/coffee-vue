
import { collection, getDocs, where, query, limit, setDoc, doc, addDoc } from "firebase/firestore";
import { firebaseDB, firebaseMessaging } from "@/services/firebase";
import type { ICartModel, IProductModel } from "@/types";
import { getToken } from "firebase/messaging";


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

    async registrationTokenUser(user_id: string,token: string){
        await setDoc(doc(firebaseDB, "users_tokens", user_id), {token});
    }
    getTokenPush(user_id: string){
        return getToken(firebaseMessaging, { vapidKey: import.meta.env.VITE_APP_FIREBASE_PUBLIC_PUSH_KEY, }).then((currentToken) => {
            if (currentToken) {
              console.log("Token is:",currentToken);
              this.registrationTokenUser(user_id, currentToken);
            } else {
              console.log('No registration token available. Request permission to generate one.');
            }
          }).catch((err) => {
            console.log('An error occurred while retrieving token. ', err);
          });
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
}

export const api = new Api();