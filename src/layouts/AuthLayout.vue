<script setup>
import {RouterView, RouterLink} from 'vue-router'

</script>

<template>
  <div class="max-w-full h-screen dark:bg-slate-800">
    <div class="flex min-h-full  items-center flex-1 flex-col justify-center  px-6 py-12 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm flex justify-center">
        <router-link :to="{name: 'home'}" class="text-center font-spicy-rice text-7xl text-green-600">MyWallet</router-link>
      </div>

      <router-view></router-view>
    </div>
  </div>

</template>

<style scoped>

</style>
