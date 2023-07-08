<script setup  lang="ts">
import { type IProductModel, type ProductCardSize } from '@/types';
import { computed } from 'vue';
import { CURRENCY } from "@/const/global";
import { useCartStore } from "@/store/store"
import { CartMutation } from '@/store/modules/cart/cart.model';
import { countProduct } from '@/utils/cart.utils';
const props = defineProps<{ product: IProductModel, size: ProductCardSize }>()

const _CURRENCY = CURRENCY;
const storeCart = useCartStore();
const count = computed(() => countProduct(props.product, storeCart.state.products))
const onAdd = (product: IProductModel) => {
    storeCart.commit(CartMutation.add, { product, size: product.size[0] });
}

</script>

<template>
    <div class="card-product">
        <div class="card-product__wrap-preview">
            <span class="card-product__counter" :class="{ show: count['all'] > 0 }">{{ count['all'] }}</span>
            <img :src="product.preview" class="card-product__preview"
                :class="{ 'card-product_full': size === 'full', 'card-product_small': size === 'small' }" alt="">
            <div class="card-product__footer row">
                <router-link class="link" :to="'products/' + product.slug">
                    <div class="card-product__footer-info col-8 card-product_center-horizontal">
                        <h3 class="card-product__name">
                            {{ product.name }}
                        </h3>
                        <p class="card-product__price">
                            {{ _CURRENCY }}
                            {{ product.price[product.size[0]] }}
                        </p>
                    </div>
                </router-link>
                <div class="card-product-footer__actions col-4 card-product_end">
                    <button-base :onClick="() => { onAdd(product) }" color="light" className="card-product__add">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="card-product__add-icon">
                            <path d="M19,11H13V5a1,1,0,0,0-2,0v6H5a1,1,0,0,0,0,2h6v6a1,1,0,0,0,2,0V13h6a1,1,0,0,0,0-2Z">
                            </path>
                        </svg>
                    </button-base>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@import "@/styles/vars.scss";


.card-product {
    width: 100%;
    position: relative;
    overflow: hidden;

    &__add-icon {
        fill: #FFF;
        width: 26px;
        height: 26px;
        transition: transform 400ms ease-in;
        transform: rotate(0deg);
    }

    &_end {
        justify-content: flex-end;
        display: flex;
        align-items: center;
    }

    &_center-horizontal {
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        justify-content: center;
    }

    //TODO: переделать
    &__add {
        width: 64px;
        height: 64px;
        min-width: 64px !important;
        border-radius: 100%;
        font-size: 30px;
        align-items: center;
        justify-content: center;
        padding: 0px 0px 0px 0px !important;
        display: flex !important;

        &:hover {
            .card-product__add-icon {
                fill: #FFF;
                width: 22px;
                height: 22px;
                transition: transform 800ms ease-in;
                transform: rotate(180deg);
            }
        }
    }

    &__preview {
        max-height: 540px;
        width: 100%;
        height: auto;
        object-fit: cover;
        object-position: center;
        border-radius: 6px;
    }

    &_full {
        height: 540px;
    }

    &_small {
        height: 380px;
    }

    &__price {
        font-weight: 400;
        font-size: 20px;
        line-height: 28px;
        color: $write;
    }

    &__name {
        padding-bottom: 8px;
        font-weight: 400;
        font-size: 28px;
        line-height: 30px;
        color: $write;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        max-width: 100%;
    }

    &__wrap-preview {
        margin-bottom: 35px;
        position: relative;
        overflow: hidden;

        &:hover {
            @media screen and (min-width: 996px) {
                .card-product__wrap-composition {
                    opacity: 1;
                    transform: translateY(0px);
                    transition: opacity 300ms ease-in, transform 300ms ease-in;
                }
            }

        }
    }

    &__counter {
        position: absolute;
        right: 12px;
        top: 12px;
        width: 28px;
        height: 28px;
        border-radius: 46px;
        font-size: 14px;
        font-weight: bold;
        z-index: 2;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: $link;
        color: $write;
        transform: translateX(10px);
        opacity: 0;
        transition: opacity 300ms ease-in-out, transform 300ms ease-in-out;

        &.show {
            transform: translateX(0px);
            opacity: 1;
        }
    }

    &__footer {
        padding-top: 10px;
        margin: 0;
        position: absolute;
        bottom: 0px;
        right: 0px;
        background: inherit;
        width: 100%;
        height: 100px;
        color: $write;
        background: rgba(102, 3, 3, 0.1);
        backdrop-filter: blur(4px);
        border-bottom-right-radius: 6px;
        border-bottom-left-radius: 6px;
        transition: opacity 300ms ease-in, transform 300ms ease-in;
    }
}
</style>