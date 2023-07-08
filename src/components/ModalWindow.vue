<script setup  lang="ts">
import {  onUnmounted, onUpdated } from 'vue'
const props = withDefaults(defineProps<{
    open: boolean, onClose: () => void; animation?: "right" | "center",
    classes?: {
        modal?: string;
        close?: string;
        overlay?: string;
    }
}>(), {
    animation: "center"
});

onUnmounted(() => {
    const body = document.querySelector("body");
    if (body) {
        body.style.overflow = "";
    }
});
onUpdated(() => {
    const body = document.querySelector("body");
    if (body) {
        if (props.open) {
            body.style.overflow = "hidden";
        } else {
            body.style.overflow = "";
        }
    }

})

</script>


<template>
    <Teleport to="body">
        <transition name="fade" mode="out-in" appear>
            <div class="modal-overlay" :class="[{ [classes?.overlay || '']: !!classes?.overlay }]" v-if="open"
                @click="onClose"></div>
        </transition>
        <transition :name="animation" mode="out-in" appear>
            <div class="modal" :class="[{ right: animation === 'right' }, { [classes?.modal || '']: !!classes?.modal }]"
                role="dialog" v-if="open">
                <svg class="modal__close" :class="[{ [classes?.close || '']: !!classes?.close }]" @click="onClose"
                    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                    style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" xml:space="preserve">
                    <path
                        d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z" />
                </svg>
                <slot></slot>
            </div>
        </transition>

    </Teleport>
</template>

<style lang="scss">
@import "@/styles/vars.scss";

.modal {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    width: fit-content;
    height: fit-content;
    padding: 26px;
    border-radius: 10px;
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
    background: #FFF;
    z-index: 999;
    transform: none;

    &.right {
        width: 100%;
        height: 100vh;
        right: 0px;
        border-radius: 0px;
        left: unset;

        @media (min-width: 996px) {
            width: 50%;
        }
    }

    &__close {
        width: 28px;
        height: 28px;
        cursor: pointer;
        position: absolute;
        right: 4px;
        top: 4px;

        @media (min-width: 992px) {
            transform: rotate(0deg);
            transition: transform 300ms ease;

            &:hover {
                transform: rotate(90deg);
                transition: transform 300ms ease;
            }
        }

    }
}

.modal-overlay {
    content: '';
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 998;
    background: rgba(29, 31, 46, 0.7);
    opacity: 0.6;
    cursor: pointer;
}

.right-enter-active,
.right-leave-active {
    transition: transform 0.4s cubic-bezier(0.5, 0, 0.5, 1), opacity 0.4s linear;
}


.right-enter-from,
.right-leave-to {
    opacity: 0;
    transform: translateX(50%);
}


.center-enter-active,
.center-leave-active {
    transition: transform 0.4s cubic-bezier(0.5, 0, 0.5, 1), opacity 0.4s linear;
}


.center-enter-from,
.center-leave-to {
    opacity: 0;
    transform: scale(0.3) translateY(-50%);
}

.fade-enter-active {
    transition: all 0.3s ease-out;
}

.fade-leave-active {
    transition: opacity .4s linear;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
