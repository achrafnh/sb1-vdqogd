<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import BaseInput from '@/components/ui/BaseInput.vue';
import BaseButton from '@/components/ui/BaseButton.vue';

const authStore = useAuthStore();
const email = ref('');
const password = ref('');
const error = ref('');

async function handleLogin() {
  try {
    await authStore.login(email.value, password.value);
  } catch (err) {
    error.value = 'Invalid email or password';
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="rounded-md shadow-sm -space-y-px">
          <BaseInput
            v-model="email"
            type="email"
            label="Email address"
            required
          />
          <BaseInput
            v-model="password"
            type="password"
            label="Password"
            required
          />
        </div>
        <div v-if="error" class="text-red-500 text-sm text-center">{{ error }}</div>
        <BaseButton type="submit" full>Sign in</BaseButton>
      </form>
    </div>
  </div>
</template>