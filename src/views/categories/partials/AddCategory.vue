<script setup>
import PrimaryButton from '@/components/PrimaryButton.vue';
import InputText from '@/components/InputText.vue'
import InputLabel from '@/components/InputLabel.vue'
import InputError from '@/components/InputError.vue'
import Loader from '@/components/Loader.vue'
import {useCategory} from '@/stores/category.js'
import { ref } from 'vue'
import useToast from '@/composables/useToast.js'
import { useAddAccountForm } from '@/composables/accounts/add-account-form..js'

const store = useCategory();

const  isLoader = ref(false);

const toast = useToast();

const  {
  name,
  nError,
  nBlur,
  handleSubmit,
  isSubmitting } = useAddAccountForm();


const onSubmit = handleSubmit(async () => {
  isLoader.value = true;
  try {
    await store.addCategory(name.value);
    toast('Категорію створенно');
    await store.loaderCategories();
  } catch(error) {
    console.error(error);
  } finally {
    isLoader.value = false;
  }
});

</script>

<template>
  <div class="space-y-6 mb-4 flex flex-col w-full" >
    <div>
      <InputLabel value="Назва"   />
      <div class="mt-2">
        <InputText  type="text" v-model="name"  :error="!!nError" @blur="nBlur"  />
      </div>
      <InputError v-if="nError"  :message="nError"  />

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
    </div>




  </div>
</template>


