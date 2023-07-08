// import { Store } from "@/store/store";
// import ButtonBase from "@/components/buttons/ButtonBase.vue";
// import InputBase from "@/components/inputs/InputBase.vue";
// import TitleDecoration from "@/components/Title.vue"
/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// declare module '@vue/runtime-core' {
//   interface ComponentCustomProperties {
//     $store: Store;
//   }
//   export interface GlobalComponents {
//     InputBase: typeof InputBase,
//     ButtonBase: typeof ButtonBase,
//     TitleDecoration: typeof TitleDecoration
//   }
// }