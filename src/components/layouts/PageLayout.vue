<script setup lang="ts">
import logo from '@/assets/img/IMAGE.png'
import { computed, watch } from 'vue'
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import SearchForm from "@/components/forms/SearchForm.vue";
import { useSearchStore } from '@/store/store';
import { useRoute } from 'vue-router';
import { SearchMutation } from '@/store/modules/search/search.model';
import { RouterPath } from '@/types/models/router.model';

const menu = computed(()=> [
  { label: 'Главная', href: RouterPath.home },
  { label: 'Блог', href: RouterPath.blog },
  { label: 'О нас', href: RouterPath.about },
]);
const storeSearch = useSearchStore();
const open = computed(() => storeSearch.state.open);
const route = useRoute();

watch(() => route.name, () => {
  if (open.value) {
    storeSearch.commit(SearchMutation.toggleSearchOpen, false);
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
