import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { User } from '@/types';
import { useRouter } from 'vue-router';
import axios from '@/utils/axios';
import { validateEmail, validatePassword, validateName, validateRole } from '@/utils/validation';

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter();
  const user = ref<User | null>(null);
  const token = ref<string | null>(null);
  
  const isAuthenticated = computed(() => !!token.value);

  async function login(email: string, password: string) {
    try {
      if (!validateEmail(email)) {
        throw new Error('Invalid email format');
      }

      if (!validatePassword(password)) {
        throw new Error('Password must be at least 6 characters long');
      }

      const response = await axios.post('/api/auth/login', { email, password });
      token.value = response.data.token;
      user.value = response.data.user;
      localStorage.setItem('auth_token', response.data.token);
      router.push('/dashboard');
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'Login failed';
      throw new Error(message);
    }
  }

  async function signup(userData: Partial<User> & { password: string }) {
    try {
      if (!validateEmail(userData.email!)) {
        throw new Error('Invalid email format');
      }

      if (!validatePassword(userData.password)) {
        throw new Error('Password must be at least 6 characters long');
      }

      if (!validateName(userData.name!)) {
        throw new Error('Name must be at least 2 characters long');
      }

      if (!validateRole(userData.role!)) {
        throw new Error('Invalid role selected');
      }

      const response = await axios.post('/api/auth/signup', userData);
      token.value = response.data.token;
      user.value = response.data.user;
      localStorage.setItem('auth_token', response.data.token);
      router.push('/dashboard');
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'Signup failed';
      throw new Error(message);
    }
  }

  function logout() {
    user.value = null;
    token.value = null;
    localStorage.removeItem('auth_token');
    router.push('/login');
  }

  // Initialize auth state from localStorage
  function init() {
    const savedToken = localStorage.getItem('auth_token');
    if (savedToken) {
      token.value = savedToken;
      // Fetch user profile
      axios.get('/api/auth/profile')
        .then(response => {
          user.value = response.data;
        })
        .catch(() => {
          logout(); // Token is invalid or expired
        });
    }
  }

  return {
    user,
    token,
    isAuthenticated,
    login,
    signup,
    logout,
    init
  };
});