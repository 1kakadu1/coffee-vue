import { ref, watch } from "vue";

export default function useInput(args?: {
  initValue?: string,
  validation?: (value: string) => string | undefined;
}) {
  const { initValue = "", validation } = args || {};
  const value = ref(initValue);
  const error = ref<string | undefined>(undefined);
  const touch = ref(false);

  const setTouchField = (value: boolean) => {
    touch.value = value;
  }

  const onFocusField = () => {
    setTouchField(true);
  }

  const onChangeField = (e: Event) => {
    value.value = (e.target as HTMLInputElement).value;
  }

  const onChangeError = (value?: string) => {
    error.value = value;
  }

  const checkValidation = (): string | undefined => {
    if (validation) {
      const errorMsg = validation(value.value);
      onChangeError(errorMsg);
      return errorMsg;
    }

  }

  const onResetField = (val?: string) => {
    value.value = val || initValue;
    touch.value = true;
    error.value = undefined;
  }

  watch(value, (newQuestion, oldQuestion) => {
    if (newQuestion !== oldQuestion && validation) {
      const errorMsg = validation(newQuestion);
      onChangeError(errorMsg);
    }
  })



  return { value, onChangeField, error, onChangeError, onFocusField, setTouchField, checkValidation, onResetField };
}