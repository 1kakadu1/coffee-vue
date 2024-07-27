import { type IProductModel } from '@/types';

export interface IHomeState {
    products: IProductModel[];
    special: IProductModel[];
    isLoading: boolean;
    error?: string;
}

export enum HomeMutation {
    toggleLoadingProducts = "HOME_TOGGLE_LOADING_PRODUCTS",
    setProducts = "HOME_SET_PRODUCTS",
    setError = "HOME_SET_ERROR",
}

export enum HomeActions {
    fetch = "GET_HOME_FECH",
}

export interface IHomeGetters {
    isLoadingProducts(state: IHomeState): boolean;
    products(state: IHomeState): IProductModel[];
    errorProducts(state: IHomeState): undefined | string;
}

export interface IHomeMutations<S = IHomeState> {
    [HomeMutation.toggleLoadingProducts](state: S, payload: boolean): void;
    [HomeMutation.setProducts](state: S, payload: { products: IProductModel[], special: IProductModel[] }): void;
    [HomeMutation.setError](state: S, payload: undefined | string): void;
}


