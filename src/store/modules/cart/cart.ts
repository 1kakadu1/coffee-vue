import { api } from "@/services/api";
import {type  IState } from "@/store/store";
import { type ICartModel, type IProductModel } from "@/types";
import { type Module } from "vuex";
import { CartActions,  CartMutation, type ICartState } from "./cart.model";

export const CART_PRODUCTS_LOCAL = "CART_PRODUCTS";

export const cartModule: Module<ICartState, IState> = {
    namespaced: true,
    state: () => ({
        isLoading: false,
        products: [],
        open: false,
        error: undefined,
    }),
    mutations: {
        ['CAT_ADD'](state: ICartState, payload: { product: IProductModel, size: string }) {
            const products = [...state.products];

            const indexProduct = products.findIndex((item) => item.id === payload.product.id && item.size === payload.size);
            if (indexProduct === -1) {
                products.push({
                    count: 1,
                    size: payload.size,
                    product: payload.product,
                    id: payload.product.id
                })
            } else {
                products[indexProduct].count = products[indexProduct].count + 1;
            }
            localStorage.setItem(CART_PRODUCTS_LOCAL, JSON.stringify(products));
            state.products = products;
        },
        ['CAT_SUB'](state: ICartState, payload: { product: IProductModel, size: string }) {
            const products = [...state.products];
            const indexProduct = products.findIndex((item) => item.id === payload.product.id && item.size === payload.size);

            if (indexProduct !== -1 && products[indexProduct] && products[indexProduct].count - 1 >= 0) {
                console.log(products[indexProduct].count);
                if (products[indexProduct].count - 1 > 0) {
                    products[indexProduct].count = products[indexProduct].count - 1;
                } else {
                    products.splice(indexProduct, 1);
                }
            }
            localStorage.setItem(CART_PRODUCTS_LOCAL, JSON.stringify(products));
            state.products = products;
        },
        ['CART_REMOVE_ITEM'](state: ICartState, payload: { id: string, size: string }) {
            const products = [...state.products];
            const indexProduct = products.findIndex((item) => item.id === payload.id && item.size === payload.size);
            if (indexProduct !== -1) {
                products.splice(indexProduct, 1);
            }
            localStorage.setItem(CART_PRODUCTS_LOCAL, JSON.stringify(products));
            state.products = products;
        },
        ['CART_CLEAR'](state: ICartState) {
            localStorage.removeItem(CART_PRODUCTS_LOCAL);
            state.products = [];
        },
        ['CART_TOGGLE'](state: ICartState, payload: boolean) {
            state.open = payload;
        },
        ['CART_SET_PRODUCTS'](state: ICartState, payload: ICartModel[]) {
            state.products = payload;
        },
        ['CART_CHANGE_LOADING'](state: ICartState, payload: boolean) {
            state.isLoading = payload;
        }


    },
    actions: {
        async ['CART_GET_PRODUCTS']({ commit }) {
            const localProduct = localStorage.getItem(CART_PRODUCTS_LOCAL);
            if (localProduct === null) {
                return void 0;
            }
            const products = this.state.cart.products.length > 0 ? [...this.state.cart.products] : JSON.parse(localProduct) as ICartModel[];
            commit(CartMutation.changeLoading, true);
            try {
                const result: IProductModel[] = await api.getCartData(products.map(item => item.id));
                for (let i = 0; i < products.length; i++) {
                    const product = result.find(item => item.id === products[i].id);
                    if (product) {
                        products[i].product = product;
                    }
                }
                commit(CartMutation.setProducts, products);
            } catch (e) {
                commit(CartMutation.setError, JSON.stringify(e));
            } finally {
                commit(CartMutation.changeLoading, false);
            }
        },
    },
    getters: {
        isLoading(state: ICartState) {
            return state.isLoading;
        },
        products(state: ICartState) {
            return state.products;
        },
        open(state: ICartState) {
            return state.open;
        },
        error(state: ICartState) {
            return state.error;
        },
    }
}