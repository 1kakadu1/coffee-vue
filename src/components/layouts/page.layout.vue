<template>
  <div class="container">
    <HeaderComponent :logo='logo' :menu='menu' :fixed="true"></HeaderComponent>
  </div>
  <main>
    <slot></slot>
  </main>
  <FooterComonent :logo="logo" />
  <SearchFormComponent />
</template>
<script setup lang="ts">
import logo from '@/assets/img/IMAGE.png'
import { VueElement, watch } from 'vue'
import { routerMenu, RouterPath } from "@/router/router";
const menu: { label: string, href: RouterPath, icon?: VueElement }[] = [...routerMenu];
const storeSearch = useSearchStore();
const open = computed(() => storeSearch.state.open);
const route = useRoute();

watch(() => route.name, () => {
  if (open.value) {
    storeSearch.commit(SearchMutation.toggleSearchOpen, false);
  }
})

</script>
<script  lang="ts">
import { defineComponent, computed} from 'vue'
import HeaderComponent from "@/components/Header.vue";
import FooterComonent from "@/components/Footer.vue";
import SearchFormComponent from "@/components/forms/SearchForm.vue";
import { useSearchStore } from '@/store/store';
import { useRoute } from 'vue-router';
import { SearchMutation } from '@/store/modules/search/search.model';

export default defineComponent({
  name: 'PageLayout',
  components: {
    HeaderComponent,
    FooterComonent,
    SearchFormComponent,
  }
})
</script>