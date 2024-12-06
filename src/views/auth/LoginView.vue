<script setup>
import {ref} from 'vue';
import {useAuth} from '@/stores/auth.js'
import {RouterLink, useRouter}  from 'vue-router';
import {useLoginForm} from '@/composables/auth/login-form.js'
import InputLabel from "@/components/InputLabel.vue";
import InputText from '@/components/InputText.vue';
import PrimaryButton from "@/components/PrimaryButton.vue";
import AlertMessage from '@/components/AlertMessage.vue'
import InputError from '@/components/InputError.vue'
import Loader from '@/components/Loader.vue'

const store = useAuth();
const router = useRouter();
const { email, eError, eBlur, password, pError, pBlur, handleSubmit, isSubmitting } = useLoginForm();



const isLoader = ref(false);


const onSubmit = handleSubmit(async () => {
  isLoader.value = true;
  try {
    await store.login(email.value, password.value); // Используем асинхронный вызов
    router.push({ name: 'home' });
  } catch(error) {
    console.error(error);
  } finally {
    isLoader.value = false;
  }
});
</script>

<template>

  <div class="mt-10  sm:mx-auto sm:w-full sm:max-w-sm">
    <AlertMessage />
    <div class="space-y-6 mb-4" >
      <div>
        <InputLabel value="Email"   />
        <div class="mt-2">
          <InputText  type="email" v-model="email"  :error="!!eError" @blur="eBlur"  />
        </div>
        <InputError v-if="eError"  :message="eError"  />

      </div>

      <div>
        <div class="flex items-center justify-between">
          <InputLabel value="Пароль" />
          <div class="text-sm">
            <router-link :to="{name: 'reset-password'}" class="font-semibold text-green-600 hover:text-green-700">Забули пароль ?</router-link >
          </div>
        </div>
        <div class="mt-2">
          <InputText type="password" v-model="password" :error="!!pError" @blur="pBlur"   />
        </div>
        <InputError v-if="pError"  :message="pError"  />
      </div>

      <div>
        <PrimaryButton :disabled="isSubmitting"   @click="onSubmit" class="w-full">
          <Loader v-if="isLoader" />
         <span v-else>Увійти</span>
        </PrimaryButton>
      </div>
    </div>


    <div class="mt-10 flex flex-col justify-center items-center">
      <router-link :to="{name: 'register'}" class="uppercase text-green-600 font-semibold">Реєстрація</router-link>
    </div>
  </div>


</template>

<style scoped>

</style>
