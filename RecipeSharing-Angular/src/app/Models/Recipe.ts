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
  recipeIngredients: RecipeIngredient[] = [];
}

export class RecipeStep {
  text!: string;
}

export class RecipeIngredient {
  measurementUnit!: MeasurementUnit;
  quantity!: number;
  ingredientName: string = '';
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

export enum MeasurementUnit {
  Grams,
  Milligrams,
  Kilograms,
  Ounces,
  Liters,
  Milliliters,
  Teaspoons,
  Tablespoons,
  Cups
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
