<script setup>
import { onMounted, ref } from 'vue';


defineProps({
  error: {
    type: Boolean,
    default: false,
  }
});

const model = defineModel();
const input = ref(null);


onMounted(() => {
  if (input.value.hasAttribute('autofocus')) {
    input.value.focus();
  }
});

defineExpose({ focus: () => input.value.focus() });
</script>

<template>
  <input
    ref="input"
    v-model="model"
    :class="{'focus:ring-red-600 ring-red-600 ring-2': error, 'focus:ring-green-600': !error}"
    class="block w-full rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6" />
</template>

<style scoped>

</style>
