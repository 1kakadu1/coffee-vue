import { type IState } from '@/store/store';
import { type IProductModel } from '@/types';
import {
    Store as VuexStore,
    type DispatchOptions,
    type CommitOptions,
    type ActionTree,
} from 'vuex';


export interface IProductsState {
    products: IProductModel[];
    isLoading: boolean;
    error?: string;
}

export enum ProductsMutation {
    set = "PRODUCTS_SET",
    toggleLoading = "PRODUCTS_TOGGLE_LOADING"
}

export enum ProductsActions {
    fech = "PRODUCTS_FECH",
}

export interface IProductsGetters {
    isLoading(state: IProductsState): boolean;
    products(state: IProductsState): IProductModel[];
}

export interface IProductsMutations<S = IProductsState> {
    [ProductsMutation.toggleLoading](state: S, payload: boolean): void;
}


export interface IActionsProducts {
    [ProductsActions.fech](): void;
}

export const actions: ActionTree<IProductsState, IState> & IActionsProducts = {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    [ProductsActions.fech]() { },
};

export type ProductsStore<S = IProductsState> = Omit<VuexStore<S>, 'getters' | 'commit' | 'dispatch'> & {
    commit<K extends keyof IProductsMutations, P extends Parameters<IProductsMutations[K]>[1]>(
        key: K,
        payload?: P,
        options?: CommitOptions
    ): ReturnType<IProductsMutations[K]>;
} & {
    dispatch<K extends keyof IActionsProducts>(
        key: K,
        payload: Parameters<IActionsProducts[K]>[1],
        options?: DispatchOptions
    ): ReturnType<IActionsProducts[K]>;
} & {
    getters: {
        [K in keyof IProductsGetters]: ReturnType<IProductsGetters[K]>
    };
};


