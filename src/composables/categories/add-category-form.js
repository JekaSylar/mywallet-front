import {  useField, useForm } from 'vee-validate';
import * as yup from "yup";


export function useAddCategoryForm() {
  const { handleSubmit, isSubmitting } = useForm();

  const {
    value: name,
    errorMessage: nError,
    handleBlur: nBlur,
  } = useField(
    "name",
    yup
      .string()
      .trim()
      .required("Будь ласка, введіть назву")
  );






  return {
    name,
    nError,
    nBlur,
    handleSubmit,
    isSubmitting,
  };
}
