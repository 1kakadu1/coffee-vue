import ButtonBase from "@/components/buttons/ButtonBase.vue";
import InputBase from "@/components/inputs/InputBase.vue";
import TextareaBase from "@/components/inputs/TextareaBase.vue";
import TitleDecoration from "@/components/Title.vue"
// import { Store } from "@/store/store";

declare module '@vue/runtime-core' {
    // interface ComponentCustomProperties {
    //     $store: Store
    // }
    export interface GlobalComponents {
        InputBase: typeof InputBase,
        ButtonBase: typeof ButtonBase,
        TitleDecoration: typeof TitleDecoration,
        TextareaBase: typeof TextareaBase,
    }
}