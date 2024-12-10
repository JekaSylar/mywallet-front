import {  useField, useForm } from 'vee-validate';
import * as yup from "yup";


export function useEditCategoryForm(category) {
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



  name.value = category.name;




  return {
    name,
    nError,
    nBlur,
    handleSubmit,
    isSubmitting,
  };
}
