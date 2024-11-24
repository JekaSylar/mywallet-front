<script setup>
defineProps( {
  value: String,
})
</script>

<template>
  <label class="block text-md font-bold leading-6 text-gray-900 dark:text-white">
    <span v-if="value">{{ value }}</span>
    <span v-else><slot /></span>
  </label>
</template>
