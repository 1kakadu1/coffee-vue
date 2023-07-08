<template>
  <div class="header__fixed-offset" v-if="fixed === true"></div>
  <header class="header" :class="{ header__fixed: fixed === true }">
    <div class="header__body" :class="{ container: fixed === true }">
      <div class="header__logo">
        <img :src="logo" alt="logo">
      </div>
      <div class="header__toolbar">
        <div class="header__menu">
          <MenuHeader :link="menu" />
        </div>
        <div class="header__actions">
          <button class="header__actions-search" v-on:click="onToggleSearch(!open)">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="50px" height="50px">
              <path
                d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z" />
            </svg>
          </button>
          <cart-button :onToggle='(value: boolean) => void 0' />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup  lang="ts">
defineProps<{ logo: string, menu: { label: string, href: RouterPath, icon?: VueElement }[], fixed?: boolean }>();
const store = useSearchStore();
const open = computed(() => store.state.open)
const onToggleSearch = (value: boolean) => {
  store.commit(SearchMutation.toggleSearchOpen, value)
}
</script>

<script  lang="ts">
import { defineComponent, computed, VueElement, } from 'vue'
import MenuHeader from "@/components/Menu.vue";
import CartButton from "@/components/buttons/CartButton.vue";
import { RouterPath } from "../router/router";
import { useSearchStore } from '@/store/store';
import { SearchMutation } from '@/store/modules/search/search.model';

export default defineComponent({
  name: 'HeaderComponent',
  components: {
    MenuHeader,
    CartButton,
  },
})
</script>

<style lang="scss">
@import "@/styles/vars.scss";

.header {
  display: flex;
  align-items: center;
  padding-bottom: 22px;
  padding-top: 22px;
  width: 100%;

  &__actions {
    display: flex;
    align-items: center;

    &-search {
      width: 32px;
      height: 32px;
      background-color: #fff;
      cursor: pointer;
      padding: 6px;
      border-radius: 32px;
      border: 2px solid #000;
      margin-right: 10px;

      &:hover {
        border: 2px solid #A25F4B;

        svg {
          fill: #A25F4B;
        }
      }

      svg {
        width: 100%;
        height: 100%;
      }
    }
  }

  &__body {
    display: flex;
    align-items: center;
  }

  &__fixed-offset {
    height: 78px;
  }

  &__fixed {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 3;
    background-color: #fff;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  }

  &__menu {
    order: 2;
    margin-left: 24px;

    @media (min-width: 996px) {
      order: 0;
      margin-left: 0px;
    }

  }

  &__toolbar {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;

    @media (min-width: 996px) {
      justify-content: space-between;
    }
  }
}
</style>
