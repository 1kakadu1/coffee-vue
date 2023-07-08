<script setup  lang="ts">
import { type ICartModel } from '@/types';
import { CURRENCY } from "@/const/global";
import useCart from "@/hooks/useCart";
import CounterItem from "@/components/CounterItem.vue";
const props = defineProps<{ data: ICartModel }>()
const { currentCount, onCartAdd, onCartSub } = useCart({ currentItemId: props.data.id, currentItemSize: props.data.size });

</script>
<template>
    <div class="card-cart">
        <div class="card-cart__preview">
            <img :src="data.product.preview" :alt="data.product.name">
        </div>
        <div class="card-cart__body">
            <p class="card-cart__name">{{ data.product.name }}</p>
            <p class="card-cart__desc">{{ data.product.description }}</p>
            <ul class="card-cart__sizes">
                <li v-for="size in data.product.size" :key="size" class="card-cart__sizes-item"
                    :class="{ active: size === data.size }">
                    {{ size }}
                    ({{ data.product.measurement_value }})
                </li>
            </ul>
            <div class="card-cart__price">
                {{ data.product.price[data.size] * data.count }}
                {{ CURRENCY }}
            </div>
        </div>
        <div class="card-cart__actions">
            <counter-item :count="currentCount(data.id, data.size)" :on-add="() => onCartAdd(data)"
                :on-sub="() => onCartSub(data)"></counter-item>
        </div>
    </div>
</template>
<style lang="scss">
@import "@/styles/vars.scss";

.card-cart {
    display: flex;
    align-items: flex-start;

    &__name {
        font-size: 22px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        font-weight: 600;
        padding-bottom: 10px;
    }

    &__desc {
        display: none;

        @media (min-width: 540px) {
            display: block;
            font-size: 18px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            padding-bottom: 6px;
        }
    }

    &__preview {
        display: none;

        @media (min-width: 540px) {
            width: 100px;
            height: 100px;
            min-width: 100px;
            position: relative;
            display: block;
        }

        img {
            object-fit: cover;
            object-position: center;
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
        }
    }

    &__body {
        width: calc(80%);


        @media (min-width: 540px) {
            width: calc(80% - 100px);
            padding-left: 16px;
            padding-right: 16px;
        }

        @media (min-width: 768px) {
            padding-right: 26px;
        }
    }

    &__actions {
        width: 20%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        height: 100%;
        align-self: center;

        @media (min-width: 768px) {
            min-height: 100px;
            justify-content: center;
        }
    }

    &__sizes {
        display: flex;
        align-items: center;
        padding-bottom: 6px;

        &-item {
            margin-left: 8px;
            background-color: $black;
            padding: 6px;
            color: #fff;
            font-size: 12px;

            &.active {
                background-color: $link;
            }

            &:first-child {
                margin-left: 0px;
            }
        }
    }

    &__price {
        font-size: 18px;
        font-weight: 500;
    }
}
</style>