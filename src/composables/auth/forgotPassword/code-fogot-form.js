import {  useField, useForm } from 'vee-validate';
import * as yup from "yup";
export function useCodeForgot() {
  const { handleSubmit, isSubmitting } = useForm();

  const {
    value: code,
    errorMessage: cError,
    handleBlur: cBlur,
  } = useField(
    "code",
    yup
      .number()
      .typeError('Має бути число')
      .required("Будь ласка, введіть код з пошти")
  );


  return {
    code,
    cError,
    cBlur,
    handleSubmit,
    isSubmitting,
  };
}
