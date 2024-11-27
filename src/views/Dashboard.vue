<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import BaseButton from '@/components/ui/BaseButton.vue';

const authStore = useAuthStore();
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="bg-white rounded-lg shadow-md p-6">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-2xl font-bold text-gray-900">Welcome, {{ authStore.user?.name }}</h1>
        <BaseButton @click="authStore.logout" variant="secondary">Logout</BaseButton>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="bg-primary-50 rounded-lg p-6">
          <h2 class="text-lg font-semibold text-primary-900 mb-2">Quick Actions</h2>
          <ul class="space-y-2">
            <li>
              <router-link
                to="/lawyers"
                class="text-primary-700 hover:text-primary-900"
              >
                Find a Lawyer
              </router-link>
            </li>
            <li>
              <a href="#" class="text-primary-700 hover:text-primary-900">
                View Messages
              </a>
            </li>
            <li>
              <a href="#" class="text-primary-700 hover:text-primary-900">
                Update Profile
              </a>
            </li>
          </ul>
        </div>
        
        <div class="bg-gray-50 rounded-lg p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-2">Recent Activity</h2>
          <p class="text-gray-600">No recent activity</p>
        </div>
        
        <div class="bg-gray-50 rounded-lg p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-2">Upcoming Appointments</h2>
          <p class="text-gray-600">No upcoming appointments</p>
        </div>
      </div>
    </div>
  </div>
</template>