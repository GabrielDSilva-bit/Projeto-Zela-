import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const API_URL =
  process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3333/api';

console.log('API_URL:', API_URL);

export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync('zela_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const responseData = error.response.data;
      const message =
        typeof responseData?.message === 'string'
          ? responseData.message
          : `Erro no servidor (${error.response.status})`;

      return Promise.reject(new Error(message));
    } else if (error.request) {
      return Promise.reject(new Error('Não foi possível conectar ao servidor'));
    }
    return Promise.reject(error);
  }
);
