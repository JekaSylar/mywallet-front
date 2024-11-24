<script setup>
defineProps({

});
</script>

<template>
  <button
    class="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
    <slot />
  </button>

</template>

<style scoped>

</style>
