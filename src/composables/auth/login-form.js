import {  useField, useForm } from 'vee-validate';
import * as yup from "yup";


export function useLoginForm() {
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


  const MIN_LENGTH = 6;

  const {
    value: password,
    errorMessage: pError,
    handleBlur: pBlur,
  } = useField(
    "password",
    yup
      .string()
      .trim()
      .required("Будь ласка, введіть пароль")
      .min(
        MIN_LENGTH,
        `Пароль не може бути меншим за ${MIN_LENGTH} символів`
      )
  );



  return {
    email,
    eError,
    eBlur,
    password,
    pError,
    pBlur,
    handleSubmit,
    isSubmitting,
  };
}
