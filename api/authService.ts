import api from './api';
import { storage } from './storage';
import { LoginResponse, User } from './types';
import { ENDPOINTS } from '../constants/api';

export const authService = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>(ENDPOINTS.LOGIN, { email, password });
    await storage.saveToken(response.data.accessToken);
    await storage.saveUser(response.data.user);
    return response.data;
  },

  register: async (fullName: string, email: string, password: string): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>(ENDPOINTS.REGISTER, { fullName, email, password });
    if (response.data.accessToken) {
      await storage.saveToken(response.data.accessToken);
      await storage.saveUser(response.data.user);
    }
    return response.data;
  },

  logout: async () => {
    await storage.clearAll();
  },

  getMe: async (): Promise<User> => {
    const response = await api.get<User>(ENDPOINTS.ME);
    return response.data;
  },
};
