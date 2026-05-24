import { useState } from 'react';
import { authApi } from '../api/authApi';
import { useAuthStore } from '../store/authStore';

export const useAuth = () => {
  const { setUser, logout } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const user = await authApi.login(email, password);
      setUser(user);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const user = await authApi.signup(email, password);
      setUser(user);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { login, signup, logout, isLoading, error };
};