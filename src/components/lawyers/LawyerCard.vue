<script setup lang="ts">
import type { Lawyer } from '@/types';
import { StarIcon } from '@heroicons/vue/20/solid';
import BaseButton from '@/components/ui/BaseButton.vue';

defineProps<{
  lawyer: Lawyer;
}>();
</script>

<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <div class="flex items-center mb-4">
      <img
        :src="lawyer.profileImage || '/default-avatar.png'"
        :alt="lawyer.name"
        class="w-16 h-16 rounded-full object-cover"
      />
      <div class="ml-4">
        <h3 class="text-lg font-semibold text-gray-900">{{ lawyer.name }}</h3>
        <div class="flex items-center">
          <StarIcon class="h-5 w-5 text-yellow-400" />
          <span class="ml-1 text-sm text-gray-600">{{ lawyer.rating }}/5</span>
        </div>
      </div>
    </div>
    
    <div class="mb-4">
      <div class="text-sm text-gray-500">Location</div>
      <div class="text-gray-700">{{ lawyer.location }}</div>
    </div>
    
    <div class="mb-4">
      <div class="text-sm text-gray-500">Expertise</div>
      <div class="flex flex-wrap gap-2 mt-1">
        <span
          v-for="expertise in lawyer.expertise"
          :key="expertise"
          class="px-2 py-1 text-xs bg-primary-50 text-primary-700 rounded-full"
        >
          {{ expertise }}
        </span>
      </div>
    </div>
    
    <div class="mt-4">
      <BaseButton variant="primary" full>View Profile</BaseButton>
    </div>
  </div>
</template>