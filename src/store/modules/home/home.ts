
import { api } from "@/services/api";
import { type IState } from "@/store/store";
import { type ActionTree, type GetterTree, type Module } from "vuex";
import { type IHomeState, HomeMutation, type IHomeGetters, HomeActions, type IActionsHome } from "./home.model";
import { type IProductModel } from "@/types";

const getters: GetterTree<IHomeState, IState> & IHomeGetters = {
    isLoadingProducts(state: IHomeState) {
        return state.productsState.isLoading;
    },
    products(state: IHomeState) {
        return state.productsState.products;
    },
    special(state: IHomeState) {
        return state.productsState.special;
    },
    errorProducts(state: IHomeState) {
        return state.productsState.error;
    }
};

const actions: ActionTree<IHomeState, IState> & IActionsHome = {
    async [HomeActions.fetch](context) {
        context.commit(HomeMutation.toggleLoadingProducts, true);
        try {
            const result = await api.getHomeData();
            context.commit(HomeMutation.setProducts, { products: result.products, special: result.special });
        } catch (e: unknown) {
            const error = typeof e === 'string' ? e : JSON.stringify(e);
            context.commit(HomeMutation.setError, error);
        } finally {
            context.commit(HomeMutation.toggleLoadingProducts, false);
        }
    }
}

export const homeModule: Module<IHomeState, IState> = {
    namespaced: true,
    state: () => ({
        productsState: {
            isLoading: false,
            products: [],
            special: [],
        }
    }),
    mutations: {
        [HomeMutation.toggleLoadingProducts](state: IHomeState, payload: boolean) {
            state.productsState.isLoading = payload
        },
        [HomeMutation.setProducts](state: IHomeState, payload: { products: IProductModel[], special: IProductModel[] }) {
            state.productsState.products = [...payload.products];
            state.productsState.special = [...payload.special];
        },
        [HomeMutation.setError](state: IHomeState, payload: undefined | string) {
            state.productsState.error = payload;
        }
    },
    actions: actions,
    getters: getters
}