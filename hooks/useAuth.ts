import { create } from 'zustand';
import { storage } from '../api/storage';
import { authService } from '../api/authService';
import { User } from '../api/types';
import { useEffect } from 'react';

interface AuthState {
  user: User | null;
  authLoading: boolean; // Para el proceso de login
  isInitialized: boolean; // Para la carga inicial de la app
  login: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  authLoading: false,
  isInitialized: false,
  checkAuth: async () => {
    if (get().isInitialized) return;

    // Timeout de seguridad de 3 segundos
    const timer = setTimeout(() => {
      if (!get().isInitialized) set({ isInitialized: true });
    }, 3000);

    try {
      const [storedUser, token] = await Promise.all([
        storage.getUser(),
        storage.getToken()
      ]);

      if (storedUser && token) {
        set({ user: storedUser });
      }
    } catch (e) {
      console.warn('Auth initialization failed', e);
    } finally {
      clearTimeout(timer);
      set({ isInitialized: true });
    }
  },
  login: async (email: string, pass: string) => {
    set({ authLoading: true });
    try {
      const response = await authService.login(email, pass);
      set({ user: response.user });
    } finally {
      set({ authLoading: false });
    }
  },
  logout: async () => {
    await authService.logout();
    set({ user: null });
  },
}));

export const useAuth = () => {
  const { user, authLoading, isInitialized, checkAuth, login, logout } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  return {
    user,
    // loading es true hasta que la app termina de inicializarse o durante un login
    loading: !isInitialized || authLoading,
    isInitialized,
    isAuthenticated: !!user,
    login,
    logout
  };
};
