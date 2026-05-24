export type TaskStatus = 'todo' | 'in-progress' | 'done';

export interface Category {
  id: string;
  name: string;
  color: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  categoryId: string;
  createdAt: string;
}

export interface User {
  email: string;
  token: string;
}

export interface ApiError {
  message: string;
  status?: number;
}