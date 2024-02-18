import { defineStore } from 'pinia'
import type { IHomeState } from './home.model'
import { api } from '@/services/api';

export const useHomeStore = defineStore('home', {
    state: ():IHomeState => ({
        isLoading: false,
        products: [],
        special: [],
    }),
    getters: {
        isLoadingProducts(state: IHomeState) {
            return state.isLoading;
        },
        getterProducts(state: IHomeState) {
            return state.products;
        },
        getterSpecial(state: IHomeState) {
            return state.special;
        },
        getterErrorProducts(state: IHomeState) {
            return state.error;
        }
    },
    actions: {
        async getHomeData() {
            this.isLoading = true
            console.log("1")
            try {
                const result = await api.getHomeData();
                this.products = result.products;
                this.special = result.special;
                console.log("2")
            } catch (e: unknown) {
                const error = typeof e === 'string' ? e : JSON.stringify(e);
                console.log("3")
                this.error = error;
            } finally {
                this.isLoading = false
            }
        },

    },
})