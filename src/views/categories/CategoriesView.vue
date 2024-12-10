<script setup>
import Title from '@/components/Title.vue'
import Breadcrumb from '@/components/Breadcrumb.vue';
import ListCategories from '@/views/categories/partials/ListCategories.vue'
import AddCategory from '@/views/categories/partials/AddCategory.vue'



const pages = [
  { name: 'Категорії', href: '#', current: true },
];



</script>

<template>



  <Title title="Категорії" />
  <Breadcrumb :pages />
  <div class="flex flex-col md:flex-row mt-8">
    <div class="w-full md:w-2/5 md:pr-4">
      <AddCategory />
    </div>
    <div class="w-full md:w-3/5 md:pl-4">
      <ListCategories  />

    </div>
  </div>

</template>


