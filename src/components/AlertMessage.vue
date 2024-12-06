<script setup>
import {computed} from 'vue'
import {useFlashMessage} from '@/stores/flashMessage.js'
import { XMarkIcon, } from '@heroicons/vue/20/solid'


const store = useFlashMessage();

const status = computed(() => store.flashMessage.status === 'success');
const closeAlert = () => {
store.clearFlashMessage();
}
</script>

<template>
  <div :class="{'bg-green-50': status, 'bg-red-600': !status}" class="rounded-md  p-4 my-4" v-if="store.flashMessage.message">
    <div class="flex">

      <div class="ml-3">
        <p :class="{'text-green-800': status, 'text-white': !status}"
           class="text-sm font-medium text-center">
          {{ store.flashMessage.message }}
        </p>
      </div>
      <div class="ml-auto pl-3">
        <div class="-mx-1.5 -my-1.5">
          <button @click="closeAlert"
                  type="button"
                  :class="{'bg-green-50 hover:bg-green-100 focus:ring-green-600  focus:ring-offset-green-50 text-green-500' : status,
                  'bg-red-500 hover:bg-red-500 focus:ring-red-800  focus:ring-offset-red-100 text-white': !status}"
                  class="inline-flex rounded-md  p-1.5   focus:outline-none focus:ring-2  focus:ring-offset-2">
            <span class="sr-only">Dismiss</span>
            <XMarkIcon class="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
