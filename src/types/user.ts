import { IRecipe } from './recipe';

export type Social = {
  name: string;
  social_handle: string;
  social_url: string;
};

export interface IUser {
  id: string;
  fullName: string;
  avatar_url: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  description: string;
  socials: Social[];
  followers: IUser[];
  followings: IUser[];
  followerCount: number;
  followingCount: number;
  liked_recipes: IRecipe[];
  starred_recipes: IRecipe[];
  likedRecipeCount: number;
  starredRecipeCount: number;
  gender: string;
  token: string;
  createdAt: string;
}
