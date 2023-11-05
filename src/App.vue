<template>
  <router-view />
</template>

<script setup  lang="ts">
import { api } from './services/api';
import { CartActions } from './store/modules/cart/cart.model';
import { useCartStore } from './store/store';
import { onMounted } from 'vue'

onMounted(()=>{
  const state = useCartStore();
  state.dispatch(CartActions.get);
  function requestPermission() {
    console.log('Requesting permission...');
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.')
        api.getTokenPush("8072023");
      }})};

  requestPermission();
  
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