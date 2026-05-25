import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'accessToken';
const USER_KEY = 'user';

let cachedToken: string | null = null;
let cachedUser: any = null;

export const storage = {
  saveToken: async (token: string) => {
    try {
      cachedToken = token;
      await SecureStore.setItemAsync(TOKEN_KEY, token);
    } catch (e) {
      console.error('Error saving token', e);
    }
  },
  getToken: async () => {
    try {
      if (cachedToken) return cachedToken;
      cachedToken = await SecureStore.getItemAsync(TOKEN_KEY);
      return cachedToken;
    } catch (e) {
      return null;
    }
  },
  removeToken: async () => {
    cachedToken = null;
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  },
  saveUser: async (user: any) => {
    try {
      cachedUser = user;
      await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
    } catch (e) {
      console.error('Error saving user', e);
    }
  },
  getUser: async () => {
    try {
      if (cachedUser) return cachedUser;
      const user = await SecureStore.getItemAsync(USER_KEY);
      cachedUser = user ? JSON.parse(user) : null;
      return cachedUser;
    } catch (e) {
      return null;
    }
  },
  clearAll: async () => {
    try {
      cachedToken = null;
      cachedUser = null;
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      await SecureStore.deleteItemAsync(USER_KEY);
    } catch (e) {}
  }
};
