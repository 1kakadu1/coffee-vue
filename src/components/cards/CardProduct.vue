<script setup  lang="ts">
import { type IProductModel, type ProductCardSize } from '@/types';
import { computed} from 'vue';
import { CURRENCY } from "@/const/global";
import { countProduct } from '@/utils/cart.utils';
import useCart from '@/hooks/useCart';
import CounterItem from "@/components/CounterItem.vue";

const props = defineProps<{ product: IProductModel, size: ProductCardSize }>()

const _CURRENCY = CURRENCY;

const { cartList, onCartAdd, onCartSub, currentProductsID, currentCount } = useCart({ currentItemId: props.product.id, currentItemSize: props.product.size[0] });
const count = computed(() => countProduct(props.product, cartList.value));
const rating_ceil = computed(() => Math.floor(props.product.rating));

const onAdd = (product: IProductModel) => {
    onCartAdd({
        product: product,
        size: product.size[0],
        count: 1,
        id: product.id
    });
}

const onSub = (product: IProductModel) => {
    onCartSub({
        product: product,
        size: product.size[0],
        count: 1,
        id: product.id
    });
}

</script>

<template>
    <div class="card-product">
        <span class="card-product__counter" :class="{ show: count['all'] > 0 }">{{ count['all'] }}</span>
        <div class="row card-product__header">
            <div class="col-12 col-sm-6">
                <img :src="product.preview" class="card-product__preview"
                    :class="{ 'card-product_full': size === 'full', 'card-product_small': size === 'small' }" alt="">
            </div>
            <div class="col-12 col-sm-6 card-product__right-column">
                <div class="card-product__rating">
                    <svg v-for="i in [1, 2, 3, 4, 5]" :key="i" class="card-product__rating-item" viewBox="0 0 34 31"
                        fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M17.0488 0L20.8764 11.6839H33.2631L23.2421 18.905L27.0698 30.5889L17.0488 23.3678L7.02775 30.5889L10.8554 18.905L0.834425 11.6839H13.2211L17.0488 0Z"
                            :fill="i <= rating_ceil ? '#F9B300' : '#F0F0F0'" />
                    </svg>
                </div>
                <div class="card-product__rating-count">
                    {{ product.rating }}
                    <span>(0 отзывов)</span>
                </div>

                <ul class="card-product__sizes">
                    <li v-for="sizeItem in product.size" :key="sizeItem" class="card-product__sizes-item"
                        :class="{ active: !!currentProductsID.find(item => item.size === sizeItem) }">
                        {{ sizeItem }}
                        ({{ product.measurement_value }})
                    </li>
                </ul>

                <div class="card-product__row">
                    <p class="card-product__price">
                        {{ _CURRENCY }}
                        {{ product.price[product.size[0]] }}
                    </p>

                    <div class="card-product__actions">
                        <counter-item :count="currentCount(product.id, product.size[0])" :on-sub="() => onSub(product)"
                            :on-add="() => onAdd(product)"></counter-item>
                    </div>
                </div>



            </div>
        </div>
        <router-link class="link" :to="'/products/' + product.slug">
            <h3 class="card-product__name">
                {{ product.name }}
            </h3>
            <p class="card-product__desc">
                {{ product.description }}
            </p>
        </router-link>

    </div>
</template>

<style lang="scss">
@import "@/styles/vars.scss";


.card-product {
    width: 100%;
    position: relative;
    overflow: hidden;
    background: #FFFFFF;
    border: 1px solid #E4E4E4;
    border-radius: 20px;
    padding: 30px 20px;

    &__row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        flex-direction: row;

        @media (min-width: 576px) {
            align-items: flex-start;
            flex-direction: column;
        }
    }

    &__actions {

        @media (min-width: 576px) {
            position: absolute;
            bottom: 0;
            left: calc(var(--bs-gutter-x) * 0.5);
        }

    }

    &__header {
        margin-bottom: 16px;
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
        height: 320px;
    }

    &_small {
        height: 220px;
    }

    &__price {
        font-weight: 900;
        font-size: 35px;
        line-height: 44px;
        color: #222222;
        margin-top: 12px;
    }

    &__name {
        padding-bottom: 8px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        max-width: 100%;
        font-weight: 900;
        font-size: 25px;
        line-height: 31px;
        color: #222222;
    }

    &__desc {
        margin-bottom: 8px;
        text-overflow: ellipsis;
        overflow: hidden;
        max-width: 100%;
        font-weight: 500;
        font-size: 18px;
        line-height: 21px;
        color: #222222;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }


    &__counter {
        position: absolute;
        right: 4px;
        top: 4px;
        width: 24px;
        height: 24px;
        border-radius: 46px;
        font-size: 13px;
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

    &__rating {
        display: flex;
        align-items: center;
        padding-bottom: 10px;

        &-item {
            width: 20px;
            height: 20px;
            margin-right: 4px;
        }

        &-count {
            font-weight: 700;
            font-size: 20px;
            line-height: 24px;
            margin-bottom: 10px;

            span {
                font-weight: 500;
                font-size: 12px;
                line-height: 16px;
                color: #5B5B5B;
            }
        }
    }

    &__sizes {
        display: flex;
        align-items: center;
        padding-bottom: 6px;

        &-item {
            margin-left: 4px;
            background-color: $black;
            padding: 4px;
            color: #fff;
            font-size: 10px;

            &.active {
                background-color: $link;
            }

            &:first-child {
                margin-left: 0px;
            }
        }
    }

    &__right-column {
        position: relative;
        margin-top: 20px;

        @media (min-width: 576px) {
            margin-top: 0px;
        }
    }

}
</style>