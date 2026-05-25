import axios from 'axios';
import { API_CONFIG } from '../constants/api';
import { storage } from './storage';

// REQUERIMIENTO: Log de la Base URL para confirmar configuración
console.log("API BASE URL:", API_CONFIG.BASE_URL);

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
    // REQUERIMIENTO: Logs de error detallados para depuración de rutas
    console.log("API ERROR STATUS:", error.response?.status);
    console.log("API ERROR DATA:", JSON.stringify(error.response?.data, null, 2));
    console.log("API ERROR FULL URL:", `${error.config?.baseURL}${error.config?.url}`);
    console.log("API ERROR URL PATH:", error.config?.url);

    let message = 'Error de conexión';
    if (error.response) {
      message =
        error.response.data?.message ||
        error.response.data?.error ||
        error.response.data?.detail ||
        `Error del servidor (${error.response.status})`;
    } else if (error.request) {
      message = 'No se pudo conectar con el servidor. Verifica tu conexión a internet o espera unos segundos mientras Render despierta el backend.';
    }

    return Promise.reject({ message });
  }
);

export default api;
