<script setup  lang="ts">

defineProps<{ link?: string, label: string, sectioonTitle: string, title: string, description: string, subTitle: string, onClick?: () => void, images: [string, string, string] }>()
</script>

<script  lang="ts">
import { defineComponent, defineProps } from 'vue';
import TitleDecoration from "@/components/Title.vue";
import ButtonBase from "@/components/buttons/ButtonBase.vue";

export default defineComponent({
    name: 'SectionCall',
    components: {
        TitleDecoration,
        ButtonBase,
    },
    methods: {
        click: () => {
            console.log("clik");
        }
    }
})
</script>

<template>
    <section class="section-call">
        <div class="section-call__title-section">
            <title-decoration :title="sectioonTitle" h="h1" center></title-decoration>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-12 col-xxl-5 col-lg-6">
                    <div class="section-call__images">
                        <img :src='images[0]' alt="" class="section-call__image section-call__image_big">
                        <div class="section-call__images-column">
                            <img :src='images[1]' alt="" class="section-call__image section-call__image_small">
                            <img :src='images[2]' alt="" class="section-call__image section-call__image_small">
                        </div>
                    </div>
                </div>
                <div class="col-12 col-xxl-7 col-lg-6 section-call__right-column">
                    <div class="section-call__info">
                        <p class="section-call__subtitle">{{ subTitle }}</p>
                        <h4 class="section-call__title">{{ title }}</h4>
                        <p class="section-call__desc">{{ description }}</p>
                    </div>

                    <button-base v-if="!link" :onClick="click" :label="label" className="section-call__btn"></button-base>
                    <router-link v-if="link" class="section-text__link" :to="link">{{ label }}</router-link>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss">
@import "@/styles/vars.scss";

.section-call {
    @include adaptive-var("padding-bottom", 100, 60, 1);
    @include adaptive-var("padding-top", 150, 80, 1);

    &__right-column {
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        padding-top: 40px;


        @media (min-width: 992px) {
            padding-top: 0px;

        }
    }

    &__btn {
        max-width: 240px;
    }

    &__images {
        display: flex;

        &-column {
            display: none;

            @media (min-width: 992px) {
                margin-left: 20px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
            }
        }
    }

    &__image {
        object-fit: cover;
        object-position: center;

        &_big {

            width: 100%;
            height: 100%;
            max-height: 360px;

            @media (min-width: 992px) {
                width: 280px;
                height: 280px;
            }
        }

        &_small {
            width: 160px;
            height: 130px;
        }
    }

    &__title-section {
        @include adaptive-var("padding-bottom", 100, 40, 1);
    }

    &__subtitle {
        font-family: 'Karla';
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 18px;
        letter-spacing: 2px;
        text-transform: uppercase;
        color: #1D1F2E;
        padding-bottom: 20px;
    }

    &__title {
        font-weight: 400;
        font-size: 36px;
        line-height: 50px;
        padding-bottom: 15px;

        @media (min-width: 1200px) {
            max-width: 238px;
        }
    }

    &__desc {
        font-weight: 400;
        font-size: 16px;
        line-height: 28px;
        color: rgba(29, 31, 46, 0.7);
        padding-bottom: 15px;

        @media (min-width: 1200px) {
            max-width: 298px;
        }
    }
}
</style>
