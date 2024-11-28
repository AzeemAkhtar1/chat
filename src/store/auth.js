import { authService } from '../services/auth';

export default {
  namespaced: true,
  state: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    error: null
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_ERROR(state, error) {
      state.error = error;
    }
  },
  actions: {
    async register({ commit }, userData) {
      try {
        const user = await authService.register(userData);
        commit('SET_USER', user);
        return user;
      } catch (error) {
        commit('SET_ERROR', error.response?.data?.message || 'Registration failed');
        throw error;
      }
    },
    async login({ commit }, credentials) {
      try {
        const user = await authService.login(credentials);
        commit('SET_USER', user);
        return user;
      } catch (error) {
        commit('SET_ERROR', error.response?.data?.message || 'Login failed');
        throw error;
      }
    },
    async logout({ commit }) {
      try {
        await authService.logout();
        commit('SET_USER', null);
      } catch (error) {
        console.error('Logout error:', error);
      }
    }
  },
  getters: {
    isAuthenticated: state => !!state.user,
    currentUser: state => state.user,
    authError: state => state.error
  }
};
