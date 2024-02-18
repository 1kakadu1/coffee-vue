<script setup lang="ts">
import logo from '@/assets/img/IMAGE.png'
import { computed, watch } from 'vue'
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import SearchForm from "@/components/forms/SearchForm.vue";
import { useRoute } from 'vue-router';
import { RouterPath } from '@/types/models/router.model';
import { useSearchStore } from '@/store/modules/search/search.store';

const storeSearch = useSearchStore();
const menu = computed(()=> [
  { label: 'Главная', href: RouterPath.home },
  { label: 'Блог', href: RouterPath.blog },
  { label: 'О нас', href: RouterPath.about },
]);

const open = computed(() => storeSearch.open);
const route = useRoute();

watch(() => route.name, () => {
  if (open.value) {
    storeSearch.toggeleSearch(false);
  }
})

</script>
<template>
  <div class="container">
    <Header :logo='logo' :menu='menu' :fixed="true" />
  </div>
  <main>
    <slot></slot>
  </main>
  <Footer :logo="logo" />
  <SearchForm />
</template>
