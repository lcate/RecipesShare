import { Component } from '@angular/core';
import { ApplianceType, DietaryPreferences, MealType, MeasurementUnit, Recipe, RecipeAppliance, RecipeIngredient, RecipeStep } from '../Models/Recipe';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService } from '../shared/services/recipes.service';
import { Constants } from '../Helpers/constants';
import { MeasureMemoryMode } from 'vm';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.css'
})
export class RecipeDetailsComponent {

  recipeId!: number;
  recipe: Recipe = new Recipe();
  userId!: string;

  dietaryPreferences: DietaryPreferences = DietaryPreferences.Omnivore;
  mealType: MealType = MealType.Breakfast;
  image: string = '';
  name: string = '';
  preparationTime: number = 0;
  recipeSteps: string[] = [];
  recipeAppliances: RecipeAppliance[] = [];
  recipeIngredients: RecipeIngredient[] = [];

  constructor(private route: ActivatedRoute, private recipeService: RecipesService, private router: Router)
  { }

  ngOnInit(): void {
    if (this.recipeId){
      this.recipeId = this.recipeId;
    } else {
      this.route.params.subscribe(params => {
        this.recipeId = params['id'];
      });
    }
    if (typeof window === 'undefined'){
      return;
    }

    if (localStorage.getItem(Constants.USER_KEY) !== null){
      this.userId = JSON.parse(localStorage.getItem(Constants.USER_KEY)!).user.id;
    }
    this.getRecipeById(this.recipeId);
  }

  private getRecipeById(id: number) {
    this.recipeService.getRecipeById(id).subscribe(recipe => {
      this.recipe = recipe;

      this.dietaryPreferences = this.recipe.dietaryPreferences;
      this.image = this.recipe.image;
      this.mealType = this.recipe.mealType;
      this.name = this.recipe.name;
      this.preparationTime = this.recipe.preparationTime;
      this.recipeSteps = this.recipe.recipeSteps;
      this.recipeAppliances = this.recipe.recipeAppliances;
      this.recipeIngredients = this.recipe.recipeIngredients;
    });
  }

  getMeasurementUnitString(unit: MeasurementUnit): string {
    switch (unit){
      case MeasurementUnit.Liters:
        return 'Liters';
      case MeasurementUnit.Cups:
        return 'Cups';
      case MeasurementUnit.Grams:
        return 'Grams';
      case MeasurementUnit.Kilograms:
        return 'Kilograms';
      case MeasurementUnit.Milligrams:
        return 'Milligrams';
      case MeasurementUnit.Milliliters:
        return 'Milliliters';
      case MeasurementUnit.Ounces:
        return 'Ounces';
      case MeasurementUnit.Tablespoons:
        return 'Tablespoons';
      case MeasurementUnit.Teaspoons:
        return 'Teaspoons';
      case MeasurementUnit.Cups:
        return 'Cups';
      default:
        return 'Unknown';
    }
  }

  getDietaryPreferenceString(preference: DietaryPreferences): string {
    switch (preference) {
      case DietaryPreferences.Omnivore:
        return 'Omnivore';
      case DietaryPreferences.Vegetarian:
        return 'Vegetarian';
      case DietaryPreferences.Vegan:
        return 'Vegan';
      case DietaryPreferences.Pescatarian:
        return 'Pescatarian';
      case DietaryPreferences.Carnivore:
        return 'Carnivore';
      case DietaryPreferences.Keto:
        return 'Keto';
      case DietaryPreferences.Paleo:
        return 'Paleo';
      default:
        return 'Unknown';
    }
  }


  getMealTypeString(mealType: MealType): string {
    switch (mealType) {
      case MealType.Breakfast:
        return 'Breakfast';
      case MealType.Brunch:
        return 'Brunch';
      case MealType.Dessert:
        return 'Dessert';
      case MealType.Dinner:
        return 'Dinner';
      case MealType.Drink:
        return 'Drink';
      case MealType.Lunch:
        return 'Lunch';
        case MealType.Snack:
          return 'Snack';
      default:
        return 'Unknown';
    }
  }

  public createImgPath = (serverPath: string) => {
    if (serverPath !== null && serverPath !== '') {
      return `http://localhost:5216/` + serverPath;
    } else {
      return 'https://www.nestledessertsarabia.com/sites/site.prod1.nestledessertsarabia.com/files/default_images/recipe-default-image.png';
    }
  }
}
