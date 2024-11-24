<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useAuth } from '@/stores/auth.js'
import { ref } from 'vue'
import Loader from '@/components/Loader.vue'
import InputLabel from '@/components/InputLabel.vue'
import InputText from '@/components/InputText.vue'
import PrimaryButton from '@/components/PrimaryButton.vue'
import InputError from '@/components/InputError.vue'
import { useEditPasswordForm } from '@/composables/auth/forgotPassword/edit-password-fogot-form.js'


const route = useRoute();
const router = useRouter();
const store = useAuth();
const isLoader = ref(false);
const token = route.params.token;

const { handleSubmit,  isSubmitting,  password,  pError,  pBlur, password_confirmation,  pcError,  pcBlur } = useEditPasswordForm();

const onSubmit = handleSubmit(async () => {
  isLoader.value = true;
  try {
    await store.updatePassword(token, password.value, password_confirmation.value);
    router.push({ name: 'home' });

  } catch (error) {
    console.error(error);
  } finally {
    isLoader.value = false;
  }
});
</script>

<template>
  <div class="space-y-6 mb-4" >

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
        <span v-else>Оновити пароль</span>
      </PrimaryButton>
    </div>
  </div>
</template>

