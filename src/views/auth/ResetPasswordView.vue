<script setup>
import {ref} from 'vue';
import CodeForgotPassword from '@/views/auth/partials/CodeForgotPassword.vue'
import NewPassword from '@/views/auth/partials/NewPassword.vue'
import AlertMessage from '@/components/AlertMessage.vue'

const isCode = ref(false);

const handelVerificationCode = (value) => {
  if (value === true) {
    isCode.value = true;
  }
}

console.log( isCode.value)
</script>

<template>
  <div class="mt-10  sm:mx-auto sm:w-full sm:max-w-sm">
    <div class="text-center text-lg font-bold mb-4 uppercase">
      <template v-if="!isCode">Відновлення паролю</template>
      <template v-else>Змінити пароль</template>
    </div>
    <AlertMessage />

    <CodeForgotPassword v-if="!isCode"  @verification-code="handelVerificationCode" />
    <NewPassword v-else />


  </div>
</template>

<style scoped>

</style>
