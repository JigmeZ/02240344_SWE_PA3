import { useState, useEffect, useCallback } from 'react';
import { tasksApi } from '../api/tasksApi';
import { useTaskStore } from '../store/taskStore';
import { Task } from '../types';

export const useTasks = () => {
  const { setTasks, addTask, updateTask, removeTask, getFilteredTasks } = useTaskStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const clearMessages = () => {
    setError(null);
    setSuccess(null);
  };

  const fetchTasks = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const tasks = await tasksApi.getAll();
      setTasks(tasks);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createTask = async (data: Omit<Task, 'id' | 'createdAt'>) => {
    setIsLoading(true);
    clearMessages();
    try {
      const task = await tasksApi.create(data);
      addTask(task);
      setSuccess('Task created successfully!');
      return true;
    } catch (e: any) {
      setError(e.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const editTask = async (id: string, data: Partial<Task>) => {
    setIsLoading(true);
    clearMessages();
    try {
      const updated = await tasksApi.update(id, data);
      updateTask(updated);
      setSuccess('Task updated successfully!');
      return true;
    } catch (e: any) {
      setError(e.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTask = async (id: string) => {
    setIsLoading(true);
    clearMessages();
    try {
      await tasksApi.remove(id);
      removeTask(id);
      setSuccess('Task deleted.');
      return true;
    } catch (e: any) {
      setError(e.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return {
    tasks: getFilteredTasks(),
    isLoading,
    error,
    success,
    fetchTasks,
    createTask,
    editTask,
    deleteTask,
  };
};