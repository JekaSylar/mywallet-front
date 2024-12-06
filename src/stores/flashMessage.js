import { ref } from 'vue'
import { defineStore } from 'pinia';

export const useFlashMessage = defineStore('message', () => {

  const flashMessage = ref({
    message: null,
    status: null,
  });


  const clearFlashMessage = () => {
    flashMessage.value.status = null;
    flashMessage.value.message = null;
  }

  const setFlashMessage = (status, message) => {

    flashMessage.value.status = status;
    flashMessage.value.message = message;

  }

return { flashMessage, clearFlashMessage, setFlashMessage };
});
