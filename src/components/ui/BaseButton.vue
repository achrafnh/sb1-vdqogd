<script setup lang="ts">
defineProps<{
  type?: 'button' | 'submit';
  variant?: 'primary' | 'secondary';
  full?: boolean;
}>();
</script>

<template>
  <button
    :type="type || 'button'"
    :class="[
      'inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium shadow-sm',
      variant === 'secondary' 
        ? 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
        : 'bg-primary-600 text-white hover:bg-primary-700',
      full ? 'w-full' : ''
    ]"
  >
    <slot></slot>
  </button>
</template>