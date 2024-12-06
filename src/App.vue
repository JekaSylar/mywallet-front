<script setup>
import {computed} from "vue";
import {RouterView, useRoute} from 'vue-router'
import MainLayout from "@/layouts/MainLayout.vue";
import AuthLayout from "@/layouts/AuthLayout.vue";

const route = useRoute();
const layout = computed(() =>
  route.meta.layout === 'auth' ? AuthLayout : MainLayout
);
</script>

<template>
  <component :is="layout" v-if="layout">
    <router-view></router-view>
  </component>
</template>

<style scoped>

</style>
