import { ref, customRef } from 'vue'

const debounce = (fn: any, delay = 0, immediate = false) => {
    let timeout: NodeJS.Timeout;
    return (...args: any) => {
        if (immediate && !timeout) fn(...args)
        clearTimeout(timeout)

        timeout = setTimeout(() => {
            fn(...args)
        }, delay)
    }
}

const useDebouncedRef = <T>(initialValue: T, delay: number, immediate?: any) => {
    const state = ref(initialValue)
    const debouncedRef = customRef((track, trigger) => ({
        get() {
            track()
            return state.value
        },
        set: debounce(
            (value: any) => {
                state.value = value
                trigger()
            },
            delay,
            immediate
        ),
    }))
    return debouncedRef
}

export default useDebouncedRef