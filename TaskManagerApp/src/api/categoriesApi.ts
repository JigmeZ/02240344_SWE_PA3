import client from './client';
import { Category } from '../types';

export const categoriesApi = {
  getAll: async (): Promise<Category[]> => {
    const res = await client.get('/categories');
    return res.data;
  },

  create: async (data: Omit<Category, 'id'>): Promise<Category> => {
    const res = await client.post('/categories', data);
    return res.data;
  },
};