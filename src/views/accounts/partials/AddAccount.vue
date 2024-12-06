<script setup>
import {ref} from 'vue';
import {useAccount} from '@/stores/accounts.js'
import PrimaryButton from '@/components/PrimaryButton.vue';
import Modal from '@/components/Modal.vue'
import Loader from '@/components/Loader.vue'
import InputText from '@/components/InputText.vue'
import InputLabel from '@/components/InputLabel.vue'
import InputError from '@/components/InputError.vue'
import Select from '@/components/Select.vue'
import {useAddAccountForm} from '@/composables/accounts/add-account-form..js'
import  {getCurrencyOptions} from '../../../../utils/currency'
import CloseButton from '@/components/CloseButton.vue';
import useToast from '@/composables/useToast.js'

const store = useAccount();
const openModal = ref(false);
const  isLoader = ref(false);

const toast = useToast();

const  {
  name,
  nError,
  nBlur,
  balance,
  bError,
  bBlur,
  handleSubmit,
  isSubmitting } = useAddAccountForm();

const currencyOptions = getCurrencyOptions();

const currency = ref(currencyOptions[0].currency);

const selectedCurrency = value => currency.value = value.value;


const onSubmit = handleSubmit(async () => {
  isLoader.value = true;
  try {
    await store.addAccounts(name.value, balance.value, currency.value);
    openModal.value = false;
    toast('Рахунок створенно');
   await store.loaderAccounts();
  } catch(error) {
    console.error(error);
  } finally {
    isLoader.value = false;
  }
});

</script>

<template>
<div class="my-8 ">
  <PrimaryButton class="w-24" @click="openModal = true">
    Додати
  </PrimaryButton>
</div>

  <Modal
    :show="openModal"
    title="Додати рахунок"
    @close-modal="openModal = false"
  >
    <div class="space-y-6 mb-4 flex flex-col w-full" >
      <div>
        <InputLabel value="Назва"   />
        <div class="mt-2">
          <InputText  type="text" v-model="name"  :error="!!nError" @blur="nBlur"  />
        </div>
        <InputError v-if="nError"  :message="nError"  />

      </div>

      <div>
        <InputLabel value="Баланс"   />
        <div class="mt-2">
          <InputText  type="number" min="0"  v-model="balance"  :error="!!bError" @blur="bBlur"  />
        </div>
        <InputError v-if="bError"  :message="bError"  />

      </div>

      <div>
        <InputLabel value="Валюта"   />
        <div class="mt-2">
          <Select :options="currencyOptions"  :searchable="true" :current="currencyOptions[0]" @item-selected="selectedCurrency" />
        </div>

      </div>

      <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <PrimaryButton
          @click="onSubmit"
          :disabled="isSubmitting"
          class="inline-flex w-28 ml-4"
        >
          <Loader v-if="isLoader" />
          <span v-else>Додати</span>

        </PrimaryButton>
        <CloseButton
          @click="openModal = false"
        >
          Відміна
        </CloseButton>
      </div>




    </div>
  </Modal>
</template>

<style scoped>

</style>
