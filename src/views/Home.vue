<script setup lang="ts">
import { useRouter } from 'vue-router';
import BaseButton from '@/components/ui/BaseButton.vue';
import { MagnifyingGlassIcon, ScaleIcon, ShieldCheckIcon, ClockIcon } from '@heroicons/vue/24/outline';

const router = useRouter();

const featuredLawyers = [
  {
    id: 1,
    name: 'Sarah Johnson',
    expertise: 'Corporate Law',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    location: 'New York'
  },
  {
    id: 2,
    name: 'Michael Chen',
    expertise: 'Family Law',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    location: 'Los Angeles'
  },
  {
    id: 3,
    name: 'David Rodriguez',
    expertise: 'Criminal Law',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    location: 'Chicago'
  }
];
</script>

<template>
  <div class="min-h-screen bg-white">
    <!-- Hero Section -->
    <div class="relative">
      <div class="absolute inset-0">
        <img
          class="w-full h-[600px] object-cover"
          src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f"
          alt="Legal background"
        />
        <div class="absolute inset-0 bg-gray-900/60"></div>
      </div>
      
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div class="text-center">
          <h1 class="text-5xl font-bold text-white mb-6">
            Find Your Perfect Legal Match
          </h1>
          <p class="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Connect with top-rated lawyers who understand your needs. Get expert legal advice and representation.
          </p>
          
          <!-- Search Bar -->
          <div class="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-4">
            <div class="flex items-center gap-4">
              <div class="flex-1">
                <input
                  type="text"
                  placeholder="What type of lawyer are you looking for?"
                  class="w-full px-4 py-2 border-0 focus:ring-0 text-gray-900"
                />
              </div>
              <BaseButton @click="router.push('/lawyers')" class="!px-8">
                <MagnifyingGlassIcon class="h-5 w-5 mr-2" />
                Search
              </BaseButton>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div class="py-24 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-gray-900 text-center mb-16">
          Why Choose LegalConnect
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div class="text-center">
            <div class="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <ScaleIcon class="h-8 w-8 text-primary-600" />
            </div>
            <h3 class="text-xl font-semibold mb-4">Expert Lawyers</h3>
            <p class="text-gray-600">Connect with verified legal professionals across all practice areas.</p>
          </div>
          
          <div class="text-center">
            <div class="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShieldCheckIcon class="h-8 w-8 text-primary-600" />
            </div>
            <h3 class="text-xl font-semibold mb-4">Secure Platform</h3>
            <p class="text-gray-600">Your data and communications are protected with enterprise-grade security.</p>
          </div>
          
          <div class="text-center">
            <div class="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <ClockIcon class="h-8 w-8 text-primary-600" />
            </div>
            <h3 class="text-xl font-semibold mb-4">Quick Response</h3>
            <p class="text-gray-600">Get responses from lawyers within hours, not days.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Featured Lawyers Section -->
    <div class="py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-gray-900 mb-12">Featured Lawyers</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="lawyer in featuredLawyers"
            :key="lawyer.id"
            class="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105"
          >
            <img
              :src="lawyer.image"
              :alt="lawyer.name"
              class="w-full h-48 object-cover"
            />
            <div class="p-6">
              <h3 class="text-xl font-semibold mb-2">{{ lawyer.name }}</h3>
              <p class="text-gray-600 mb-2">{{ lawyer.expertise }}</p>
              <div class="flex items-center justify-between">
                <span class="text-primary-600">{{ lawyer.location }}</span>
                <div class="flex items-center">
                  <span class="text-yellow-400">★</span>
                  <span class="ml-1">{{ lawyer.rating }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="text-center mt-12">
          <BaseButton @click="router.push('/lawyers')" variant="secondary">
            View All Lawyers
          </BaseButton>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="bg-primary-600 py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-bold text-white mb-6">
          Ready to Find Your Lawyer?
        </h2>
        <p class="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
          Join thousands of clients who have found their perfect legal match through LegalConnect.
        </p>
        <BaseButton @click="router.push('/signup')" class="!bg-white !text-primary-600 !hover:bg-primary-50">
          Get Started Now
        </BaseButton>
      </div>
    </div>
  </div>
</template>