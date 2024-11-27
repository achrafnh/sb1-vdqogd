<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import BaseInput from '@/components/ui/BaseInput.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import { validateEmail, validatePassword, validateName } from '@/utils/validation';

const authStore = useAuthStore();
const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const role = ref<'user' | 'lawyer'>('user');
const error = ref('');
const loading = ref(false);

async function handleSignup() {
  try {
    error.value = '';
    loading.value = true;

    // Validate inputs
    if (!validateName(name.value)) {
      throw new Error('Name must be at least 2 characters long');
    }

    if (!validateEmail(email.value)) {
      throw new Error('Invalid email format');
    }

    if (!validatePassword(password.value)) {
      throw new Error('Password must be at least 6 characters long');
    }

    if (password.value !== confirmPassword.value) {
      throw new Error('Passwords do not match');
    }

    await authStore.signup({
      name: name.value,
      email: email.value,
      password: password.value,
      role: role.value,
    });
  } catch (err: any) {
    error.value = err.message || 'Signup failed. Please try again.';
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Join LegalConnect to find the right lawyer for your needs
        </p>
      </div>
      
      <form class="mt-8 space-y-6" @submit.prevent="handleSignup">
        <div class="rounded-md shadow-sm space-y-4">
          <BaseInput
            v-model="name"
            label="Full Name"
            required
            :disabled="loading"
          />
          
          <BaseInput
            v-model="email"
            type="email"
            label="Email address"
            required
            :disabled="loading"
          />
          
          <BaseInput
            v-model="password"
            type="password"
            label="Password"
            required
            :disabled="loading"
          />
          
          <BaseInput
            v-model="confirmPassword"
            type="password"
            label="Confirm Password"
            required
            :disabled="loading"
          />
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              I am a:
            </label>
            <div class="flex space-x-4">
              <label class="flex items-center">
                <input
                  type="radio"
                  v-model="role"
                  value="user"
                  class="h-4 w-4 text-primary-600 focus:ring-primary-500"
                  :disabled="loading"
                />
                <span class="ml-2">Client</span>
              </label>
              <label class="flex items-center">
                <input
                  type="radio"
                  v-model="role"
                  value="lawyer"
                  class="h-4 w-4 text-primary-600 focus:ring-primary-500"
                  :disabled="loading"
                />
                <span class="ml-2">Lawyer</span>
              </label>
            </div>
          </div>
        </div>
        
        <div v-if="error" class="text-red-500 text-sm text-center">{{ error }}</div>
        
        <BaseButton
          type="submit"
          full
          :disabled="loading"
        >
          <template v-if="loading">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Signing up...
          </template>
          <template v-else>
            Sign up
          </template>
        </BaseButton>
        
        <p class="text-center text-sm text-gray-600">
          Already have an account?
          <router-link to="/login" class="font-medium text-primary-600 hover:text-primary-500">
            Sign in
          </router-link>
        </p>
      </form>
    </div>
  </div>
</template>