<script setup lang="ts">
import { RouterView } from 'vue-router';
import Navbar from '@/components/layout/Navbar.vue';
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />
    <RouterView />
  </div>
</template>