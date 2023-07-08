import { type CommitOptions, createStore, type DispatchOptions, useStore as vuexUseStore, Store as StoreVuex } from 'vuex'
import { cartModule } from './modules/cart/cart';
import { CartActions, CartMutation, type CartStore, type IActionsCart, type ICartGetters, type ICartMutations, type ICartState } from './modules/cart/cart.model';
import { homeModule } from './modules/home/home';
import { HomeActions, HomeMutation, type HomeStore, type IActionsHome, type IHomeGetters, type IHomeMutations, type IHomeState } from './modules/home/home.model';
import { productsModule } from './modules/products/products';
import { searchModule } from './modules/search/search';
import { SearchActions, SearchMutation, type SearchStore, type IActionsSearch, type ISearchGetters, type ISearchMutations, type ISearchState } from "./modules/search/search.model";
import { type IProductsState, type ProductsStore } from './modules/products/products.model';

export interface IState {
    products: IProductsState,
    cart: ICartState,
    home: IHomeState
}

export enum StoreModuleKey {
    products = "products",
    cart = "cart",
    home = "home",
    searh = 'search',
}

export type Store = CartStore<Pick<IState, "cart">> & ProductsStore<Pick<IState, "products">> & HomeStore<Pick<IState, "home">>;

export const store = createStore<IState>({
    modules: {
        [StoreModuleKey.products]: productsModule,
        [StoreModuleKey.cart]: cartModule,
        [StoreModuleKey.home]: homeModule,
        [StoreModuleKey.searh]: searchModule
    }
})

function rootStoreToNamespacedStore<ActionTypes, Actions extends { [key: string]: any }, MutationsTypes, Mutations extends { [key: string]: any }, GetterTypes, Getters extends { [key: string]: any }, StateType>(namespace: string, store: StoreVuex<any>) {
    return {
        getters<K extends keyof Getters>(getterType: GetterTypes): ReturnType<Getters[K]> {
            return store.getters[`${namespace}/${getterType}`];
        },
        dispatch<K extends keyof Actions>(payloadWithType: ActionTypes, payload?: Parameters<Actions[K]>[1], options?: DispatchOptions): ReturnType<Actions[K]> {
            return store.dispatch(`${namespace}/${payloadWithType}`, payload, options) as ReturnType<Actions[K]>;
        },
        commit<K extends keyof Mutations>(payloadWithType: MutationsTypes, payload?: Parameters<Mutations[K]>[1], options?: CommitOptions): void {
            return store.commit(`${namespace}/${payloadWithType}`, payload, options)
        },
        state: store.state[namespace] as StateType
    };
}

export function useStore(): Store {
    return store as Store;
}

export function useHomeStore() {
    const store = vuexUseStore();
    return rootStoreToNamespacedStore<HomeActions, IActionsHome, HomeMutation, IHomeMutations, keyof IHomeGetters, IHomeGetters, IHomeState>(StoreModuleKey.home, store);
}

export function useCartStore() {
    const store = vuexUseStore();
    return rootStoreToNamespacedStore<CartActions, IActionsCart, CartMutation, ICartMutations, keyof ICartGetters, ICartGetters, ICartState>(StoreModuleKey.cart, store);
}

export function useSearchStore() {
    const store = vuexUseStore();
    return rootStoreToNamespacedStore<SearchActions, IActionsSearch, SearchMutation, ISearchMutations, keyof ISearchGetters, ISearchGetters, ISearchState>(StoreModuleKey.searh, store);
}




