import { useField, useForm } from "vee-validate";
import * as yup from "yup";

export function useRegisterForm() {
  const { handleSubmit, isSubmitting } = useForm({
    validationSchema: yup.object({
      user: yup.object({
        name: yup
          .string()
          .trim()
          .required("Поле обов'язкове для заповнення"),
        email: yup
          .string()
          .trim()
          .required("Поле обов'язкове для заповнення")
          .email("Невірний формат email"),
        password: yup
          .string()
          .required("Поле обов'язкове для заповнення")
          .min(6, "Мінімальне значення пароля 6 симоволів"),
        password_confirmation: yup
          .string()
          .required("Поле обов'язкове для заповнення")
          .oneOf([yup.ref("password"), null], "Паролі не збігаються"),
      }),
    }),
  });

  const {
    value: name,
    errorMessage: nError,
    handleBlur: nBlur,
  } = useField("user.name");

  const {
    value: email,
    errorMessage: eError,
    handleBlur: eBlur,
  } = useField("user.email");

  const {
    value: password_confirmation,
    errorMessage: pcError,
    handleBlur: pcBlur,
  } = useField("user.password_confirmation");

  const {
    value: password,
    errorMessage: pError,
    handleBlur: pBlur,
  } = useField("user.password");



  return {
    handleSubmit,
    isSubmitting,
    name,
    nError,
    nBlur,
    email,
    eError,
    eBlur,
    password,
    pError,
    pBlur,
    password_confirmation,
    pcError,
    pcBlur,
  };
}
