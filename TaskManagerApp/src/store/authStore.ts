import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (val: boolean) => void;
  logout: () => Promise<void>;
  rehydrate: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,

  setUser: (user) => {
    set({ user });
    if (user) {
      AsyncStorage.setItem('auth_user', JSON.stringify(user));
    } else {
      AsyncStorage.removeItem('auth_user');
    }
  },

  setLoading: (val) => set({ isLoading: val }),

  logout: async () => {
    await AsyncStorage.removeItem('auth_user');
    set({ user: null });
  },

  // Called on app start to restore saved session
  rehydrate: async () => {
    try {
      const raw = await AsyncStorage.getItem('auth_user');
      if (raw) set({ user: JSON.parse(raw) });
    } catch {
      // ignore corrupt data
    } finally {
      set({ isLoading: false });
    }
  },
}));