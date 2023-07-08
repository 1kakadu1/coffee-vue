<template>
  <section class="menu-container">
    <div class="menu-box" :class="{ active: open }">
      <div class="menu">
        <ul class="menu-list">
          <li class="menu-offset"></li>
          <li class="menu-list__item" v-for="item in link" :key="item.href">
            <router-link class="link" :to="item.href">{{ item.label }}</router-link>
          </li>
        </ul>
      </div>


      <div class="menu__actions">

      </div>

      <div class="menu__image-mobile">
        <img :src="bgMenu" alt="">
      </div>
    </div>

    <div class="menu__actions-mobile">
      <ButtonBurger :open="open" :onToggle="onToggle" />
    </div>
  </section>
</template>

<script setup  lang="ts">
import bgMenu from "@/assets/img/bg-menu.png";
export interface ILinkItem {
  href: RouterPath,
  label: string,
  icon?: VueElement,
}
defineProps<{ link: ILinkItem[] }>()
</script>

<script  lang="ts">
import { defineComponent, VueElement } from 'vue';
import ButtonBurger from "@/components/buttons/ButtonBurger.vue";
import { RouterPath } from "../router/router";

export default defineComponent({
  name: 'MenuComponent',
  components: {
    ButtonBurger,
  },
  data() {
    return {
      open: false
    }
  },
  methods: {
    onToggle: function (value: boolean) {
      this.open = value
    }
  },
})
</script>

<style lang="scss">
@import "../styles/vars.scss";

.menu-container {
  display: flex;
  align-items: center;
}

.menu-box {
  display: block;
  width: 100%;
  position: fixed;
  top: 76px;
  left: 0px;
  height: calc(100vh - 30px);
  width: 100%;
  background-color: $write;
  z-index: -1;
  visibility: hidden;
  transform: translateY(-60px);
  transition: all 300ms ease-in;
  opacity: 0;

  &.active {
    z-index: 4;
    visibility: visible;
    transform: translateY(0px);
    opacity: 1;
  }

  @media screen and (min-width: 996px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 1;
    visibility: visible;
    position: static;
    left: unset;
    top: unset;
    height: auto;
    width: 100%;
    transform: translateY(0px);
    opacity: 1;
  }
}

.menu__actions {
  &-mobile {
    align-items: center;
    display: flex;
    flex-grow: 1;
    width: 100%;
    justify-content: flex-end;

    @media screen and (min-width: 996px) {
      display: none;
    }
  }
}

.menu-list {
  display: flex;
  flex-direction: column;

  &__item {
    margin-left: 30px;
    padding-top: 12px;
    padding-bottom: 12px;
    font-size: 22px;
    line-height: 18px;
    letter-spacing: 2px;
    text-transform: uppercase;

    @media screen and (min-width: 996px) {
      @include adaptive-var("font-size", 14, 12, 1);
      padding-top: 6px;
      padding-bottom: 6px;

      &:nth-child(2) {
        margin-left: 0px;
      }
    }
  }

  @media screen and (min-width: 996px) {
    flex-direction: row;
  }
}

.menu {
  &-offset {
    padding-top: 10px;
    @include adaptive-var("padding-left", 77, 8, 1);
  }

  &__image-mobile {
    position: absolute;
    z-index: 2;
    width: 320px;
    height: 440px;
    bottom: 0px;
    right: 0px;

    &>img {
      width: 100%;
      height: 100%;
    }

    @media screen and (min-width: 996px) {
      display: none;
    }
  }
}
</style>
