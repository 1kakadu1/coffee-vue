import { type IState } from '@/store/store';
import { type IProductModel } from '@/types';

import {
    Store as VuexStore,
    type DispatchOptions,
    type CommitOptions,
    type ActionContext,
} from 'vuex';


export interface ISearchState {
    list: IProductModel[];
    isLoading: boolean;
    error?: string;
    open: boolean;
}

export enum SearchMutation {
    toggleLoadingSearch = "SEARCH_TOGGLE_LOADING",
    setList = "SEARCH_SET_LIST",
    setError = "SEARCH_SET_ERROR",
    toggleSearchOpen = "SEARCH_TOGGLE_OPEN"
}

export enum SearchActions {
    fetch = "GET_SEARCH_FECH",
}

export interface ISearchGetters {
    isLoading(state: ISearchState): boolean;
    list(state: ISearchState): any[];
    error(state: ISearchState): undefined | string;
    open(state: ISearchState): boolean;
}

export interface ISearchMutations<S = ISearchState> {
    [SearchMutation.toggleLoadingSearch](state: S, payload: boolean): void;
    [SearchMutation.setList](state: S, payload: any): void;
    [SearchMutation.setError](state: S, payload: undefined | string): void;
}

type AugmentedActionContext = {
    commit<K extends keyof ISearchMutations>(
        key: K,
        payload: Parameters<ISearchMutations[K]>[1],
    ): ReturnType<ISearchMutations[K]>;
} & Omit<ActionContext<ISearchState, IState>, 'commit'>


export interface IActionsSearch {
    [SearchActions.fetch](context: AugmentedActionContext, payload: string): void;
}

export type SearchStore<S = ISearchState> = Omit<VuexStore<S>, 'getters' | 'commit' | 'dispatch'> & {
    commit<K extends keyof ISearchMutations, P extends Parameters<ISearchMutations[K]>[1]>(
        key: K,
        payload: P,
        options?: CommitOptions
    ): ReturnType<ISearchMutations[K]>;
} & {
    dispatch<K extends keyof IActionsSearch>(
        key: K,
        payload?: Parameters<IActionsSearch[K]>[1],
        options?: DispatchOptions
    ): ReturnType<IActionsSearch[K]>;
} & {
    getters: {
        [K in keyof ISearchGetters]: ReturnType<ISearchGetters[K]>
    };
};


