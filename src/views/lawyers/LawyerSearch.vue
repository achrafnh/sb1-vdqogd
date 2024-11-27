<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useLawyersStore } from '@/stores/lawyers';
import type { SearchFilters } from '@/types';
import BaseInput from '@/components/ui/BaseInput.vue';
import LawyerCard from '@/components/lawyers/LawyerCard.vue';
import SearchFiltersPanel from '@/components/lawyers/SearchFiltersPanel.vue';

const lawyersStore = useLawyersStore();
const filters = ref<SearchFilters>({
  expertise: '',
  location: '',
  rating: undefined
});

// Watch for changes in filters and trigger search
watch(filters, (newFilters) => {
  lawyersStore.searchLawyers(newFilters);
}, { deep: true });

// Initial search on component mount
onMounted(() => {
  lawyersStore.searchLawyers(filters.value);
});

function handleFilterChange(newFilters: SearchFilters) {
  filters.value = { ...filters.value, ...newFilters };
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Find a Lawyer</h1>
    
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <SearchFiltersPanel
        :filters="filters"
        @update:filters="handleFilterChange"
        class="lg:col-span-1"
      />
      
      <div class="lg:col-span-3">
        <div v-if="lawyersStore.loading" class="text-center py-8">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
        </div>
        
        <div v-else-if="lawyersStore.error" class="text-red-500 text-center py-8">
          {{ lawyersStore.error }}
        </div>
        
        <div v-else-if="lawyersStore.lawyers.length === 0" class="text-center py-8 text-gray-500">
          No lawyers found matching your criteria
        </div>
        
        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <LawyerCard
            v-for="lawyer in lawyersStore.lawyers"
            :key="lawyer.id"
            :lawyer="lawyer"
          />
        </div>
      </div>
    </div>
  </div>
</template>