import { type IState } from '@/store/store';
import { type IProductModel } from '@/types';
import {
    Store as VuexStore,
    type DispatchOptions,
    type CommitOptions,
    type ActionContext,
} from 'vuex';


export interface IHomeState {
    productsState: {
        products: IProductModel[];
        special: IProductModel[];
        isLoading: boolean;
        error?: string;
    }
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

type AugmentedActionContext = {
    commit<K extends keyof IHomeMutations>(
        key: K,
        payload: Parameters<IHomeMutations[K]>[1],
    ): ReturnType<IHomeMutations[K]>;
} & Omit<ActionContext<IHomeState, IState>, 'commit'>


export interface IActionsHome {
    [HomeActions.fetch](context: AugmentedActionContext): void;
}

export type HomeStore<S = IHomeState> = Omit<VuexStore<S>, 'getters' | 'commit' | 'dispatch'> & {
    commit<K extends keyof IHomeMutations, P extends Parameters<IHomeMutations[K]>[1]>(
        key: K,
        payload: P,
        options?: CommitOptions
    ): ReturnType<IHomeMutations[K]>;
} & {
    dispatch<K extends keyof IActionsHome>(
        key: K,
        payload?: Parameters<IActionsHome[K]>[1],
        options?: DispatchOptions
    ): ReturnType<IActionsHome[K]>;
} & {
    getters: {
        [K in keyof IHomeGetters]: ReturnType<IHomeGetters[K]>
    };
};


