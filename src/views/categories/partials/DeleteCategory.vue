<script setup>
import PrimaryButton from '@/components/PrimaryButton.vue'
import { XCircleIcon } from '@heroicons/vue/24/solid/index.js'
import CloseButton from '@/components/CloseButton.vue'
import Loader from '@/components/Loader.vue'
import Modal from '@/components/Modal.vue'
import { useCategory } from '@/stores/category.js'
import useToast from '@/composables/useToast.js'
import { ref } from 'vue'

const props = defineProps({
  id: {
    required: true,
    type: Number
  },
  name: {
    required: true,
    type: String
  }
});

const store = useCategory();

const toast = useToast();

const openModal = ref(false);
const isLoader = ref(false);

const closeModal = () => {
  openModal.value = false;
}

const deleteCategory = async () => {
  isLoader.value = true;
  try {
    await store.removeCategory(props.id);
    openModal.value = false;
    toast('Категорію видаленно!');
    await store.loaderCategories();
  } catch(error) {
    console.error(error);
  } finally {
    isLoader.value = false;
  }
}
</script>

<template>
  <XCircleIcon
    @click="openModal = true"
    class="fill-red-600 w-5 cursor-pointer flex justify-end" />
  <Modal
    :show="openModal"
    @close-modal="closeModal"

    :title="`Видалити категорію ${name}`"
  >
    <div class="flex justify-between mt-10">
      <CloseButton @click="closeModal">Відміна</CloseButton>
      <PrimaryButton @click="deleteCategory">
        <Loader v-if="isLoader" />
        <span v-else>Видалити</span>
      </PrimaryButton>
    </div>
  </Modal>
</template>

<style scoped>

</style>
