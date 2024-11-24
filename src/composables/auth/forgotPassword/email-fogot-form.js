import {  useField, useForm } from 'vee-validate';
import * as yup from "yup";
export function useEmailForgot() {
  const { handleSubmit, isSubmitting } = useForm();

  const {
    value: email,
    errorMessage: eError,
    handleBlur: eBlur,
  } = useField(
    "email",
    yup
      .string()
      .trim()
      .required("Будь ласка, введіть Email")
      .email("Невірний формат email")
  );


  return {
    email,
    eError,
    eBlur,
    handleSubmit,
    isSubmitting,
  };
}
