<script setup  lang="ts">
import { type TextareaHTMLAttributes } from 'vue';
import { vMaska } from "maska"

interface ITextareaBaseProps extends /* @vue-ignore */ TextareaHTMLAttributes {
    label?: string;
    inheritAttrs?: boolean;
    error?: string;
    type?: string;
    name?: string;
    classes?: {
        input?: string;
        root?: string;
        label?: string;
        error?: string
    }
    maska?: string;
}

const props = withDefaults(defineProps<ITextareaBaseProps>(), {
    type: "text",
    name: "textarea",
    inheritAttrs: false
});

</script>

<template>
    <div class="form-control-textarea" :class="[{ [classes?.root || 'uset']: !!classes?.root }]">
        <label v-if="label" :class="[{ [classes?.label || 'uset']: !!classes?.label }]" class="form-control-textarea__label"
            :for="props.name">{{ label }}</label>
        <div class="form-control-textarea__container">
            <textarea :class="[{ [classes?.input || 'uset']: !!classes?.input }]" class="form-control-textarea__input"
                :name="props.name" :type="props.type" v-bind="$attrs" v-maska :data-maska="maska" />
            <span class="form-control-textarea__error"
                :class="[{ error: !!props.error }, { [classes?.error || 'uset']: !!classes?.error }]">{{ props.error
                }}</span>
        </div>
    </div>
</template>

<style lang="scss">
@import "@/styles/vars.scss";

.form-control-textarea {
    &__label {
        font-weight: 600;
        font-size: 14px;
        color: $black;
    }

    &__input {
        height: auto;
        border: 1px solid #2F303E;
        border-radius: 0px;
        padding: 10px 10px;
        transition: border 300ms ease;
        resize: none;

        &:focus {
            border: 1px solid $link;
            transition: border 300ms ease;
        }

        &::placeholder {
            color: $black;
            opacity: 1;
        }

        &:-ms-input-placeholder {
            color: $black;
        }

        &::-ms-input-placeholder {
            color: $black;
        }
    }

    &__container {
        position: relative;
        padding-bottom: 14px;
        padding-top: 5px;
    }

    &__error {
        position: absolute;
        bottom: 2px;
        left: 0;
        opacity: 0;
        visibility: hidden;
        z-index: -1;
        transition: opacity 300ms ease, visibility 300ms ease, z-index 300ms ease;
        font-size: 10px;
        color: #ea0000;

        &.error {
            opacity: 1;
            visibility: visible;
            z-index: 1;
            transition: opacity 300ms ease, visibility 300ms ease, z-index 300ms ease;
        }
    }
}
</style>
