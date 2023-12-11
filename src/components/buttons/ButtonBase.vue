<template>
    <button class="button-base" :class="[{
        [className || 'uset']: !!className
    }, { outline: outline, fill: !!!outline, }, { dark: color === 'dark', light: color === 'light' }]"
        v-on:click="onClick">
        {{ label }}
        <slot></slot>
    </button>
</template>

<script setup  lang="ts">
withDefaults(defineProps<{ label?: string, onClick?: (e?: MouseEvent) => void, className?: string, outline?: boolean, color?: "dark" | "light" }>(), {
    color: "dark",
})
</script>

<script  lang="ts">
import { defineComponent, defineProps, withDefaults } from 'vue';

export default defineComponent({
    name: 'ButtonBase',
})
</script>

<style lang="scss">
@import "@/styles/vars.scss";

.button-base {
    display: block;
    font-weight: 600;
    min-width: 120px;
    padding: 10px 20px;
    cursor: pointer;

    &.fill {

        &.dark {
            background-color: $black;
            border: 3px solid $black;
            color: $write;

            @media screen and (min-width: 992px) {
                &:hover {
                    border: 3px solid $black;
                    background-color: transparent;
                    color: $black;
                    font-weight: 600;
                }
            }
        }

        &.light {
            background-color: $link;
            border: 3px solid $link;
            color: $write;

            @media screen and (min-width: 992px) {
                &:hover {
                    border: 3px solid $link;
                    background-color: transparent;
                    color: $write;
                    font-weight: 600;
                }
            }
        }
    }

    &.outline {
        background-color: transparent;
        border: 3px solid $black;
        color: $black;

        @media screen and (min-width: 992px) {
            &:hover {
                border: 3px solid $black;
                background-color: $black;
                color: $write;
                font-weight: 600;
            }
        }
    }



}
</style>