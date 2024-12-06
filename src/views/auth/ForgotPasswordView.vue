<script setup>
import {ref} from 'vue';
import {useAuth} from '@/stores/auth.js'
import {useEmailForgot} from '@/composables/auth/forgotPassword/email-fogot-form.js'
import InputText from '@/components/InputText.vue';
import InputLabel from '@/components/InputLabel.vue';
import InputError from '@/components/InputError.vue'
import { RouterLink, useRouter } from 'vue-router'
import PrimaryButton from '@/components/PrimaryButton.vue'
import AlertMessage from '@/components/AlertMessage.vue'
import Loader from '@/components/Loader.vue'

const store = useAuth();
const  router = useRouter();
const isLoader = ref(false);

const {  email, eError,  eBlur,  handleSubmit,  isSubmitting, } = useEmailForgot();


const onSubmit = handleSubmit(async () => {
  isLoader.value = true;
  try {
    const  token = await store.resetPassword(email.value);
    router.push({ name: 'enter-code-forgot-password', params: { token }  });
  } catch(error) {
    console.error(error);
  } finally {
    isLoader.value = false;
  }
});
</script>

<template>
  <div class="mt-10  sm:mx-auto sm:w-full sm:max-w-sm">
    <div class="text-center text-lg font-bold mb-4 uppercase">
      Відновлення паролю
    </div>
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
        <PrimaryButton :disabled="isSubmitting"   @click="onSubmit">
          <Loader v-if="isLoader" />
          <span v-else>Відновити</span>
        </PrimaryButton>
      </div>
    </div>


    <div class="mt-10 flex flex-row gap-6 justify-center items-center">
      <router-link :to="{name: 'login'}" class="uppercase text-green-600 font-semibold">Увійти</router-link>
      <router-link :to="{name: 'register'}" class="uppercase text-green-600 font-semibold">Реєстрація</router-link>
    </div>
  </div>
</template>


