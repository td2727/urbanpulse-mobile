import axios from 'axios';
import { API_CONFIG } from '../constants/api';
import { storage } from './storage';

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: API_CONFIG.HEADERS,
});

api.interceptors.request.use(async (config) => {
  try {
    const token = await storage.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (e) {
    console.error('Error al adjuntar token:', e);
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    let message = 'Error de conexión';
    if (error.response) {
      // El servidor respondió con error (4xx, 5xx)
      message = error.response.data?.message || 'Error del servidor';
    } else if (error.request) {
      // No hubo respuesta (Timeout o IP incorrecta)
      message = 'No se pudo conectar con el servidor. Verifica que tu PC y celular estén en la misma red Wifi y que la IP sea correcta.';
    }

    // Devolvemos siempre un objeto con mensaje para evitar crasheos en la UI
    return Promise.reject({ message });
  }
);

export default api;
