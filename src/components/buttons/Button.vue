<template>
    <button class="button-default" :class='{ primary: theme === "primary", secondary: theme === "secondary" }'
        v-on:click="onPress" v-if="link === undefined">
        <span>
            <slot></slot>
        </span>
    </button>
    <router-link class="button-default" :class='{ primary: theme === "primary", secondary: theme === "secondary" }' :to="link"
        v-if="link !== undefined">
        <slot></slot>
    </router-link>
</template>

<script setup  lang="ts">
interface ButtonProps {
    link?: string;
    onPress: () => void;
    theme?: "primary" | "secondary"
}

withDefaults(defineProps<ButtonProps>(), {
    theme: "primary",
})
</script>

<script  lang="ts">
import { defineComponent, defineProps, withDefaults } from 'vue';

export default defineComponent({
    name: 'ButtonComponent',
})
</script>

<style lang="scss">
@import "@/styles/vars.scss";

.button-default {
    display: block;
    font-weight: 600;
    min-width: 120px;
    padding: 10px 20px;
    margin: 38px auto 0 auto;
    cursor: pointer;

    &.primary {
        background-color: $link;
        border: 3px solid $link;
        color: $write;

        @media screen and (min-width: 992px) {
            &:hover {
                border: 3px solid $link;
                background-color: transparent;
                color: $link;
            }
        }
    }

    &.secondary {
        background-color: $black;
        border: 3px solid $black;
        color: $write;

        @media screen and (min-width: 992px) {
            &:hover {
                border: 3px solid $black;
                background-color: transparent;
                color: $black;
            }
        }
    }

}</style>
