<script setup>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {faGoogle} from "@fortawesome/free-brands-svg-icons";



const linkGoogleAuth = import.meta.env.VITE_URL_API + 'google/redirect';
</script>

<template>
  <a :href="linkGoogleAuth"
    class="flex justify-center items-center cursor-pointer w-full bg-slate-200 h-9 rounded-md text-black">
    <FontAwesomeIcon :icon="faGoogle" />
   <span class="ml-2">Google</span>
  </a>

</template>

<style scoped>

</style>
