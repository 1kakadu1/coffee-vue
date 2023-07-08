<script setup  lang="ts">
import useSWRV, { mutate } from 'swrv'
import PageLayout from "@/components/layouts/page.layout.vue";
import CounterItem from "@/components/CounterItem.vue";
import { useRoute } from "vue-router";
import { api } from '@/services/api';
import { watchEffect, computed, ref } from 'vue';
import SkeletonLoader from "@/components/SkeletonLoader.vue";
import useCart from '@/hooks/useCart';
import ProductSkeleton from '@/components/cards/CardProductSkeleton.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import CardProduct from "@/components/cards/CardProduct.vue";
import { Navigation } from 'swiper';

const route = useRoute();
const modules = [Navigation];
const { data, error } = useSWRV(() => {
    return (route.params.slug as string);
}, api.getProductBySlugData);
const { data: recomended, error: error_recomended } = useSWRV(() => {
    const cat = data?.value?.categorys.filter(item => item !== "id-all")[0]
    return data.value && cat;

}, api.getProductsByCategoryID);

const active_size = ref(0);
const { onCartAdd, onCartSub, currentCount } = useCart();
const isLoadingProduct = computed(() => {
    return data.value === undefined
})

const isLoadingRecomended = computed(() => {
    return recomended.value === undefined
})

const rating_ceil = computed(() => data.value?.rating ? Math.floor(data.value?.rating) : 0);

watchEffect(() => {

    if (data.value) {
        document.title = data.value.name
    }

    if (error.value !== undefined) {
        console.log("Product Error", error.value);
    }

    if (error_recomended.value !== undefined) {
        console.log("Recomended error", error_recomended.value);
    }
})
</script>
<template>
    <PageLayout>
        <div class="single-product">
            <div class="single-product__header">
                <div class="container">
                    <div class="single-product__card">
                        <div class="row">
                            <div class="col-12 col-xl-4 single-product__container-preview">
                                <img v-if="!isLoadingProduct" class="single-product__preview" :src="data?.preview" alt="">
                                <skeleton-loader v-if="isLoadingProduct"
                                    cssClass="single-product__preview"></skeleton-loader>
                            </div>
                            <div class="col-12 col-xl-8 single-product-info">
                                <div class="single-product-info__header">
                                    <svg class="single-product-info__icon-svg" width="185" height="27" viewBox="0 0 185 27"
                                        fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M1.21086 22.8224C-1.45438 18.2504 0.359247 11.0797 5.87293 5.71467C12.1343 -0.375387 20.792 -1.82729 25.2123 2.47185C25.2175 2.47748 25.2218 2.48386 25.2289 2.48957C24.3442 4.99331 21.527 10.3206 13.0824 13.2008C5.34676 15.8406 2.36271 20.0375 1.21086 22.8224ZM26.4555 4.03695C25.7855 5.55741 24.6193 7.54442 22.6101 9.49881C20.5905 11.4643 17.72 13.3947 13.654 14.782C5.40192 17.597 3.09625 22.2052 2.45295 24.4384C2.48334 24.4682 2.50947 24.4991 2.53901 24.5281C6.95889 28.8274 15.6169 27.3755 21.8778 21.2845C27.4489 15.865 29.2406 8.60132 26.4555 4.03695Z"
                                            fill="#505050" />
                                        <path
                                            d="M40.5234 22.8224C37.8581 18.2504 39.6717 11.0797 45.1854 5.71467C51.4468 -0.375387 60.1045 -1.82729 64.5248 2.47185C64.53 2.47748 64.5343 2.48386 64.5414 2.48957C63.6567 4.99331 60.8395 10.3206 52.3949 13.2008C44.6593 15.8406 41.6752 20.0375 40.5234 22.8224ZM65.768 4.03695C65.098 5.55741 63.9318 7.54442 61.9226 9.49881C59.903 11.4643 57.0325 13.3947 52.9665 14.782C44.7144 17.597 42.4088 22.2052 41.7654 24.4384C41.7958 24.4682 41.822 24.4991 41.8515 24.5281C46.2714 28.8274 54.9294 27.3755 61.1903 21.2845C66.7614 15.865 68.5531 8.60132 65.768 4.03695Z"
                                            fill="#505050" />
                                        <path
                                            d="M79.8359 22.8224C77.1706 18.2504 78.9842 11.0797 84.4979 5.71467C90.7593 -0.375387 99.417 -1.82729 103.837 2.47185C103.842 2.47748 103.847 2.48386 103.854 2.48957C102.969 4.99331 100.152 10.3206 91.7074 13.2008C83.9718 15.8406 80.9877 20.0375 79.8359 22.8224ZM105.081 4.03695C104.411 5.55741 103.244 7.54442 101.235 9.49881C99.2155 11.4643 96.345 13.3947 92.279 14.782C84.0269 17.597 81.7213 22.2052 81.0779 24.4384C81.1083 24.4682 81.1345 24.4991 81.164 24.5281C85.5839 28.8274 94.2419 27.3755 100.503 21.2845C106.074 15.865 107.866 8.60132 105.081 4.03695Z"
                                            fill="#505050" />
                                        <path
                                            d="M119.148 22.8224C116.483 18.2504 118.297 11.0797 123.81 5.71467C130.072 -0.375387 138.729 -1.82729 143.15 2.47185C143.155 2.47748 143.159 2.48386 143.166 2.48957C142.282 4.99331 139.465 10.3206 131.02 13.2008C123.284 15.8406 120.3 20.0375 119.148 22.8224ZM144.393 4.03695C143.723 5.55741 142.557 7.54442 140.548 9.49881C138.528 11.4643 135.657 13.3947 131.592 14.782C123.339 17.597 121.034 22.2052 120.39 24.4384C120.421 24.4682 120.447 24.4991 120.477 24.5281C124.896 28.8274 133.554 27.3755 139.815 21.2845C145.386 15.865 147.178 8.60132 144.393 4.03695Z"
                                            fill="#505050" />
                                        <path
                                            d="M158.461 22.8224C155.796 18.2504 157.609 11.0797 163.123 5.71467C169.384 -0.375387 178.042 -1.82729 182.462 2.47185C182.467 2.47748 182.472 2.48386 182.479 2.48957C181.594 4.99331 178.777 10.3206 170.332 13.2008C162.597 15.8406 159.613 20.0375 158.461 22.8224ZM183.706 4.03695C183.036 5.55741 181.869 7.54442 179.86 9.49881C177.84 11.4643 174.97 13.3947 170.904 14.782C162.652 17.597 160.346 22.2052 159.703 24.4384C159.733 24.4682 159.759 24.4991 159.789 24.5281C164.209 28.8274 172.867 27.3755 179.128 21.2845C184.699 15.865 186.491 8.60132 183.706 4.03695Z"
                                            fill="#505050" />
                                    </svg>
                                    <h1 v-if="!isLoadingProduct" class="single-product-info__name">
                                        {{ data?.name }}
                                    </h1>
                                    <skeleton-loader v-if="isLoadingProduct"
                                        cssClass="single-product-info__name-loader"></skeleton-loader>
                                    <div v-if="!isLoadingProduct" class="single-product-info__composition">
                                        {{ data?.composition.join(", ") }}
                                    </div>
                                    <skeleton-loader v-if="isLoadingProduct"
                                        cssClass="single-product-info__composition-loader"></skeleton-loader>
                                    <div v-if="!isLoadingProduct" class="single-product-info__rating">

                                        <svg v-for="i in [1, 2, 3, 4, 5]" :key="i" width="34" height="31"
                                            class="single-product-info__rating-item" viewBox="0 0 34 31" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M17.0488 0L20.8764 11.6839H33.2631L23.2421 18.905L27.0698 30.5889L17.0488 23.3678L7.02775 30.5889L10.8554 18.905L0.834425 11.6839H13.2211L17.0488 0Z"
                                                :fill="i <= rating_ceil ? '#F9B300' : '#F0F0F0'" />
                                        </svg>
                                        <span class="single-product-info__rating-value">
                                            {{ data?.rating }}
                                        </span>
                                    </div>
                                    <skeleton-loader v-if="isLoadingProduct"
                                        cssClass="single-product-info__rating-loader"></skeleton-loader>

                                </div>
                                <div class="single-product-info__body">
                                    <p class="single-product-info__description" v-if="!isLoadingProduct">
                                        {{ data?.description }}
                                    </p>
                                    <div v-if="isLoadingProduct">
                                        <skeleton-loader v-for="item in [1, 2, 3, 4]" :key="item"
                                            cssClass="single-product-info__description-loader"></skeleton-loader>
                                    </div>
                                </div>
                                <div class="single-product-info__footer">
                                    <ul v-if="!isLoadingProduct" class="single-product-info__sizes">
                                        <li v-for="(item_size, index) in data?.size" :key="item_size"
                                            v-on:click="active_size = index" class="single-product-info__sizes-item">
                                            <span class="single-product-info__sizes-item__dot"
                                                :class="{ active: index === active_size }"></span>
                                            {{ item_size }}
                                        </li>
                                    </ul>
                                    <ul v-if="isLoadingProduct" class="single-product-info__sizes">
                                        <li v-if="isLoadingProduct" class="single-product-info__sizes-item">
                                            <skeleton-loader
                                                cssClass="single-product-info__sizes-item-dot-loader"></skeleton-loader>
                                            <skeleton-loader
                                                cssClass="single-product-info__sizes-item-text-loader"></skeleton-loader>
                                        </li>

                                    </ul>
                                    <div class="single-product-info__footer-actions">
                                        <counter-item v-if="!isLoadingProduct"
                                            :count="currentCount(data?.id as string, data?.size[active_size] as string)"
                                            :on-add="() => {
                                                    onCartAdd({
                                                        count: 1,
                                                        product: data!,
                                                        size: data!.size[active_size],
                                                        id: data!.id
                                                    })
                                                }" :on-sub="() => {
            onCartSub({
                count: 1,
                product: data!,
                size: data!.size[active_size],
                id: data!.id
            })
        }" :big="true"></counter-item>
                                        <div v-if="!isLoadingProduct" class="single-product-info__price">
                                            {{ data?.price[data?.size[active_size]] }} ₽ за {{ data?.size[active_size] }} {{
                                                data?.measurement_value || "" }}
                                        </div>
                                        <skeleton-loader v-if="isLoadingProduct"
                                            cssClass="single-product-info__counter-loader"></skeleton-loader>
                                        <skeleton-loader v-if="isLoadingProduct"
                                            cssClass="single-product-info__price-loader"></skeleton-loader>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="single-product__wawe"></div>
        </div>
        <div class="single-product-sections">
            <section class="single-product__recomended">
                <div class="container">
                    <title-decoration title="Покупают также" h="h1" center></title-decoration>
                    <swiper class="single-product__recomended-list" :slidesPerView="3" :spaceBetween="30"
                        v-if="isLoadingRecomended"
                        :breakpoints="{ 0: { slidesPerView: 1, spaceBetween: 10 }, 768: { slidesPerView: 2, spaceBetween: 10 }, 992: { slidesPerView: 3, spaceBetween: 30 }, }">
                        <swiper-slide v-for="i in [1, 2, 3]" :key="i">
                            <ProductSkeleton />
                        </swiper-slide>
                    </swiper>
                    <swiper class="single-product__recomended-list" :slidesPerView="3" :spaceBetween="30" :navigation="true"
                        :modules="modules" v-if="!isLoadingRecomended"
                        :breakpoints="{ 0: { slidesPerView: 1, spaceBetween: 10 }, 768: { slidesPerView: 2, spaceBetween: 10 }, 992: { slidesPerView: 3, spaceBetween: 30 }, }">
                        <swiper-slide v-for="product in recomended" :key="product.id">
                            <card-product :product="product" size="small"></card-product>
                        </swiper-slide>
                    </swiper>
                </div>

            </section>
            <section class="single-product__reviews">
                <div class="container">
                    <title-decoration title="Отзывы" h="h1" center></title-decoration>
                    <div class="container">
                        <p class="single-product__reviews-empty">Увы, но у данного товара нет пока отзывов</p>
                    </div>
                </div>
            </section>
        </div>

    </PageLayout>
</template>
<style lang="scss">
@import "@/styles/vars.scss";


.single-product {
    &__recomended-list {
        margin-top: 60px;
        margin-bottom: 60px;
    }

    &__reviews {
        margin-top: 60px;

        &-empty {
            padding-top: 30px;
            padding-bottom: 30ox;
            font-weight: 600;
            font-size: 22px;
        }
    }

    &-sections {
        position: relative;
        z-index: 1;
        margin-top: -228px;
    }

    &__loader {
        width: 200px;
        height: 200px;
    }

    &__wawe {
        width: 100%;
        height: 288px;
        background-image: url('~@/assets/img/wawe.svg');
        background-repeat: no-repeat;
        background-size: cover;
        margin-top: -33px;
    }

    &__header {
        background-color: #FFF7E1;
        padding-top: 100px;
        padding-bottom: 100px;
    }

    &__card {

        background: #FFFFFF;
        border: 1px solid #E4E4E4;
        box-shadow: 0px 0px 50px rgba(163, 163, 163, 0.25);
        border-radius: 20px;
        width: 100%;
        height: auto;
        padding: 40px;
        position: relative;
    }

    &__container-preview {
        margin-bottom: 20px;

        @media (min-width: 1200px) {
            margin-bottom: 0px;
        }
    }

    &__preview {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        max-height: 467px;
        border-radius: 10px;

        @media (min-width: 1200px) {
            max-width: 416px;
            max-height: 767px;
        }
    }

    &-info {
        &__icon-svg {
            margin-bottom: 20px;
        }

        &__name {
            padding-bottom: 20px;
            font-weight: 900;
            font-size: 40px;
            line-height: 50px;
            color: $black;

            &-loader {
                height: 70px;
                width: 60%;
                margin-bottom: 20px;
                border-radius: 5px;
            }
        }

        &__composition {
            color: $black;
            font-weight: 500;
            font-size: 20px;
            line-height: 24px;
            padding-bottom: 12;

            &-loader {
                height: 24px;
                width: 70%;
                margin-bottom: 12px;
                border-radius: 5px;
            }
        }

        &__description {
            font-weight: 500;
            font-size: 20px;
            line-height: 130%;
            color: $black;

            &-loader {
                height: 22px;
                width: 100%;
                margin-bottom: 12px;
                border-radius: 5px;
            }
        }

        &__rating {
            padding-top: 16px;
            padding-bottom: 20px;
            display: flex;
            align-items: center;

            &-loader {
                height: 36px;
                width: 40%;
                margin-bottom: 12px;
                border-radius: 5px;
            }

            &-value {
                margin-left: 24px;
                font-weight: 700;
                font-size: 30px;
                line-height: 36px;
            }
        }

        &__price {
            padding: 10px 30px;
            min-width: 120px;
            max-width: 400px;
            height: 50px;
            background: #F9B300;
            border-radius: 5px;
            text-align: center;
            vertical-align: middle;
            display: inline;
            font-weight: 600;
            font-size: 25px;
            line-height: 30px;
            color: #FFFFFF;

            &-loader {
                border-radius: 5px;
                max-width: 400px;
                height: 50px;
                width: 100%;
            }
        }

        &__counter-loader {
            height: 50px;
            border-radius: 5px;
            width: 200px;
        }

        &__sizes {
            display: flex;
            align-items: center;

            &-item {
                margin-right: 60px;
                font-weight: 500;
                font-size: 30px;
                line-height: 35px;
                display: flex;
                align-items: center;
                cursor: pointer;

                &-dot-loader {
                    width: 25px;
                    height: 25px;
                    border-radius: 25px;
                    margin-right: 12px;
                }

                &-text-loader {
                    height: 25px;
                    width: 120px;
                    border-radius: 5px;
                }

                &__dot {
                    margin-right: 12px;
                    width: 25px;
                    height: 25px;
                    border-radius: 25px;
                    background-color: $gray_light;
                    transition: background-color 300ms ease;

                    &.active {
                        background-color: $yellow;
                    }

                    &:hover {
                        background-color: $link;
                        transition: background-color 300ms ease;
                    }
                }
            }
        }

        &__footer {
            margin-top: 40px;
        }

        &__footer-actions {
            margin-top: 60px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
    }
}

.single-product-sections {
    .swiper-button-next {
        right: 0px;
        color: $yellow;
    }

    .swiper-button-prev {
        left: 0px;
        color: $yellow;
    }
}

.counter {
    display: flex;
}
</style>