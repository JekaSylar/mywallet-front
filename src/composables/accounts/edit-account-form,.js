import {  useField, useForm } from 'vee-validate';
import * as yup from "yup";


export function useEditAccountForm(account) {
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

  const {
    value: balance,
    errorMessage: bError,
    handleBlur: bBlur,
  } = useField(
    "balance",
    yup
      .number()
      .typeError('Має бути число')
      .min(0, 'Минимальне може меньше  0')
      .default(0)
      .required("Будь ласка, введіть баланс"),
    { initialValue: 0 }
  );

  name.value = account.name;
  balance.value = account.balance;



  return {
    name,
    nError,
    nBlur,
    balance,
    bError,
    bBlur,
    handleSubmit,
    isSubmitting,
  };
}
