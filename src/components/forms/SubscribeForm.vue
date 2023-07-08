<script setup  lang="ts">
import useInput from '@/hooks/useInput';
const { value, onChangeField, error, checkValidation } = useInput({
    validation: (value) => {
        if (value.length === 0) {
            return "Поле обязательно для заполнения";
        }

        return undefined
    }
});

const onSubmit = async () => {
    const errorEmail = checkValidation();
    if (error.value === undefined && errorEmail === undefined) {
        console.log("send");
    }
}

</script>


<template>
    <form class="form-subscribe" @submit.prevent="onSubmit">
        <div class="form-subscribe__row">
            <input-base :classes="{ input: 'form-subscribe__input' }" :value="value" name="email" type="email"
                @input="onChangeField" placeholder="Ваш Email" :error="error"></input-base>
            <button-base :on-click="onSubmit" label="подписаться" class-name="form-subscribe__btn"></button-base>
        </div>

    </form>
</template>

<style lang="scss">
@import "@/styles/vars.scss";

.form-subscribe {
    &__row {
        display: flex;
        align-items: center;
        flex-direction: column;

        @media (min-width: 768px) {
            flex-direction: row;
        }
    }

    &__btn.fill {
        height: 46px;
        margin-bottom: 10px;
        margin-left: 6px;
        // background-color: #fff;
        // color: $black;
        // border-color: #fff;
        letter-spacing: 2px;
        text-transform: uppercase;
        font-weight: 400;
        width: 100%;

        @media (min-width: 996px) {
            &.dark:hover {
                color: #fff;
                border-color: #fff;
            }
        }
    }

    &__input.form-control__input {
        border: 1px solid #2F303E;
        letter-spacing: 2px;
        text-transform: uppercase;
        font-weight: 400;
        width: 300px;
        text-align: center;
    }
}
</style>
