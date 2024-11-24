<script setup>
import {ref} from 'vue';
import Loader from '@/components/Loader.vue'
import InputLabel from '@/components/InputLabel.vue'
import InputText from '@/components/InputText.vue'
import PrimaryButton from '@/components/PrimaryButton.vue'
import InputError from '@/components/InputError.vue'
import { useRoute } from 'vue-router'
import { useAuth } from '@/stores/auth.js'
import { useCodeForgot } from '@/composables/auth/forgotPassword/code-fogot-form.js'

const emit = defineEmits(['verification-code'])


const route = useRoute();
const store = useAuth();
const isLoader = ref(false);
const token = route.params.token;


const  { code,  cError,  cBlur,  handleSubmit,  isSubmitting, } = useCodeForgot();

const onSubmit = handleSubmit(async () => {
  isLoader.value = true;
  try {
   const result = await store.codeResetPassword( code.value, token);
   emit('verification-code', result);
  }
  catch (error) {
    console.log(error);
  }finally {
    isLoader.value = false;
  }

});
</script>

<template>
  <div class="space-y-6 mb-4" >
    <div>
      <InputLabel value="Код"   />
      <div class="mt-2">
        <InputText  type="text" v-model="code"  :error="!!cError" @blur="cBlur"  />
      </div>
      <InputError v-if="cError"  :message="cError"  />

    </div>


    <div>
      <PrimaryButton :disabled="isSubmitting"   @click="onSubmit">
        <Loader v-if="isLoader" />
        <span v-else>Перевірити код</span>
      </PrimaryButton>
    </div>
  </div>
</template>

<style scoped>

</style>
