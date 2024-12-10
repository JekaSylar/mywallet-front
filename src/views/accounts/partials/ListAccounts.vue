<script setup>
import  { abbreviation } from '../../../../utils/abbreviation.js';
import { storeToRefs } from 'pinia';
import {formatNumber} from '../../../../utils/formatNumber.js'
import {EyeIcon    } from '@heroicons/vue/24/solid/index.js'
import DeleteAccount from '@/views/accounts/partials/DeleteAccount.vue'
import EditAccount from '@/views/accounts/partials/EditAccount.vue'
import { useAccount } from '@/stores/accounts.js'
import { onMounted } from 'vue'

const store = useAccount();
const { accounts } = storeToRefs(store);

onMounted(async () => {
  await store.loaderAccounts();

})

</script>

<template>

  <div class="my-8">
  <ul
    v-if="accounts.length > 0"
    role="list" class="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
    <li
      v-for="account in accounts" :key="account.id"
      class="col-span-1 flex rounded-md shadow-sm" >
      <div class="flex w-20 shrink-0 items-center justify-center rounded-l-md bg-green-600 text-sm font-medium text-white">{{ abbreviation(account.name) }}</div>
      <div class="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white">
        <div class="flex-1 truncate px-4 py-2 text-sm">
          <a href="#" class="font-medium text-gray-900 hover:text-gray-600">{{ account.name }}</a>
          <p class="text-gray-500">Баланс - <span class="font-bold">{{ formatNumber(account.balance) }} {{ account.currency }}</span></p>
        </div>
        <div class="shrink-0 pr-2 flex flex-row gap-1">
          <EyeIcon class="fill-green-600 w-5 cursor-pointer" />
          <EditAccount :account="account"  />
          <DeleteAccount :name="account.name" :id="account.id" />

        </div>
      </div>
    </li>
  </ul>
  </div>
</template>

<style scoped>

</style>
