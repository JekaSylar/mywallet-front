<script setup>
import {onMounted} from 'vue'
import Title from '@/components/Title.vue'
import Breadcrumb from '@/components/Breadcrumb.vue';
import ListAccounts from '@/views/accounts/partials/ListAccounts.vue';
import AddAccount from '@/views/accounts/partials/AddAccount.vue'
import {useAccount} from '@/stores/accounts.js'

const pages = [
  { name: 'Рахунки', href: '#', current: true },
];

const store = useAccount();

onMounted(async () => {
 await store.loaderAccounts();

})
</script>

<template>
  <Title title="Рахунки" />
  <Breadcrumb :pages />
    <AddAccount />
 <ListAccounts v-if="store.accounts" :accounts="store.accounts" />


</template>

<style scoped>

</style>
