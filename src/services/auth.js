import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth';

export const authService = {
  async register(userData) {
    const response = await axios.post(`${API_URL}/register`, userData);
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  },

  async login(credentials) {
    const response = await axios.post(`${API_URL}/login`, credentials);
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  },

  async logout() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.token) {
      await axios.post(`${API_URL}/logout`, {}, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
    }
    localStorage.removeItem('user');
  }
};
