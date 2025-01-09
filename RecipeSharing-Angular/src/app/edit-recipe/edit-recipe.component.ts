import { Component } from '@angular/core';
import { RecipesService } from '../shared/services/recipes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../Models/User';
import { Constants } from '../Helpers/constants';
import { ApplianceType, DietaryPreferences, MealType, Recipe, RecipeAppliance, RecipeStep } from '../Models/Recipe';
import { FormControl } from '@angular/forms';
import { app } from '../../../server';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrl: './edit-recipe.component.css'
})
export class EditRecipeComponent {

  recipeId!: number;
  recipe: Recipe = new Recipe();
  recipeSteps: string[] = [];
  userId!: string;

  dietaryPreferences: DietaryPreferences = DietaryPreferences.Carnivore;
  image: string = '';
  imageToShow: string = '';
  name: string = '';
  preparationTime: number = 0;

  mealType = MealType.Breakfast; // Default selected value
  mealTypes = Object.entries(MealType)
    .filter(([key, value]) => !isNaN(Number(value))) // Filter numeric keys
    .map(([key, value]) => ({ key, value })); // Map to an array of objects

  dietaryPreferencesList = Object.entries(DietaryPreferences)
    .filter(([key, value]) => !isNaN(Number(value))) // Filter numeric keys
    .map(([key, value]) => ({ key, value })); // Map to an array of objects

  applianceTypes = Object.entries(ApplianceType)
  .filter(([key, value]) => !isNaN(Number(value))) // Filter numeric keys
  .map(([key, value]) => ({ key })); // Get enum values as an array

  selectedAppliances: ApplianceType[] = [ApplianceType.Oven];

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

      this.recipeSteps = this.recipe.recipeSteps;
      this.dietaryPreferences = this.recipe.dietaryPreferences;
      this.imageToShow = this.createImgPath(this.recipe.image);
      this.image = this.recipe.image;
      this.mealType = this.recipe.mealType;
      this.name = this.recipe.name;
      this.preparationTime = this.recipe.preparationTime;
      this.selectedAppliances = recipe.recipeAppliances.map(
        (appliance: any) => appliance as ApplianceType
      );
    });
  }

  addStep() {
    this.recipeSteps.push('');
  }

  deleteStep(index: number) {
    this.recipeSteps.splice(index, 1);
  }

  onImageUpload(event: any) {
    this.imageToShow = this.createImgPath(event.dbPath);
    this.image = event.dbPath; // Update the image path with the backend's uploaded file path
  }

  editRecipe() {
    this.recipe.dietaryPreferences = this.dietaryPreferences;
    this.recipe.image = this.image;
    this.recipe.mealType = this.mealType;
    this.recipe.name = this.name;
    this.recipe.preparationTime = this.preparationTime;
    this.recipe.userFk = this.userId;
    this.recipe.recipeSteps = this.recipeSteps;

    this.recipe.recipeAppliances = this.selectedAppliances.map((t: any) => {
      return { ApplianceType: ApplianceType[(t) as keyof typeof ApplianceType], } as RecipeAppliance;
    });

    this.recipeService.updateRecipe(this.recipeId, this.recipe).subscribe(() => {
      // succ
      this.router.navigate(['/my-recipes']);
    }, () => {
      // errr
    });
  }

  public createImgPath = (serverPath: string) => {
    if (serverPath !== null && serverPath !== '') {
      return `http://localhost:5216/` + serverPath;
    } else {
      return 'https://www.nestledessertsarabia.com/sites/site.prod1.nestledessertsarabia.com/files/default_images/recipe-default-image.png';
    }
  }
}
