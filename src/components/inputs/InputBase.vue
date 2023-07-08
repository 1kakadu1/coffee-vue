<script setup  lang="ts">
import  { type InputHTMLAttributes } from 'vue';

interface IInputBaseProps extends /* @vue-ignore */ InputHTMLAttributes {
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
}

const props = withDefaults(defineProps<IInputBaseProps>(), {
    type: "text",
    name: "input",
    inheritAttrs: false
});

</script>

<template>
    <div class="form-control" :class="[{ [classes?.root || 'uset']: !!classes?.root }]">
        <label v-if="label" :class="[{ [classes?.label || 'uset']: !!classes?.label }]" class="form-control__label"
            :for="props.name">{{ label }}</label>
        <div class="form-control__container">
            <input :class="[{ [classes?.input || 'uset']: !!classes?.input }]" class="form-control__input"
                :name="props.name" :type="props.type" v-bind="$attrs" />
            <span class="form-control__error"
                :class="[{ error: !!props.error }, { [classes?.error || 'uset']: !!classes?.error }]">{{ props.error
                }}</span>
        </div>
    </div>
</template>

<style lang="scss">
@import "@/styles/vars.scss";

.form-control {
    &__label {
        font-weight: 600;
        font-size: 14px;
        color: $black;
    }

    &__input {
        height: 46px;
        border: 1px solid #2F303E;
        border-radius: 0px;
        padding: 10px 10px;
        transition: border 300ms ease;

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
