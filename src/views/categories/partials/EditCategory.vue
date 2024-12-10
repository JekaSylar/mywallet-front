<script setup>
import { PencilSquareIcon } from '@heroicons/vue/24/solid/index.js'
import { ref } from 'vue'
import Loader from '@/components/Loader.vue'
import {useCategory} from '@/stores/category.js'
import useToast from '@/composables/useToast.js'
import PrimaryButton from '@/components/PrimaryButton.vue'
import CloseButton from '@/components/CloseButton.vue'
import InputText from '@/components/InputText.vue'
import InputLabel from '@/components/InputLabel.vue'
import Select from '@/components/Select.vue'
import Modal from '@/components/Modal.vue'
import InputError from '@/components/InputError.vue'
import { useEditAccountForm } from '@/composables/accounts/edit-account-form,.js'

const props = defineProps({
  category: {
    required: true,
    type: Object
  }
});

const store = useCategory();
const toast = useToast();

const openModal = ref(false);
const isLoader = ref(false);
const closeModal = () => {
  openModal.value = false
}

const  {
  name,
  nError,
  nBlur,
  handleSubmit,
  isSubmitting } = useEditAccountForm(props.category);

const onSubmit = handleSubmit(async () => {
  isLoader.value = true;
  try {
    await store.updateCategory(props.category.id, {
      name: name.value,
    });
    openModal.value = false;
    toast('Категорію зміненно');
    await store.loaderCategories();
  } catch(error) {
    console.error(error);
  } finally {
    isLoader.value = false;
  }
});

</script>

<template>
  <PencilSquareIcon @click="openModal = true" class="fill-blue-600 w-5 cursor-pointer" />

  <Modal @close-modal="closeModal" :show="openModal" :title="`Редагувати ${category.name}`">
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
