<template>
  <router-view />
  <notifications position="bottom left" />
</template>

<script setup  lang="ts">

import { onMounted } from 'vue'
import { useCartStore } from './store';

onMounted(() => {
  const state = useCartStore();
  state.getCartProducts();
})

</script>

<style lang="scss">
@import './styles/reset.scss';
@import './styles/grid-bootstrap-5/index.scss';
@import "./styles/vars.scss";
@import './styles/global.scss';

@font-face {
  font-family: "Karla";
  src: local("Karla"),
    url(./assets/fonts/Karla-Regular.ttf) format("truetype");
}

@font-face {
  font-family: "Montserrat";
  font-weight: 400;
  src: local("Montserrat"),
    url(./assets/fonts/montserrat/Montserrat-Regular.ttf) format("truetype");
}

@font-face {
  font-family: "Montserrat";
  font-weight: bold;
  src: local("Montserrat"),
    url(./assets/fonts/montserrat/Montserrat-Bold.ttf) format("truetype");
}

// @font-face {
//   font-family: "Montserrat";
//   font-weight: bold;
//   src: local("Montserrat"),
//     url(./assets/fonts/montserrat/Montserrat-Bold.ttf) format("truetype");
// }

@font-face {
  font-family: "Montserrat";
  font-weight: 500;
  src: local("Montserrat"),
    url(./assets/fonts/montserrat/Montserrat-Medium.ttf) format("truetype");
}


body {
  font-family: "Montserrat";
  color: $black;
  background-color: #F5F5F5;
}
</style>