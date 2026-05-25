import Constants from 'expo-constants';

/**
 * Detecta automáticamente la IP de tu PC para que funcione en celulares físicos.
 * Asegúrate de que tu celular y PC estén en la MISMA red Wi-Fi.
 */
const getBaseUrl = () => {
  try {
    // En Expo Go, hostUri contiene la dirección del servidor (ej: 192.168.1.15:8081)
    const hostUri = Constants.expoConfig?.hostUri || '';
    const ip = hostUri.split(':').shift();

    // Si detectamos una IP real de red local, la usamos para el backend
    if (ip && ip !== 'localhost' && !ip.includes('127.0.0.1')) {
      return `http://${ip}:8080`;
    }
  } catch (e) {
    console.warn('Error detectando IP automática, usando fallback.');
  }

  // Fallback para emulador
  return 'http://10.0.2.2:8080';
};

export const API_CONFIG = {
  BASE_URL: getBaseUrl(),
  TIMEOUT: 8000,
  HEADERS: {
    'Content-Type': 'application/json; charset=utf-8',
  },
};

export const ENDPOINTS = {
  LOGIN: '/api/auth/login',
  REGISTER: '/api/auth/register',
  ME: '/api/auth/me',
  INCIDENTS: '/api/incidents',
  EVIDENCES: '/api/evidences',
  ASSIGNMENTS: '/api/incidents',
  DASHBOARD: '/api/dashboard/summary',
};
