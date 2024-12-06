import { useField, useForm } from "vee-validate";
import * as yup from "yup";

export function useEditPasswordForm() {
  const { handleSubmit, isSubmitting } = useForm({
    validationSchema: yup.object({
      user: yup.object({
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
    password,
    pError,
    pBlur,
    password_confirmation,
    pcError,
    pcBlur,
  };
}
