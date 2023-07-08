import { type IState } from '@/store/store';
import { type ICartModel, type IProductModel } from '@/types';
import {
    Store as VuexStore,
    type DispatchOptions,
    type CommitOptions,
    type ActionContext,
} from 'vuex';


export interface ICartState {
    products: ICartModel[];
    isLoading: boolean;
    error?: string;
    open: boolean;
}

export enum CartMutation {
    add = "CAT_ADD",
    sub = "CART_SUB",
    remove_item = "CART_REMOVE_ITEM",
    clear = "CART_CLEAR",
    toggle = "CART_TOGGLE",
    changeLoading = "CART_CHANGE_LOADING",
    setError = "CART_SET_ERROR",
    setProducts = "CART_SET_PRODUCTS"
}

export enum CartActions {
    get = "CART_GET_PRODUCTS",
}

export interface ICartGetters {
    isLoading(state: ICartState): boolean;
    products(state: ICartState): ICartModel[];
    open(state: ICartState): boolean;
    error(state: ICartState): string | undefined;
}

export interface ICartMutations<S = ICartState> {
    [CartMutation.add](state: S, payload: { product: IProductModel, size: string }): void;
    [CartMutation.sub](state: S, payload: { product: IProductModel, size: string }): void;
    [CartMutation.remove_item](state: S, payload: { id: string, size: string }): void;
    [CartMutation.toggle](state: S, payload: boolean): void;
    [CartMutation.clear](state: S): void;
    [CartMutation.changeLoading](state: S, payload: boolean): void;
    [CartMutation.setError](state: S, payload: string | undefined): void;
    [CartMutation.setProducts](state: S, payload: IProductModel[]): void;
}

type AugmentedActionContext = {
    commit<K extends keyof ICartMutations>(
        key: K,
        payload: Parameters<ICartMutations[K]>[1],
    ): ReturnType<ICartMutations[K]>;
} & Omit<ActionContext<ICartState, IState>, 'commit'>


export interface IActionsCart {
    [CartActions.get](
        { commit }: AugmentedActionContext,
        ids: string[],
    ): Promise<void>;
}

export type CartStore<S = ICartState> = Omit<VuexStore<S>, 'getters' | 'commit' | 'dispatch'> & {
    commit<K extends keyof ICartMutations, P extends Parameters<ICartMutations[K]>[1]>(
        key: K,
        payload: P,
        options?: CommitOptions
    ): ReturnType<ICartMutations[K]>;
} & {
    dispatch<K extends keyof IActionsCart>(
        key: K,
        payload?: Parameters<IActionsCart[K]>[1],
        options?: DispatchOptions
    ): ReturnType<IActionsCart[K]>;
} & {
    getters: {
        [K in keyof ICartGetters]: ReturnType<ICartGetters[K]>
    };
};


