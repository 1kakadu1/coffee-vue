<template>
    <div class="cart-button" @click="toggleCart" :class="{ active: openCart }">

        <svg class="cart-button__icon" width="16" height="20" viewBox="0 0 16 20" fill="none"
            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <path d="M0 0H16V20H0V0Z" fill="url(#pattern0)" />
            <defs>
                <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlink:href="#image0_10_34" transform="scale(0.03125 0.025)" />
                </pattern>
                <image id="image0_10_34" width="32" height="40"
                    xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAoCAYAAACfKfiZAAAAAXNSR0IArs4c6QAAAWBJREFUWAljYCAdWAC1zADi60D8CYg/A/FtIF4IxB5ATDPADjR5JhD/J4C3AuUFgZiqgAlo2hogJmQ5TP4kUC0XNV2QQYLlMEe0UssBoKB/jeYAUJy7AjEvEIN8agbEx4AYZjmI/gHEVImKIDSDnwP58kCMDkAOuQDEyI5IQVeEzgfFLSHgiaZgPpD/EE0MxP0GxAtADCTggMQmm3kGqBPZV5Z4TNJGU3sJj1qipV6hGSqFR6c4mto3eNQSLQVKTMghwIFHJyjBIqv9iUctWIoRqoGQOprJE5MIaWY5yOBRB7BgCV9QukAGoESFDNDlkeVAbELqUeRHo2BIhMBjpEh+gsTGxURWg6wXl3qUkgslgUB1gJpZj4AYZJgXVAwfBVIDUgvSg62JBrIDjrGVhIRSOVA/RQDFk0MiDVDkXUKaR0NgNARGQ2A0BEZDYDQEBjwEsLUHCFVgVJUf8BAYdQAAA1xswV7hEbkAAAAASUVORK5CYII=" />
            </defs>
        </svg>

        <span class="cart-button__label">Корзина</span>

        <div class="cart-button__badge">
            {{ count }}
        </div>
    </div>
    <modal-window animation="right" :onClose="() => toggleCart()" :open="openCart" :classes="{
        modal: 'cart-modal',
        close: 'cart-close'
    }">
        <div class="cart-modal__body">

            <transition name="fadeContent" mode="out-in" appear>
                <div class="cart-modal__empty" v-if="cartList.length === 0">
                    <img :src="cart_empty" alt="cart empty">
                    <p>Корзина пуста</p>
                </div>
            </transition>
            <transition name="fadeContent" mode="out-in" appear>
                <div class="cart-moda__content" v-if="cartList.length > 0">
                    <div class="cart-modal__header">
                        <div class="cart-modal__header-label">
                            В корзине: {{ cartList.length }}
                        </div>
                        <div class="cart-modal__header-actions">
                            <svg xmlns="http://www.w3.org/2000/svg" class="cart-modal__clear" viewBox="0 0 105.16 122.88"
                                v-on:click="onCartClear">
                                <path class="cls-1"
                                    d="M11.17,37.16H94.65a8.4,8.4,0,0,1,2,.16,5.93,5.93,0,0,1,2.88,1.56,5.43,5.43,0,0,1,1.64,3.34,7.65,7.65,0,0,1-.06,1.44L94,117.31v0l0,.13,0,.28v0a7.06,7.06,0,0,1-.2.9v0l0,.06v0a5.89,5.89,0,0,1-5.47,4.07H17.32a6.17,6.17,0,0,1-1.25-.19,6.17,6.17,0,0,1-1.16-.48h0a6.18,6.18,0,0,1-3.08-4.88l-7-73.49a7.69,7.69,0,0,1-.06-1.66,5.37,5.37,0,0,1,1.63-3.29,6,6,0,0,1,3-1.58,8.94,8.94,0,0,1,1.79-.13ZM5.65,8.8H37.12V6h0a2.44,2.44,0,0,1,0-.27,6,6,0,0,1,1.76-4h0A6,6,0,0,1,43.09,0H62.46l.3,0a6,6,0,0,1,5.7,6V6h0V8.8h32l.39,0a4.7,4.7,0,0,1,4.31,4.43c0,.18,0,.32,0,.5v9.86a2.59,2.59,0,0,1-2.59,2.59H2.59A2.59,2.59,0,0,1,0,23.62V13.53H0a1.56,1.56,0,0,1,0-.31v0A4.72,4.72,0,0,1,3.88,8.88,10.4,10.4,0,0,1,5.65,8.8Zm42.1,52.7a4.77,4.77,0,0,1,9.49,0v37a4.77,4.77,0,0,1-9.49,0v-37Zm23.73-.2a4.58,4.58,0,0,1,5-4.06,4.47,4.47,0,0,1,4.51,4.46l-2,37a4.57,4.57,0,0,1-5,4.06,4.47,4.47,0,0,1-4.51-4.46l2-37ZM25,61.7a4.46,4.46,0,0,1,4.5-4.46,4.58,4.58,0,0,1,5,4.06l2,37a4.47,4.47,0,0,1-4.51,4.46,4.57,4.57,0,0,1-5-4.06l-2-37Z" />
                            </svg>
                        </div>
                    </div>
                    <transition-group name="list" tag="ul" class="cart-modal__list scroll">
                        <li v-for="item in cartList" :key="item.id + '' + item.size" class="cart-modal__list-item">
                            <CardCartItem :data="item"></CardCartItem>
                        </li>
                    </transition-group>
                    <!-- <ul >

                    </ul> -->
                    <div class="cart-modal__footer">
                        <div class="cart-modal__info">
                            <span class="cart-modal__info-label">Товаров на сумму:</span>
                            <span class="cart-modal__info-price">
                                {{ totalPrice }}
                                {{ CURRENCY }}
                            </span>
                        </div>
                        <button-base :onClick="() => goTo()" label="Оформить"></button-base>
                    </div>
                </div>

            </transition>

        </div>
    </modal-window>
</template>

<script setup  lang="ts">
import cart_empty from '@/assets/img/cart-empty.webp';
import ModalWindow from '@/components/ModalWindow.vue';
import CardCartItem from "@/components/cards/CardCartItem.vue";
import { CURRENCY } from '@/const/global';
import useCart from '@/hooks/useCart';
import { RouterPath } from '@/types/models/router.model';
import { useRouter } from 'vue-router';


const props = defineProps<{ onToggle?: (value: boolean) => void }>();
const router = useRouter();
const { onCartClear, totalPrice, count, onToggleCart, openCart, cartList } = useCart();

const toggleCart = () => {
    if (props.onToggle !== undefined) {
        props.onToggle(!openCart);
    }
    onToggleCart()
}

const goTo = () => {
    toggleCart();
    router.push({ path: RouterPath.order });
}
</script>

<style lang="scss">
@import "@/styles/vars.scss";

.cart-modal {
    padding: 38px 16px 0px 16px;

    @media (min-width: 996px) {
        padding: 38px 36px 0px 36px;
    }

    @media (min-width: 1400px) {
        width: 40% !important;
    }

    &__info-label {
        font-size: 18px;
        font-weight: 500;
    }

    &__body {
        position: relative;
        min-height: 100vh;
        height: 100%;
    }

    &__empty {
        opacity: 1;
        position: absolute;
        width: 320px;
        height: 250px;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;

        p {
            font-size: 20px;
            font-weight: 600;
        }

        @media (min-width: 768px) {
            width: 600px;
            height: 450px;
        }

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
        }

    }

    &__content {
        opacity: 1;
    }

    &__list {
        height: calc(100vh - 236px);
        overflow-y: auto;
        overflow-x: hidden;

        &-item {

            padding-bottom: 10px;
            border-bottom: 1px solid $overlay;
            margin-bottom: 10px;
        }
    }

    &__footer {
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    &__header {
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        &-label {
            font-size: 28px;
            font-weight: 600;
        }
    }

    &__info-price {
        margin-left: 6px;
    }

    &__clear {
        width: 20px;
        height: 20px;
        cursor: pointer;
        transform: rotate(0deg);
        transition: transform 400ms ease;

        @media (min-width: 996px) {
            &:hover {
                transform: rotate(30deg);
                transition: transform 400ms ease;
            }

        }
    }
}

.cart-close {
    right: 14px;
    top: 8px;
}

.cart-button {
    display: flex;
    align-items: center;
    position: relative;
    padding-top: 6px;
    padding-bottom: 6px;
    cursor: pointer;
    transition: 300ms all ease;
    max-width: 160px;

    &.active {
        &::before {
            transition: 300ms background-color ease;
            background-color: $link;
        }

        .cart-button__badge {
            background-color: $link;
            transition: 300ms background-color ease;
        }

        .cart-button__label {
            color: $link;
            transition: 300ms color ease;
        }
    }

    &::before {
        content: "";
        position: absolute;
        width: 100%;
        background-color: rgba(162, 95, 75, 0.3);
        height: 2px;
        bottom: 0px;
        transition: 300ms background-color ease;
    }

    &:hover::before {
        transition: 300ms background-color ease;
        background-color: $link;
    }

    &__label {
        display: none;

        @media (min-width: 768px) {
            display: inline;
            font-size: 12px;
            line-height: 18px;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: $black;
            padding-left: 10px;
            padding-right: 8px;
            transition: 300ms color ease;
        }
    }

    &__icon {
        margin-right: 6px;

        @media (min-width: 768px) {
            margin-right: 0px;
        }
    }

    &:hover .cart-button__label {
        color: $link;
        transition: 300ms color ease;
    }

    &__badge {
        background-color: $badge;
        font-size: 12px;
        line-height: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #FFFFFF;
        width: 22px;
        height: 22px;
        border-radius: 22px;
        transition: 300ms background-color ease;
    }

    &:hover .cart-button__badge {
        background-color: $link;
        transition: 300ms background-color ease;
    }
}

.fadeContent-enter-active {
    transition: all 0.3s ease-out;
}

.fadeContent-leave-active {
    transition: opacity .4s linear;
}

.fadeContent-enter-from,
.fadeContent-leave-to {
    opacity: 0;
}

.list-enter-active,
.list-leave-active {
    transition: all 1s;
}

.list-enter,
.list-leave-to {
    opacity: 0;
    transform: translateY(30px);
}
</style>
