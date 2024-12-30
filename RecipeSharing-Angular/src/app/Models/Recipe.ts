import { User } from "./User";

export class Recipe {
  id!: number;
  name!: string;
  image!: string;
  userFk!: string;
  preparationTime!: number;
  mealType!: MealType;
  dietaryPreferences!: DietaryPreferences;
  user!: User;
  createdOn!: Date;
}

export enum DietaryPreferences {
  Omnivore,
  Vegetarian,
  Vegan,
  Carnivore,
  Pescatarian,
  Keto,
  Paleo
};

export enum MealType {
  Breakfast,
  Brunch,
  Lunch,
  Dinner,
  Dessert,
  Drink,
  Snack
};
