import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task, TaskStatus } from '../types';

interface TaskState {
  tasks: Task[];
  filter: TaskStatus | 'all';
  searchQuery: string;
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  updateTask: (updated: Task) => void;
  removeTask: (id: string) => void;
  setFilter: (filter: TaskStatus | 'all') => void;
  setSearchQuery: (query: string) => void;
  getFilteredTasks: () => Task[];
  rehydrateFilter: () => Promise<void>;
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  filter: 'all',
  searchQuery: '',

  setTasks: (tasks) => set({ tasks }),
  addTask: (task) => set((s) => ({ tasks: [task, ...s.tasks] })),
  updateTask: (updated) =>
    set((s) => ({
      tasks: s.tasks.map((t) => (t.id === updated.id ? updated : t)),
    })),
  removeTask: (id) =>
    set((s) => ({ tasks: s.tasks.filter((t) => t.id !== id) })),

  setFilter: (filter) => {
    set({ filter });
    // Persist last selected filter
    AsyncStorage.setItem('last_filter', filter);
  },

  setSearchQuery: (query) => set({ searchQuery: query }),

  getFilteredTasks: () => {
    const { tasks, filter, searchQuery } = get();
    return tasks
      .filter((t) => filter === 'all' || t.status === filter)
      .filter((t) =>
        t.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
  },

  // Restore last filter on app start
  rehydrateFilter: async () => {
    try {
      const saved = await AsyncStorage.getItem('last_filter');
      if (saved) set({ filter: saved as TaskStatus | 'all' });
    } catch {
      // ignore
    }
  },
}));