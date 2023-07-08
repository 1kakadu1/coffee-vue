<script setup  lang="ts">
const submitHandler = async (fields: { name: string, email: string }) => {
    await new Promise((r) => setTimeout(r, 1000))
}
</script>


<template>
    <FormKit type="form" @submit="submitHandler" :classes="{ form: 'form-callback' }" :actions="false">
        <div class="row">
            <div class="col-6">
                <FormKit type="text" label="Name" name="name" validation="required|length:5,16"
                    validation-visibility="live" />
            </div>
            <div class="col-6">
                <FormKit type="email" label="Email" name="email" validation="required|email" validation-visibility="live" />
            </div>
        </div>
        <FormKit type="textarea" name="message" label="Message" rows="6" validation="required|length:5,250"
            validation-visibility="live" :classes="{
                    wrapper: 'form-callback__textarea',
                }" />
        <FormKit type="submit" label="Send message" :classes="{ input: 'button-base fill form-callback__btn' }" />

    </FormKit>
</template>

<style lang="scss">
@import "@/styles/vars.scss";

.form-callback {
    width: calc(100% - 60px);

    @media (min-width: 768px) {
        width: 420px;
    }

    &__textarea {
        max-width: 100%;

        textarea {
            resize: none;
        }
    }

    &__btn {
        transition: all 300ms ease;
        background: $black;

        &:hover {
            transition: all 300ms ease;
            background: transparent;
        }
    }
}
</style>
