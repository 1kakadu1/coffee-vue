<template>
  <footer class="footer">
    <div class="container">
      <div class="row">
        <div class="col-sm-6 col-lg-6 col-xl-4 footer__col-full footer_pb-20">
          <div class="footer__wrap-info">
            <div class="footer__logo">
              <img :src="logo" alt="logo">
            </div>
            <div class="footer__desc g-typography-desc">
              Предлагая лучший кофе в мире с 1996 года. От кофейных гиков до настоящих ценителей.
            </div>
          </div>

          <div class="footer__copyright">
            CoffeeStyle Inc. © 1996
          </div>
        </div>
        <!-- <div class="col-6 col-xl-2 footer_pb-20">
          <div class="footer__name">
            Menu
          </div>
          <ul class="menu-list footer__menu">
            <li class="menu-list__item footer__menu-item" v-for="item in menu" :key="item.href">
              <a :href="item.href" class="link">
                {{ item.label }}
              </a>
            </li>
          </ul>
        </div> -->
        <div class="row col-sm-6 col-lg-6 col-xl-8 row__end">
          <div class="col-6 col-xl-4 footer_pb-20">
            <div class="footer__name">
              Соцсети
            </div>
            <ul class="menu-list footer__menu">
              <li class="menu-list__item footer__menu-item" v-for="item in socials" :key="item.href">
                <a :href="item.href" class="link">
                  {{ item.label }}
                </a>
              </li>
            </ul>
          </div>
          <div class="col-sm-6 col-lg-6 col-xl-4 footer_pb-20 footer_order-2">
            <div class="footer__wrap-info">
              <div class="footer__name">
                Контакты
              </div>
              <div class="footer__desc g-typography-desc">
                Мы всегда рады помочь
              </div>
              <a href="mailto:example@mail.ru" class="footer__email g-typography-title">
                us@coffeestyle.io
              </a>
            </div>

          </div>
        </div>

      </div>
    </div>
  </footer>
</template>


<script setup  lang="ts">
import { SOCIALS } from "@/const/socials";

const socials = SOCIALS;
defineProps<{ logo: string }>()
</script>
<script  lang="ts">
import { defineComponent, defineProps, } from 'vue'

export default defineComponent({
  name: 'FooterComponent',
})
</script>

<style lang="scss">
.row__end {
  justify-content: flex-end;
  flex-direction: column;

  @media (min-width: 992px) {
    flex-direction: row;
  }
}

.footer {
  display: flex;
  align-items: center;
  padding-bottom: 0px;
  // margin-top: 40px;
  background-color: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  padding-top: 40px;

  &__menu {
    @media screen and (min-width: 996px) {
      &.menu-list {
        flex-direction: column;
      }
    }

    &-item {
      margin-left: 0px;
      font-size: 14px;
    }
  }

  &__logo {
    padding-bottom: 22px;

    &>img {
      max-width: 112px;
    }
  }

  &__desc {
    font-size: 14px;
  }

  &__copyright {
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    color: rgba(29, 31, 46, 0.3);
  }

  &__col-full {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    order: 1;

    @media screen and (min-width: 1200px) {
      order: 0;
    }
  }

  &__email {
    display: block;
    text-decoration: none;
    padding: 16px 0px;
  }

  &__name {
    font-size: 18px;
    line-height: 18px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #1D1F2E;
    padding-bottom: 22px;
    font-weight: bold;
  }

  &_pb-20 {
    padding-bottom: 20px;
  }

  &_order-2 {
    order: 2;

    @media screen and (min-width: 1200px) {
      order: 0;
    }
  }
}
</style>
