<script setup  lang="ts">
defineProps<{ link: string, title: string, description: string }>()
</script>

<script  lang="ts">
import { RouterPath } from '@/types/models/router.model';
import { defineComponent, defineProps } from 'vue';

export default defineComponent({
    name: 'SectionText',
})
</script>

<template>
    <section class="section-text">
        <div class="container">
            <h1 class="g-typography-title section-text__title">{{ title }}</h1>
            <p class="g-typography-desc section-text__desc">{{ description }}</p>
            <router-link class="section-text__link" :to="RouterPath.blog + '/' + link">Наша продукция</router-link>
        </div>
    </section>
</template>

<style lang="scss">
@import "@/styles/vars.scss";

.section-text {
    text-align: center;
    max-width: 628px;
    margin: 0 auto;

    &__title {
        @include adaptive-var("font-size", 28, 16, 1);
        padding-bottom: 18px;
    }

    &__desc {
        @include adaptive-var("font-size", 16, 13, 1);
        padding-bottom: 22px;
    }

    &__link {
        padding-bottom: 20px;
        display: inline-block;
        font-weight: 400;
        font-size: 15px;
        line-height: 10px;
        text-align: center;
        color: $link;
        position: relative;
        margin-bottom: 20px;

        &::before {
            content: '';
            position: absolute;
            width: 100%;
            left: 0;
            bottom: 0;
            height: 2px;
            background-color: rgba(162, 95, 75, 0.2);
        }
    }
}
</style>