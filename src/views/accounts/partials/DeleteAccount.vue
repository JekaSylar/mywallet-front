<script setup>
import {ref} from 'vue';
import { XCircleIcon } from '@heroicons/vue/24/solid/index.js';
import Modal from '@/components/Modal.vue'
import PrimaryButton from '@/components/PrimaryButton.vue';
import CloseButton from '@/components/CloseButton.vue';
import Loader from '@/components/Loader.vue'
import {useAccount} from '@/stores/accounts.js'
import useToast from '@/composables/useToast.js'

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

const store = useAccount();
const toast = useToast();

const openModal = ref(false);
const isLoader = ref(false);


const closeModal = () => {
  openModal.value = false;
}

const removeAccount = async () => {
  isLoader.value = true;
  try {
    await store.removeAccount(props.id);
    openModal.value = false;
    toast('Рахунок видаленно!');
    await store.loaderAccounts();
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
    class="fill-red-600 w-5 cursor-pointer" />
  <Modal
    :show="openModal"
    @close-modal="closeModal"
    :title="`Ви впевнені, що хочете видалити рахунок ${name}`"
  >
<div class="flex justify-between mt-10">
  <CloseButton @click="closeModal">Відміна</CloseButton>
  <PrimaryButton @click="removeAccount">
    <Loader v-if="isLoader" />
    <span v-else>Видалити</span>
  </PrimaryButton>
</div>
  </Modal>
</template>

<style scoped>

</style>
