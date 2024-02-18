import { defineStore } from 'pinia'
import { api } from '@/services/api';
import { ref, type Ref } from 'vue';
import type { IProductModel } from '@/types';

export const useProductsStore = defineStore('products', ()=>{
    const isLoading = ref(false);
    const products:Ref<IProductModel[]> = ref([]);

    const getProductsList = async () => {
    }

    return {
        isLoading,
        products,
        getProductsList
    }

})