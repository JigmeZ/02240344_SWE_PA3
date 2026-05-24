import { useState, useEffect } from 'react';
import { categoriesApi } from '../api/categoriesApi';
import { useCategoryStore } from '../store/categoryStore';

export const useCategories = () => {
  const { categories, setCategories } = useCategoryStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await categoriesApi.getAll();
      setCategories(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (categories.length === 0) fetchCategories();
  }, []);

  return { categories, isLoading, error, fetchCategories };
};