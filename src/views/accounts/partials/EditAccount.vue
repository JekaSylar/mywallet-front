<script setup>
import {ref} from 'vue';
import { PencilSquareIcon } from '@heroicons/vue/24/solid/index.js';
import {useAccount} from '@/stores/accounts.js'
import useToast from '@/composables/useToast.js'
import Modal from '@/components/Modal.vue';
import {useEditAccountForm} from '@/composables/accounts/edit-account-form,.js'
import Loader from '@/components/Loader.vue'
import PrimaryButton from '@/components/PrimaryButton.vue'
import CloseButton from '@/components/CloseButton.vue'
import InputError from '@/components/InputError.vue'
import InputLabel from '@/components/InputLabel.vue'
import InputText from '@/components/InputText.vue'
import Select from '@/components/Select.vue'
import  {getCurrencyOptions} from '../../../../utils/currency'


const props = defineProps({
  account: {
    required: true,
    type: Object
  }
});

const store = useAccount();
const toast = useToast();

const openModal = ref(false);
const isLoader = ref(false);

const currency = ref(props.account.currency);
const currencyOptions = getCurrencyOptions();
const selectedCurrency = (value) => currency.value = value.value;



const  {
  name,
  nError,
  nBlur,
  balance,
  bError,
  bBlur,
  handleSubmit,
  isSubmitting } = useEditAccountForm(props.account);

const closeModal = () => {
  openModal.value = false
}

const onSubmit = handleSubmit(async () => {
  isLoader.value = true;
  try {
    await store.updateAccount(props.account.id, {
      name: name.value,
      balance: balance.value,
      currency: currency.value
    });
    openModal.value = false;
    toast('Рахунок зміненно');
    await store.loaderAccounts();
  } catch(error) {
    console.error(error);
  } finally {
    isLoader.value = false;
  }
});

</script>

<template>
  <PencilSquareIcon @click="openModal = true" class="fill-blue-600 w-5 cursor-pointer" />
  <Modal @close-modal="closeModal" :show="openModal" :title="`Редагувати ${account.name}`">
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
         <Select :options="currencyOptions"  :searchable="true" :current="currency" @item-selected="selectedCurrency" />
        </div>

      </div>

      <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <PrimaryButton
          @click="onSubmit"
          :disabled="isSubmitting"
          class="inline-flex w-28 ml-4"
        >
          <Loader v-if="isLoader" />
          <span v-else>Змінти</span>

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
