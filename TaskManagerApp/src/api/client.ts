import axios from 'axios';
import { API_CONFIG } from '../config/api';

const client = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Inject auth token into every request automatically
client.interceptors.request.use((config) => {
  return config;
});

// Normalize error responses
client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      return Promise.reject(new Error('Request timed out. Please retry.'));
    }
    if (!error.response) {
      return Promise.reject(new Error('Network error. Check your connection.'));
    }
    const status = error.response.status;
    if (status === 404) return Promise.reject(new Error('Resource not found.'));
    if (status >= 500) return Promise.reject(new Error('Server error. Please retry.'));
    return Promise.reject(new Error(error.response.data?.message || 'Something went wrong.'));
  }
);

export default client;