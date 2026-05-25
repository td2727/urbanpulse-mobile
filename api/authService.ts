import api from './api';
import { storage } from './storage';
import { LoginResponse, User } from './types';
import { ENDPOINTS } from '../constants/api';

export const authService = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    try {
      // REQUERIMIENTO: Usar api.post("auth/login", ...)
      // Se usa la constante ENDPOINTS.LOGIN que ahora es "auth/login" (sin barra inicial)
      // para que Axios lo combine correctamente con el subdirectorio /api
      const response = await api.post<LoginResponse>(ENDPOINTS.LOGIN, {
        email,
        password
      });

      // REQUERIMIENTO: El token se guarda desde accessToken
      const { accessToken, user } = response.data;

      if (accessToken) {
        await storage.setToken(accessToken);
        await storage.saveUser(user);
      }

      return response.data;
    } catch (error: any) {
      // El error ya es procesado por el interceptor de api.ts
      throw error;
    }
  },

  register: async (fullName: string, email: string, password: string): Promise<LoginResponse> => {
    try {
      const response = await api.post<LoginResponse>(ENDPOINTS.REGISTER, {
        fullName,
        email,
        password
      });

      if (response.data.accessToken) {
        await storage.setToken(response.data.accessToken);
        await storage.saveUser(response.data.user);
      }

      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  logout: async () => {
    await storage.clearAll();
  },

  getMe: async (): Promise<User> => {
    const response = await api.get<User>(ENDPOINTS.ME);
    return response.data;
  },
};
