import { ref } from 'vue'
import { defineStore } from 'pinia';
import axios from '@/axios';


export const useCategory = defineStore('category', () => {

  const categories = ref({ data: [], meta: { links: [] } });

  const loaderCategories = async (current) => {

    try {
       const data  = await axios.get(`category${current ? `?page=${current}` : ""}`);
       categories.value = data.data;
    }

    catch (e) {
      console.error(e.message);
    }

  }

  const removeCategory = async (id) => {
    try {
      await axios.delete(`category/${id}`);
    }
    catch (e) {
      console.error(e.message)
    }
  }

  const  addCategory = async (name) => {
    try {
      await axios.post('category', { name });

    }
    catch (e) {
      console.error(e.message);
    }
  }


  const updateCategory = async (id, category) => {
    try {
      await axios.put(`category/${id}`, category);
    }
    catch (e) {
      console.error(e.message)
    }
  }


  return {
    categories,
    loaderCategories,
    removeCategory,
    addCategory,
    updateCategory
  }
});
