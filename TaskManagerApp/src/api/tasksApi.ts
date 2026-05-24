import client from './client';
import { Task } from '../types';

export const tasksApi = {
  getAll: async (): Promise<Task[]> => {
    const res = await client.get('/tasks');
    return res.data;
  },

  getById: async (id: string): Promise<Task> => {
    const res = await client.get(`/tasks/${id}`);
    return res.data;
  },

  create: async (data: Omit<Task, 'id' | 'createdAt'>): Promise<Task> => {
    const res = await client.post('/tasks', data);
    return res.data;
  },

  update: async (id: string, data: Partial<Task>): Promise<Task> => {
    const res = await client.put(`/tasks/${id}`, data);
    return res.data;
  },

  remove: async (id: string): Promise<void> => {
    await client.delete(`/tasks/${id}`);
  },
};