<script setup  lang="ts">

withDefaults(defineProps<{ title: string, h?: "h1" | "h2" | "h3" | "h4" | "default", center?: boolean }>(), {
    h: "default",
    center: false,
})
</script>

<script  lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'TitleDecoration',
})
</script>

<template>
    <div class="title-wrap" :class="{ 'title-warp_center': center }">
        <span class="title__sp"></span>
        <h3 class="title__text" :class="h">
            {{ title }}
        </h3>
        <span class="title__sp"></span>
    </div>
</template>

<style lang="scss">
@import "@/styles/vars.scss";

.title-wrap {
    display: flex;
    align-items: center;
}

.title-wrap {
    justify-content: center;
}

.title__sp {
    width: 32px;
    height: 2px;
    background: #ECECED;
}

.title__text {
    font-weight: 400;
    line-height: 18px;
    text-align: center;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #1D1F2E;
    padding-left: 16px;
    padding-right: 16px;

    &.default {
        font-size: 12px;
    }

    &.h1 {
        font-size: 22px;
    }

    &.h2 {
        font-size: 18px;
        @include adaptive-var("font-size", 18, 14, 1);
    }

    &.h3 {
        font-size: 16px;
    }

    &.h4 {
        font-size: 14px;
    }
}
</style>