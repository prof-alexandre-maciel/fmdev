import axios from 'axios';
import store from '../store';

export const BASE_URL = 'http://localhost:5000/api/';

const api = axios.create({
  baseURL: BASE_URL
});

api.interceptors.request.use((config) => {
  const { token } = store.getState().auth;

  const headers = { ...config.headers };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return { ...config, headers };
});

export default api;