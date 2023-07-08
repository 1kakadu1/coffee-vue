<script setup  lang="ts">
import ModalWindow from '../ModalWindow.vue';
import ContactsForm from "@/components/forms/ContactsForm.vue";

import { ref } from 'vue'
const open = ref(false);

const onClose = () => { open.value = false }
const onOpen = () => { open.value = true }

</script>


<template>
    <section class="callback">
        <div class="container callback__content">
            <h2 class="callback__title">Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </h2>
            <p class="callback__desc">Aliquam nobis vel quae illo debitis aspernatur ad ullam minus, reiciendis autem quas
                exercitationem, ut commodi voluptatibus. Velit asperiores illum ducimus? Quod.</p>
            <button-base label="Write to us" :onClick="onOpen"></button-base>
        </div>
        <modal-window :onClose="onClose" :open="open">
            <contacts-form></contacts-form>
        </modal-window>
    </section>
</template>

<style lang="scss">
@import "@/styles/vars.scss";

.callback {
    background-attachment: fixed;
    background-image: url("@/assets/img/contact.jpg");
    background-size: cover;
    height: 420px;
    position: relative;

    &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(29, 31, 46, 0.7);
    }

    &__content {
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

    &__title {
        color: #fff;
        @include adaptive-var("font-size", 48, 18, 1);
        font-weight: 600;
        padding-bottom: 60px;
        text-align: center;
    }

    &__desc {
        @include adaptive-var("font-size", 28, 16, 1);
        color: #fff;
        padding-bottom: 60px;
        text-align: center;
    }
}
</style>
