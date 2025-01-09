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
  recipeSteps: string[] = [];
  recipeAppliances: RecipeAppliance[] = [];
}

export class RecipeStep {
  text!: string;
}

export class RecipeAppliance {
  ApplianceType!: ApplianceType;
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

export enum ApplianceType {
  Microwave,
  Blender,
  Processor,
  Toaster,
  RiceCooker,
  Juicer,
  Stove,
  Oven,
  AirFryer,
  DeepFryer,
  Mixer,
  Grill
};
