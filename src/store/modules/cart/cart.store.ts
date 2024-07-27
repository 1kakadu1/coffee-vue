import { defineStore } from 'pinia'
import { api } from '@/services/api';
import { computed, ref, type Ref } from 'vue';
import type { ICartModel, IProductModel } from '@/types';

export const CART_PRODUCTS_LOCAL = "CART_PRODUCTS";

export const useCartStore = defineStore('cart', ()=>{
    const isLoading = ref(false);
    const products:Ref<ICartModel[]> = ref([]);
    const open = ref(false);
    const error = ref<string | undefined>(undefined);
    const cIsloading = computed(()=> isLoading.value);
    const cError = computed(()=> error.value);
    const cProducts = computed(()=> products.value);
    const cOpen = computed(()=> open.value);

    const addCart = (payload: { product: IProductModel, size: string }) => {
        const _products = [...products.value];

        const indexProduct = _products.findIndex((item) => item.id === payload.product.id && item.size === payload.size);
        if (indexProduct === -1) {
            _products.push({
                count: 1,
                size: payload.size,
                product: payload.product,
                id: payload.product.id
            })
        } else {
            _products[indexProduct].count = _products[indexProduct].count + 1;
        }
        localStorage.setItem(CART_PRODUCTS_LOCAL, JSON.stringify(products.value));
        products.value = _products;
    }
    const subCart = (payload: { product: IProductModel, size: string }) =>{
        const _products = [...products.value];
        const indexProduct = _products.findIndex((item) => item.id === payload.product.id && item.size === payload.size);

        if (indexProduct !== -1 && _products[indexProduct] && _products[indexProduct].count - 1 >= 0) {
            console.log(_products[indexProduct].count);
            if (_products[indexProduct].count - 1 > 0) {
                _products[indexProduct].count = _products[indexProduct].count - 1;
            } else {
                _products.splice(indexProduct, 1);
            }
        }
        localStorage.setItem(CART_PRODUCTS_LOCAL, JSON.stringify(products.value));
        products.value = _products;
    }
    const removeItemCart = (payload: { id: string, size: string }) => {
        const _products = [...products.value];
        const indexProduct = _products.findIndex((item) => item.id === payload.id && item.size === payload.size);
        if (indexProduct !== -1) {
            _products.splice(indexProduct, 1);
        }
        localStorage.setItem(CART_PRODUCTS_LOCAL, JSON.stringify(products.value));
        products.value = _products;
    }
    const clearCart = () => {
        localStorage.removeItem(CART_PRODUCTS_LOCAL);
        products.value = [];
    }
    const toggleCart = (payload: boolean) => {
        open.value = payload;
    }

    const changeLoading = (payload: boolean) => {
        isLoading.value = payload;
    }

    const getCartProducts = async () => {
        const localProduct = localStorage.getItem(CART_PRODUCTS_LOCAL);
        if (localProduct === null) {
            return void 0;
        }
        const _products = products.value.length > 0 ? [...products.value] : JSON.parse(localProduct) as ICartModel[];
        isLoading.value = true;
        try {
            const result: IProductModel[] = await api.getCartData(_products.map(item => item.id));
            for (let i = 0; i < _products.length; i++) {
                const product = result.find(item => item.id === _products[i].id);
                if (product) {
                    _products[i].product = product;
                }
            }
            products.value = _products;
        } catch (e) {
            error.value =  JSON.stringify(e);
        } finally {
            isLoading.value = false;
        }
    }

    return {
        isLoading: cIsloading,
        products: cProducts,
        open: cOpen,
        error: cError,
        changeLoading,
        toggleCart,
        clearCart,
        addCart,
        subCart,
        removeItemCart,
        getCartProducts
    }

})