import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { authDefaults } from '../constants/authDefaults';
import { IRecipe } from '../types/recipe';

interface Recipe {
  recipe: IRecipe;
  error: string;
  isError: boolean;
  setError: (msg: string) => void;
}

export const useRecipe = create<Recipe>(
  devtools((set) => ({
    recipe: {
      id: '',
      author: authDefaults,
      name: '',
      est_price: 0,
      cook_duration: 0,
      cook_video: '',
      ingredients: [],
      meal_thumbnail: '',
      recipe_tags: [''],
      createdAt: '',
    },
    error: '',
    isError: false,
    setError: (msg: string) =>
      set((state) => ({ ...state, error: msg, isError: true })),
  }))
);
