// src/services/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Replace with your backend URL

const authAxios = axios.create({
  baseURL: API_URL,
});

authAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Temporary hardcoded login for testing
const login = async (username, password) => {
  if (username === 'admin' && password === 'password123') {
    const fakeToken = 'fake-jwt-token-for-testing'; // Simulate a token
    localStorage.setItem('adminToken', fakeToken);
    return { token: fakeToken }; // Simulate a successful response
  } else {
    throw new Error('Invalid credentials');
  }
  // Uncomment the original code when you have a backend:
  // const response = await axios.post(`${API_URL}/auth/login`, { username, password });
  // localStorage.setItem('adminToken', response.data.token);
  // return response.data;
};

const logout = () => {
  localStorage.removeItem('adminToken');
};

const isAuthenticated = () => {
  return !!localStorage.getItem('adminToken');
};

const getToken = () => {
  return localStorage.getItem('adminToken');
};

export {
  login,
  logout,
  isAuthenticated,
  getToken,
  authAxios,
};