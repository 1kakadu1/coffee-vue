import { defineStore } from 'pinia'
import { api } from '@/services/api';
import { ref, type Ref } from 'vue';
import type { IProductModel } from '@/types';

export const useSearchStore = defineStore('search', ()=>{
    const isLoading = ref(false);
    const open = ref(false);
    const list:Ref<IProductModel[]> = ref([]);
    const error = ref<string | undefined>(undefined);

    const getSearchList = async (payload: string) => {
        isLoading.value = true;
        error.value = undefined;
        try {
            const result = await api.getProductsSearch(payload);
            list.value = result;
        } catch (e: unknown) {
            const _error = typeof e === 'string' ? e : JSON.stringify(e);
            error.value = _error;
        } finally {
            isLoading.value = false;
        }
    }

    const toggeleSearch = (value: boolean)=>{
        open.value = value;
    }

    return {
        isLoading,
        open,
        list,
        error,
        getSearchList,
        toggeleSearch
    }

})