import { User } from "./User";

export class RecipeAddDto {
  id!: number;
  name!: string;
  image!: string;
  userFk!: string;
  preparationTime!: number;
  mealType!: number;
  dietaryPreferences!: number;
  user!: User;
}
