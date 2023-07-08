import { type IState } from "@/store/store";
import { type GetterTree, type Module } from "vuex";
import { type IProductsGetters, type IProductsState, ProductsMutation } from "./products.model";

const getters: GetterTree<IProductsState, IState> & IProductsGetters = {
    isLoading(state: IProductsState) {
        return state.isLoading;
    },
    products(state: IProductsState) {
        return state.products;
    }
};

export const productsModule: Module<IProductsState, IState> = {
    state: () => ({
        isLoading: false,
        products: []
    }),
    mutations: {
        [ProductsMutation.toggleLoading](state: IProductsState, payload: boolean) {
            state.isLoading = payload
        }
    },
    actions: {},
    getters: getters
}