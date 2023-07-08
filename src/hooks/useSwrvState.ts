import { type Ref, ref, watchEffect } from 'vue'

const STATES = {
    VALIDATING: 'VALIDATING',
    PENDING: 'PENDING',
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR',
    STALE_IF_ERROR: 'STALE_IF_ERROR',
} as const;

export default function <T>(data: Ref<T | undefined>, error: Ref<any>, isValidating: Ref<boolean>) {
    const state = ref('idle');
    const isLoading = ref(false);

    watchEffect(() => {
        if (data.value && isValidating.value) {
            isLoading.value = true;
            state.value = STATES.VALIDATING
            return
        }
        if (data.value && error.value) {
            state.value = STATES.STALE_IF_ERROR
            return
        }
        if (data.value === undefined && !error.value) {
            isLoading.value = true;
            state.value = STATES.PENDING
            return
        }
        if (data.value && !error.value) {
            isLoading.value = false;
            state.value = STATES.SUCCESS
            return
        }
        if (data.value === undefined && error) {
            isLoading.value = false;
            state.value = STATES.ERROR
            return
        }
    })

    return {
        state,
        STATES,
        isLoading,
    }
}