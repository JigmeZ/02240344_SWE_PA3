import { User } from '../types';

// Dummy auth — simulates token-based login without a real auth server
export const authApi = {
  login: async (email: string, password: string): Promise<User> => {
    await new Promise((res) => setTimeout(res, 800)); // simulate network delay

    if (password.length < 6) {
      throw new Error('Invalid credentials. Please try again.');
    }

    return {
      email,
      token: `dummy-token-${Date.now()}`,
    };
  },

  signup: async (email: string, password: string): Promise<User> => {
    await new Promise((res) => setTimeout(res, 800));

    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters.');
    }

    return {
      email,
      token: `dummy-token-${Date.now()}`,
    };
  },
};