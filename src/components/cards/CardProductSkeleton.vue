<script setup  lang="ts">
import SkeletonLoader from "@/components/SkeletonLoader.vue";
import type { ProductCardSize } from "@/types";
const { size } = withDefaults(defineProps<{ size?: ProductCardSize }>(),{
    size: 'small'
})
const preview_size = size === 'small' ?  "card-product__preview-loader" : "card-product__preview-loader card-product__preview-loader-big"
</script>

<template>
    <div class="card-product">
        <div class="row card-product__header">
            <div class="col-12 col-sm-6">
                <skeleton-loader :cssClass="preview_size"></skeleton-loader>
            </div>
            <div class="col-12 col-sm-6 card-product__right-column">
                <div class="card-product__rating">
                    <skeleton-loader cssClass="card-product__rating-item-loader" v-for="i in [1, 2, 3, 4, 5]"
                        :key="i"></skeleton-loader>
                </div>
                <skeleton-loader cssClass="card-product__rating-count-loader"></skeleton-loader>

                <ul class="card-product__sizes">
                    <skeleton-loader v-for="i in [1, 2]" :key="i"
                        cssClass="card-product__sizes-item-loader"></skeleton-loader>
                </ul>

                <div class="card-product__row">
                    <skeleton-loader cssClass="card-product__price-loader"></skeleton-loader>
                </div>
            </div>
        </div>
        <div>
            <skeleton-loader cssClass="card-product__name-loader"></skeleton-loader>
            <skeleton-loader cssClass="card-product__desc-loader"></skeleton-loader>
            <skeleton-loader cssClass="card-product__desc-loader"></skeleton-loader>
        </div>
    </div>
</template>

<style lang="scss">
@import "@/styles/vars.scss";


.card-product {

    &__preview-loader {
        max-height: 540px;
        width: 100%;
        height: 220px;
        border-radius: 6px;
        &-big{
            height: 320px;
        }
    }


    &__price-loader {
        width: 74px;
        height: 44px;
        margin-top: 12px;
        border-radius: 6px;
    }

    &__name-loader {
        height: 39px;
        width: 100%;
        margin-bottom: 6px;
        border-radius: 6px;
    }

    &__desc-loader {
        height: 9px;
        margin-top: 4px;
        width: 100%;
        border-radius: 6px;
    }

    &__rating {
        &-item-loader {
            width: 20px;
            height: 20px;
            margin-right: 4px;
            border-radius: 6px;
        }

        &-count-loader {
            width: 116px;
            height: 24px;
            margin-bottom: 10px;
        }
    }

    &__sizes {
        &-item-loader {
            width: 50px;
            height: 18px;
            margin-right: 16px;
            border-radius: 6px;
        }
    }

}
</style>