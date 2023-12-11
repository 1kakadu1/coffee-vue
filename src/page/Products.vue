<template>
    <PageLayout>
        <div class="container">
            <h1>Products</h1>
        </div>
    </PageLayout>
</template>
<script  lang="ts">
import { defineComponent, } from 'vue'
import PageLayout from "@/components/layouts/page.layout.vue";
import { useStore } from "@/store/store";

export default defineComponent({
    name: 'ProductsPage',
    components: {
        PageLayout,
    },
    setup() {
        const store = useStore();

        return {}
    },
})
</script>
  
<style lang="scss"></style>
  
  