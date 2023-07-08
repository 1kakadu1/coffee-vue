<script setup  lang="ts">
import SubscribeForm from '../forms/SubscribeForm.vue';
</script>

<template>
    <section class="subscribe">
        <div class="container">
            <title-decoration title="подпишись на нас!" h="h2" />
            <h2 class="subscribe__title">Получай новую информацию о поставках</h2>
            <subscribe-form />
        </div>
    </section>
</template>

<style lang="scss">
@import "@/styles/vars.scss";

.subscribe {
    background-attachment: fixed;
    background-image: url("@/assets/img/subscrib.jpg");
    background-size: cover;
    height: 340px;
    position: relative;

    &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(29, 31, 46, 0.8);
    }

    &__title {
        font-style: normal;
        font-weight: 400;
        @include adaptive-var("font-size", 36, 18, 1);
        @include adaptive-var("line-height", 50, 38, 1);
        text-align: center;
        color: #FFFFFF;

    }

    &>.container {
        position: relative;
        z-index: 2;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: column;
        height: 100%;
        padding-bottom: 80px;
        padding-top: 80px;
        padding-left: 20px;
        padding-right: 20px;
    }

    .title__text.h2 {
        color: #fff;
    }
}
</style>
