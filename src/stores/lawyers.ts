import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Lawyer, SearchFilters } from '@/types';
import axios from '@/utils/axios';
import { useDebounce } from '@vueuse/core';

export const useLawyersStore = defineStore('lawyers', () => {
  const lawyers = ref<Lawyer[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const searchLawyers = async (filters: SearchFilters) => {
    try {
      loading.value = true;
      error.value = null;
      const response = await axios.get('/api/lawyers', { params: filters });
      lawyers.value = response.data;
    } catch (err) {
      error.value = 'Failed to fetch lawyers';
      console.error('Error fetching lawyers:', err);
    } finally {
      loading.value = false;
    }
  };

  return {
    lawyers,
    loading,
    error,
    searchLawyers
  };
});