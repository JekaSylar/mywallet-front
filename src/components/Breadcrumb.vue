<script setup>
import { ChevronRightIcon, HomeIcon } from '@heroicons/vue/20/solid/index.js';

defineProps({
  pages: {
    required: true,
    type: Array
  }
});
</script>

<template>
  <nav class="flex" aria-label="Breadcrumb">
    <ol role="list" class="flex items-center space-x-4">
      <li>
        <div>
          <router-link :to="{name: 'home'}" class="text-gray-400 hover:text-gray-500 dark:text-white">
            <HomeIcon class="size-5 shrink-0" aria-hidden="true" />
            <span class="sr-only">Home</span>
          </router-link>
        </div>
      </li>
      <li v-for="page in pages" :key="page.name">
        <div class="flex items-center">
          <ChevronRightIcon class="size-5 shrink-0 text-gray-400 dark:text-white" aria-hidden="true" />
          <router-link :to="page.href" class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-white" :aria-current="page.current ? 'page' : undefined">{{ page.name }}</router-link>
        </div>
      </li>
    </ol>
  </nav>
</template>

<style scoped>

</style>
