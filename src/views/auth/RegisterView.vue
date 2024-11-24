<script setup>
import {ref} from 'vue';
import {useRouter}  from 'vue-router';
import {useRegisterForm} from '@/composables/auth/register-form';
import {useAuth} from '@/stores/auth.js'
import InputText from '@/components/InputText.vue'
import GoogleAuth from '@/components/GoogleAuth.vue'
import InputLabel from '@/components/InputLabel.vue'
import InputError from '@/components/InputError.vue'
import PrimaryButton from '@/components/PrimaryButton.vue';
import Loader from '@/components/Loader.vue'
import AlertMessage from '@/components/AlertMessage.vue'

const store = useAuth();
const router = useRouter();

const isLoader = ref(false);

const {
  handleSubmit,
  isSubmitting,
  name,
  nError,
  nBlur,
  email,
  eError,
  eBlur,
  password,
  pError,
  pBlur,
  password_confirmation,
  pcError,
  pcBlur
} = useRegisterForm();

const onSubmit = handleSubmit(async () => {
  isLoader.value = true;
  try {
    await store.register(name.value, email.value, password.value, password_confirmation.value); // Используем асинхронный вызов
  router.push({ name: 'home' });
  } catch (error) {
    console.error("Ошибка входа:", error);
  } finally {
    isLoader.value = false;
  }
});

</script>

<template>
  <div class="mt-10  sm:mx-auto sm:w-full sm:max-w-sm">
    <div class="text-center text-lg font-bold mb-4 uppercase">
      Реєстрація
    </div>
    <AlertMessage />
    <div class="space-y-6 mb-4" >
      <div>
        <InputLabel value="Ім'я" />
        <div class="mt-2">
          <InputText type="text" v-model="name"  :error="!!nError" @blur="nBlur" />
        </div>
        <InputError v-if="nError"  :message="nError" />
      </div>

      <div>
        <InputLabel value="Email" />
        <div class="mt-2">
          <InputText type="email" v-model="email"  :error="!!eError" @blur="eBlur"  />
        </div>
        <InputError v-if="eError"  :message="eError" />
      </div>

      <div>
        <InputLabel value="Пароль" />
        <div class="mt-2">
          <InputText type="password" v-model="password"  :error="!!pError" @blur="pBlur"  />
        </div>
        <InputError v-if="pError"  :message="pError" />
      </div>

      <div>
        <InputLabel value="Повторно пароль" />
        <div class="mt-2">
          <InputText type="password" v-model="password_confirmation"  :error="!!pcError" @blur="pcBlur"  />
        </div>
        <InputError v-if="pcError"  :message="pcError" />
      </div>

      <div>
        <PrimaryButton
          :disabled="isSubmitting"
          @click="onSubmit"
        >
          <Loader v-if="isLoader" />
         <span v-else>Зареєструватися</span>
        </PrimaryButton>
      </div>
    </div>

  </div>
  <div class="mt-10 flex flex-col justify-center items-center">
   <router-link :to="{'name': 'login'}" class="uppercase text-green-600 font-semibold">Увійти</router-link>
  </div>
</template>

<style scoped>

</style>
