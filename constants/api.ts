/**
 * CONFIGURACIÓN DE API PARA PRODUCCIÓN (RENDER)
 */

export const API_CONFIG = {
  BASE_URL: "https://urbanpulse-vv2l.onrender.com/api",
  TIMEOUT: 20000,
  HEADERS: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export const ENDPOINTS = {
  // Se usa barra inicial para que Axios concatene correctamente: .../api + /auth/login = .../api/auth/login
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  ME: '/auth/me',
  INCIDENTS: '/incidents',
  EVIDENCES: '/evidences',
  ASSIGNMENTS: '/incidents',
  DASHBOARD: '/dashboard/summary',
};
