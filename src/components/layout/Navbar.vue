<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline';
import BaseButton from '@/components/ui/BaseButton.vue';

const authStore = useAuthStore();

const navigation = [
  { name: 'Home', to: '/' },
  { name: 'Find Lawyers', to: '/lawyers' },
  { name: 'About', to: '/about' },
  { name: 'Contact', to: '/contact' },
];
</script>

<template>
  <Disclosure as="nav" class="bg-white shadow-sm" v-slot="{ open }">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="flex-shrink-0 flex items-center">
            <router-link to="/" class="text-2xl font-bold text-primary-600">
              LegalConnect
            </router-link>
          </div>
          
          <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
            <router-link
              v-for="item in navigation"
              :key="item.name"
              :to="item.to"
              class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-primary-600"
            >
              {{ item.name }}
            </router-link>
          </div>
        </div>
        
        <div class="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
          <template v-if="authStore.isAuthenticated">
            <router-link to="/dashboard">
              <BaseButton variant="secondary">Dashboard</BaseButton>
            </router-link>
            <BaseButton @click="authStore.logout">Logout</BaseButton>
          </template>
          <template v-else>
            <router-link to="/login">
              <BaseButton variant="secondary">Login</BaseButton>
            </router-link>
            <router-link to="/signup">
              <BaseButton>Sign Up</BaseButton>
            </router-link>
          </template>
        </div>
        
        <div class="-mr-2 flex items-center sm:hidden">
          <DisclosureButton class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100">
            <span class="sr-only">Open main menu</span>
            <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="pt-2 pb-3 space-y-1">
        <router-link
          v-for="item in navigation"
          :key="item.name"
          :to="item.to"
          class="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
        >
          {{ item.name }}
        </router-link>
      </div>
      
      <div class="pt-4 pb-3 border-t border-gray-200">
        <div class="space-y-1">
          <template v-if="authStore.isAuthenticated">
            <router-link
              to="/dashboard"
              class="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Dashboard
            </router-link>
            <button
              @click="authStore.logout"
              class="block w-full text-left pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Logout
            </button>
          </template>
          <template v-else>
            <router-link
              to="/login"
              class="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Login
            </router-link>
            <router-link
              to="/signup"
              class="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Sign Up
            </router-link>
          </template>
        </div>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>