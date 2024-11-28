<template>
  <div class="container mt-5">
    <div class="text-center">
      <h1>Welcome to Chat App</h1>
      <p class="lead">Connect with friends and chat in real-time</p>
      <div class="mt-4">
        <router-link 
          v-if="!isAuthenticated" 
          to="/login" 
          class="btn btn-primary me-3"
        >
          Login
        </router-link>
        <router-link 
          v-if="!isAuthenticated" 
          to="/register" 
          class="btn btn-outline-primary"
        >
          Register
        </router-link>
        <router-link 
          v-else 
          to="/chat" 
          class="btn btn-primary"
        >
          Go to Chat
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'HomePage',
  setup() {
    const store = useStore();
    const isAuthenticated = computed(() => store.getters['auth/isAuthenticated']);

    return {
      isAuthenticated
    };
  }
};
</script>
