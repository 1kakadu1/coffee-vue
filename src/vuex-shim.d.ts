import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'
import { IState } from "@/store/store";

declare module '@vue/runtime-core' {
    // Declare your own store states.
    interface ComponentCustomProperties {
        $store: Store<IState>
    }
}