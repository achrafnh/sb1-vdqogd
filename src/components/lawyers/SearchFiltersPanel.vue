<script setup lang="ts">
import { computed } from 'vue';
import type { SearchFilters } from '@/types';
import BaseInput from '@/components/ui/BaseInput.vue';

const props = defineProps<{
  filters: SearchFilters;
}>();

const emit = defineEmits<{
  (e: 'update:filters', filters: SearchFilters): void;
}>();

const expertiseOptions = [
  'Criminal Law',
  'Family Law',
  'Corporate Law',
  'Immigration Law',
  'Real Estate Law',
];

const locationOptions = [
  'New York',
  'Los Angeles',
  'Chicago',
  'Houston',
  'Phoenix',
];

function updateFilter(key: keyof SearchFilters, value: any) {
  emit('update:filters', {
    ...props.filters,
    [key]: value,
  });
}
</script>

<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <h2 class="text-lg font-semibold text-gray-900 mb-4">Filters</h2>
    
    <div class="space-y-6">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Expertise
        </label>
        <select
          v-model="filters.expertise"
          @change="updateFilter('expertise', $event.target.value)"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        >
          <option value="">All</option>
          <option v-for="option in expertiseOptions" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Location
        </label>
        <select
          v-model="filters.location"
          @change="updateFilter('location', $event.target.value)"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        >
          <option value="">All</option>
          <option v-for="option in locationOptions" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Minimum Rating
        </label>
        <input
          type="range"
          min="0"
          max="5"
          step="0.5"
          :value="filters.rating"
          @input="updateFilter('rating', parseFloat(($event.target as HTMLInputElement).value))"
          class="w-full"
        />
        <div class="text-sm text-gray-500 text-center">
          {{ filters.rating || 0 }} / 5
        </div>
      </div>
    </div>
  </div>
</template>