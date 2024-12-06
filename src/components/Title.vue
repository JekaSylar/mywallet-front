<script setup>
defineProps({
  title: {
    required: true,
    type: String
  }
});
</script>

<template>
  <h1 class="mb-6 text-xl font-bold text-gray-800 dark:text-white">{{ title }}</h1>
</template>

<style scoped>

</style>
