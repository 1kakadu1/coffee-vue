
import { api } from "@/services/api";
import { type IState } from "@/store/store";
import { type ActionTree, type GetterTree, type Module } from "vuex";
import { type ISearchState, SearchMutation, type ISearchGetters, SearchActions, type IActionsSearch } from "./search.model";

const getters: GetterTree<ISearchState, IState> & ISearchGetters = {
    isLoading(state: ISearchState) {
        return state.isLoading;
    },
    error(state: ISearchState) {
        return state.error;
    },
    open(state: ISearchState) {
        return state.open;
    },
    list(state: ISearchState) {
        return state.list;
    }
};

const actions: ActionTree<ISearchState, IState> & IActionsSearch = {
    async [SearchActions.fetch](context, payload: string) {
        context.commit(SearchMutation.toggleLoadingSearch, true);
        try {
            const result = await api.getProductsSearch(payload);
            context.commit(SearchMutation.setList, result);
        } catch (e: unknown) {
            const error = typeof e === 'string' ? e : JSON.stringify(e);
            context.commit(SearchMutation.setError, error);
        } finally {
            context.commit(SearchMutation.toggleLoadingSearch, false);
        }
    }
}

export const searchModule: Module<ISearchState, IState> = {
    namespaced: true,
    state: () => ({

        isLoading: false,
        list: [],
        open: false,
        error: undefined

    }),
    mutations: {
        [SearchMutation.toggleLoadingSearch](state: ISearchState, payload: boolean) {
            state.isLoading = payload
        },
        [SearchMutation.setList](state: ISearchState, payload: any) {
            state.list = [...payload];
        },
        [SearchMutation.setError](state: ISearchState, payload: undefined | string) {
            state.error = payload;
        },
        [SearchMutation.toggleSearchOpen](state: ISearchState, payload: boolean) {
            state.open = payload;
        }
    },
    actions: actions,
    getters: getters
}