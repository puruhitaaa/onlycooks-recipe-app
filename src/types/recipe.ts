import { IUser } from './user';

export type Ingredient = {
  id: string;
  name: string;
  qty: string;
  price: number;
};

export interface IRecipe {
  id: string;
  author: IUser;
  name: string;
  ingredients?: Ingredient[];
  est_price: number;
  likes?: IUser[];
  stars?: IUser[];
  cook_duration: number;
  cook_video: string;
  meal_thumbnail: string;
  recipe_tags: [string];
  createdAt: string;
}
