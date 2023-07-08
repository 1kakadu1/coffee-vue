import { createApp } from 'vue';
import { plugin, defaultConfig } from '@formkit/vue';
import '@formkit/themes/genesis';
import App from './App.vue';
import router from './router/router';
import ButtonBase from "@/components/buttons/ButtonBase.vue";
import InputBase from "@/components/inputs/InputBase.vue";
import TitleDecoration from "@/components/Title.vue";
import { store } from './store/store';
import { firebaseApp } from "./services/firebase";
import { VueFire, VueFireAuth } from 'vuefire';

const app = createApp(App).use(router).use(store).use(plugin, defaultConfig).use(VueFire, {
    firebaseApp,
    modules: [
        VueFireAuth(),
    ],
});

app.component("ButtonBase", ButtonBase);
app.component("InputBase", InputBase)
app.component("TitleDecoration", TitleDecoration)
app.mount('#app')