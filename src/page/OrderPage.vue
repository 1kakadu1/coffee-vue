<template>
    <PageLayout>
        <div class="container pd order-page">
            <div class="row layer">
                <div class="order-form-container ">
                    <Form @submit="onSubmit" :validation-schema="schema">
                        <h3 class="order-form__title">Оформление заказа</h3>
                        <Field name="name" v-slot="{ field, errorMessage, handleChange }">
                            <input-base :classes="{ input: 'order-form__input' }" :value="field.value" name="name"
                                @input="handleChange" placeholder="Ваше имя" :error="errorMessage"></input-base>
                        </Field>

                        <Field name="email" v-slot="{ field, errorMessage, handleChange }">
                            <input-base :classes="{ input: 'order-form__input' }" :value="field.value" name="email"
                                type="email" @input="handleChange" placeholder="Ваш Email"
                                :error="errorMessage"></input-base>
                        </Field>

                        <Field name="phone" v-slot="{ field, errorMessage, handleChange }">
                            <input-base :classes="{ input: 'order-form__input' }" :value="field.value" name="phone"
                                type="tel" @input="handleChange" placeholder="Ваш телефон" :error="errorMessage"
                                maska="+# (###) ##-##-###"></input-base>
                        </Field>
                        <!-- <VueDatePicker v-model="date" :min-date="new Date()" :max-date="new Date()"></VueDatePicker> -->
                        <input-base :classes="{ input: 'order-form__input order-form__input__off' }" value="Оплата на кассе"
                            name="payment" type="text" placeholder="Оплата на кассе" :disabled="true"></input-base>

                        <Field name="comments" v-slot="{ field, errorMessage, handleChange }">
                            <textarea-base name="comments" :value="field.value" placeholder="Ваши пожелания"
                                :error="errorMessage" @input="handleChange" :classes="{ input: 'order-form__input' }"
                                rows="4"></textarea-base>
                        </Field>

                        <span class="order-form__info">* Нажимая на кнопку, вы даете согласие на обработку персональных
                            данных</span>

                        <button-base label="Оформить закза"></button-base>
                    </Form>
                </div>
                <div class="order-form-info">
                    <h3 class="order-form__title">Наши магазины</h3>
                    <mapbox-map :accessToken="API_MAPBOX" class="map" :zoom="map.zoom" :center="map.center">
                        <mapbox-marker :lngLat="map.center" />
                    </mapbox-map>
                </div>
            </div>
        </div>
    </PageLayout>
</template>
<script setup  lang="ts">
import { reactive, ref } from 'vue'
import PageLayout from "@/components/layouts/PageLayout.vue";
import { api } from "@/services/api";
import { Form, Field } from 'vee-validate';
import * as yup from 'yup';
import { MapboxMap, MapboxMarker } from "vue-mapbox-ts";
import { notify } from "@kyvg/vue3-notification";
import useCart from '@/hooks/useCart';
import '@vuepic/vue-datepicker/dist/main.css'

const { cartList, onCartClear } = useCart();
const API_MAPBOX = import.meta.env.VITE_APP_MAPBOX;
const map = reactive({ center: [-0.128928, 51.509364], zoom: 9.5, });
const isLoading = ref(false);
const schema = yup.object({
    email: yup.string().required("Поле обязательно для заполнения").email(),
    name: yup.string().required("Поле обязательно для заполнения").min(3, "Минимальная длина 3"),
    phone: yup.string().required("Поле обязательно для заполнения").min(18, "Введите верно номер"),
    comments: yup.string().required("Поле обязательно для заполнения").max(255, "Максимальная длина 255")
});

export type FormData = yup.InferType<typeof schema>;

function onSubmit(values: any) {
    isLoading.value = true;
    api.createOrder({
        ...values,
        products: cartList
    }).then((res) => {
        onCartClear();
        notify({
            title: "Отлично!",
            text: `Ваш заказ создан (${res}). Ожидайте звонка!`,
            type: "success"
        });
    }).catch((e) => {
        notify({
            title: "Ошибка:",
            text: `${JSON.stringify(e)}`,
            type: "error"
        });
    }).finally(() => {
        isLoading.value = false;
    })
}
</script>
<style lang="scss">
.order-form__input {
    width: 100%;
    font-weight: 700;
}

.order-form__input__off {
    opacity: 0.8;
}

.order-page {
    .row {
        flex-direction: column;

        @media (min-width: 992px) {
            flex-direction: row;
        }
    }
}
</style>
<style lang="scss" scoped>
@import "../styles/vars.scss";

.order-form__title {
    font-size: 28px;
    font-weight: 600;
    padding-bottom: 20px;
}


.order-form__info {
    width: 60%;
    color: $gray_strong;
    display: block;
    padding-bottom: 20px;
    font-size: 12px;
}

.layer {
    background-color: #fff;
    padding: 10px;
    border-radius: 20px;

    @media screen and (min-width: 768px) {
        padding: 20px;
    }

    @media screen and (min-width: 992px) {
        padding: 40px;
    }
}

.pd {
    padding-top: 50px;
    padding-bottom: 50px;
    min-height: calc(100vh - 270px);
}



.order-form-container {
    width: 100%;

    @media screen and (min-width: 992px) {
        width: 40%;
    }
}

.order-form-info {
    width: 100%;
    padding-top: 50px;

    @media screen and (min-width: 992px) {
        width: 60%;
        padding-top: 0px;
    }

}

.map {
    max-height: 400px;
    height: 400px !important;
    border-radius: 10px;
}
</style>
  
  