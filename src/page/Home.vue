<template>
  <PageLayout>
    <div class="container--fluid">
      <section class="section-slider">
        <SliderHome :items='[
          {
            link: {
              href: "#",
              label: "Смотреть все продукты"
            },
            title: "Кофейные кружки",
            description: "Самая универсальная мебельная система, когда-либо созданная. Разработанный, чтобы соответствовать вашей жизни, созданный для того, чтобы двигаться и расти.",
            image: assets.slide_1_prview,
            subTitle: "Лучшее место для покупки дизайна",
            video: assets.slide_video
          },
          {
            title: "О нас",
            description: "Мы маленькая Франция в самом сердце вашего города. Мы варим кофе и дарим хорошее настроение. К нам приходят завтракать, обедать и ужинать, общаться с друзьями и коллегами",
            subTitle: "Приходи к нам",
            image: assets.slide_2_prview,
            animate: true,
          },
          {
            title: "КОФЕ В ПОДАРОК",
            description: "Купите любую пачку нашего зернового кофе (200 г или 1 кг) — и получите чашечку любимого напитка в подарок.",
            image: assets.slide_3_prview,
            animate: true,
          },
        ]' />
      </section>
      <section-text link="12" title="Мы готовимиз высококачественных зёрен, которые отбираем сами."
        description="Сейчас мы сеть успешных кофеен, которая продолжает открывать свои двери в других городах. Мы рады видеть каждого из вас, чтобы поделиться дружелюбной атмосферой, а, главное, вкусным кофе!" />

      <section-products :products="specials" title="Топ 3 продаж" cardSize="full"
        :column="['col-12', 'col-md-6', 'col-xl-4']" />

      <section-products :products="products" title="Еще больше напитков" cardSize="small"
        :column="['col-12', 'col-md-6', 'col-lg-4']" />

      <section-call sectioonTitle="Будь в курсе последних событий"
        :images="[
          assets.slide_1_prview, 
          assets.slide_2_prview,
          assets.slide_3_prview,
        ]"
        description="Следите за последними новостями в нашем блоге и будьте в курсе последних событий!" title="Это блог?"
        label="Читать" subTitle="Premium" />

      <section-subscribe />
    </div>
  </PageLayout>
</template>
<script  lang="ts">

import slide_1_prview from "@/assets/img/slider/slide-1.jpg"
import slide_2_prview from "@/assets/img/slider/slide-2.jpg"
import slide_3_prview from "@/assets/img/slider/slide-3.jpg"
import slide_video from "@/assets/video/v-720.mp4"

import { computed, defineComponent, onMounted } from 'vue'
import PageLayout from "@/components/layouts/page.layout.vue";
import SliderHome from "../components/SwiperFull.vue";
import SectionText from "@/components/sections/SectionText.vue";
import SectionProducts from "@/components/sections/SectionProducts.vue";
import SectionCall from "@/components/sections/SectionCall.vue";
import SectionSubscribe from "@/components/sections/SectionSubscribe.vue";
import { useHomeStore, useStore } from "@/store/store";
import { HomeActions } from "@/store/modules/home/home.model"

export default defineComponent({
  name: 'HomePage',
  components: {
    PageLayout,
    SliderHome,
    SectionText,
    SectionProducts,
    SectionCall,
    SectionSubscribe,
  },
  setup() {
    const store = useStore();
    const homeStore = useHomeStore();
    const isLoadingProducts = computed(() => store.state.home.productsState.isLoading);
    const products = computed(() => store.state.home.productsState.products);
    const specials = computed(() => store.state.home.productsState.special);
    const assets = computed(()=>(
      {
        slide_1_prview,
        slide_2_prview,
        slide_3_prview,
        slide_video
      }
    ))

    onMounted(() => {
      if (homeStore.state.productsState.products.length === 0) {
        homeStore.dispatch(HomeActions.fetch);
      }
    });
    return {
      products,
      isLoadingProducts,
      specials,
      assets,
    }
  },
})
</script>

<style lang="scss">
.section-slider {
  padding-bottom: 120px;
}
</style>

