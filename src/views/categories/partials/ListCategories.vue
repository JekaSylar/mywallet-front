<script setup>
import { onMounted } from 'vue'
import { useCategory } from '@/stores/category.js'
import { storeToRefs } from 'pinia'
import { TailwindPagination } from 'laravel-vue-pagination';
import DeleteCategory from '@/views/categories/partials/DeleteCategory.vue'
import EditCategory from '@/views/categories/partials/EditCategory.vue'

const store = useCategory();




const { categories } = storeToRefs(store);

const getResults = async (page = 1) => {
  await store.loaderCategories(page);
};

onMounted(async () => {
  await store.loaderCategories();
});


</script>

<template>

  <div class="px-4  sm:px-6 lg:px-8">
    <div class=" flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table class="min-w-full divide-y divide-gray-300">
            <thead>
            <tr>
              <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Назва</th>
              <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0">
                <span class="sr-only">Edit</span>
              </th>

            </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
            <tr v-for="category in categories.data" :key="category.id">
              <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0 dark:text-white">{{ category.name }}</td>

              <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                <span class="flex flex-row justify-end">
                <EditCategory :category="category" />
               <DeleteCategory :id="category.id" :name="category.name" />
                </span>

              </td>

            </tr>

            </tbody>
          </table>
          <div class="h-full">

          <div class="flex justify-end items-stretch content-end mt-5">
          <TailwindPagination
            :data="categories"
            @pagination-change-page="getResults"
          />
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>
