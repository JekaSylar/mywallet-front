import { ref } from 'vue'
import { defineStore } from 'pinia';
import axios from '@/axios';


export const useAccount = defineStore('accounts', () => {

  const accounts = ref([]);

  const loaderAccounts = async () => {
    try {
       const {data} = await  axios.get('accounts');
        accounts.value = data.data;
    }

    catch (e) {
      console.error(e.message);
    }
  }

  const  addAccounts = async (name, balance, currency) => {
    try {

     await axios.post('accounts', { name, balance, currency });

    }
    catch (e) {
      console.error(e.message);
    }
  }

  const removeAccount = async (id) => {
    try {
      await axios.delete(`accounts/${id}`);
    }
    catch (e) {
      console.error(e.message)
    }
  }

  const updateAccount = async (id, account) => {
    try {
     await axios.put(`accounts/${id}`, account);
    }
    catch (e) {
      console.error(e.message)
    }
  }


  return {
    accounts,
    loaderAccounts,
    addAccounts,
    removeAccount,
    updateAccount
  }

});
