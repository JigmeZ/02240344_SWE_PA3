import { create } from 'zustand';
import { Category } from '../types';

interface CategoryState {
  categories: Category[];
  setCategories: (cats: Category[]) => void;
}

export const useCategoryStore = create<CategoryState>((set) => ({
  categories: [],
  setCategories: (cats) => set({ categories: cats }),
}));