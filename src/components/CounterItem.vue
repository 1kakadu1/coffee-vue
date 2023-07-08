<script setup  lang="ts">
defineProps<{ count: number, onAdd: (value: unknown) => void, onSub: (value: unknown) => void, big?: boolean }>()
</script>
<template>
    <div class="counter">
        <button class="counter__btn counter__sub" :class="{ big: big }" v-on:click="onSub">
            <svg width="14" height="3" viewBox="0 0 14 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.14 2.53V0.0100001H13.49V2.53H0.14Z" fill="#fff" />
            </svg>
        </button>
        <span class="counter__value" :class="{ big: big }">{{ count }}</span>
        <button class="counter__btn counter__add" :class="{ big: big }" v-on:click="onAdd">
            <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.64 5.24V7.73H8.42V12.95H5.93V7.73H0.74V5.24H5.93V0.0500001H8.42V5.24H13.64Z" fill="#fff" />
            </svg>
        </button>
    </div>
</template>
<style lang="scss">
@import "@/styles/vars.scss";

.counter {
    display: flex;
    align-items: center;

    &__value {

        width: 28px;
        height: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        background-color: $black;

        @media (min-width: 540px) {
            width: 32px;
            height: 32px;
        }

        &.big {
            width: 50px;
            height: 50px;
        }
    }

    &__btn {
        background-color: $black;
        width: 28px;
        height: 28px;
        color: #fff;
        transition: background-color 300ms ease, color 300ms ease;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;

        &.big {
            width: 50px;
            height: 50px;
        }

        @media (min-width: 540px) {
            width: 32px;
            height: 32px;
        }

        &:hover {
            background-color: $link;
            transition: background-color 300ms ease, color 300ms ease;
        }

        svg {
            width: 16px;
            height: 16px;
        }
    }
}
</style>