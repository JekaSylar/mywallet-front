<script setup>
import Title from '@/components/Title.vue'
import Breadcrumb from '@/components/Breadcrumb.vue';
import ListAccounts from '@/views/accounts/partials/ListAccounts.vue';
import AddAccount from '@/views/accounts/partials/AddAccount.vue'


const pages = [
  { name: 'Рахунки', href: '#', current: true },
];


</script>

<template>
  <Title title="Рахунки" />
  <Breadcrumb :pages />
    <AddAccount />
 <ListAccounts  />


</template>

<style scoped>

</style>
