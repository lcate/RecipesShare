import { Component } from '@angular/core';
import { RecipesService } from '../shared/services/recipes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Constants } from '../Helpers/constants';
import { ApplianceType, DietaryPreferences, MealType, MeasurementUnit, Recipe, RecipeAppliance, RecipeIngredient, RecipeStep } from '../Models/Recipe';
import { IngredientsService } from '../shared/services/ingredients.service';
import { Ingredient } from '../Models/Ingredient';

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
  ingredients: RecipeIngredient[] = [];

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

  ingredientsList: Ingredient[] = [];
  filteredIngredients: Ingredient[] = [];
  allowAddNew: boolean = false;
  ingredientInput: string = '';

  selectedAppliances: ApplianceType[] = [ApplianceType.Oven];

  measurementUnits = Object.entries(MeasurementUnit)
  .filter(([key, value]) => !isNaN(Number(value))) // Filter numeric keys
  .map(([key, value]) => ({ key, value })); // Get enum values as an array

  constructor(private route: ActivatedRoute,private ingredientService: IngredientsService, private recipeService: RecipesService, private router: Router)
         { }

  ngOnInit(): void {
    this.loadIngredients();
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
    this.recipeService.getRecipeById(id).subscribe((recipe) => {
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
      this.ingredients = recipe.recipeIngredients;

      // Set preselected ingredient name correctly
      this.ingredients.forEach((ingredient, index) => {
        // Find the ingredient from the list that matches the stored ingredient name
        const foundIngredient = this.ingredientsList.find(
          (item) => item.name === ingredient.ingredientName
        );
        if (foundIngredient) {
          this.ingredients[index].ingredientName = foundIngredient.name;
        }
      });
    });
  }


  loadIngredients(): void {
    this.ingredientService.getAllIngredients().subscribe({
      next: (data) => {
        this.ingredientsList = data;
      },
      error: (err) => {
        console.error('Error fetching ingredients:', err);
      },
    });
  }

  onIngredientSelected(index: number, event: any): void {
    const selectedIngredient = event.option.value;
    // Update the ingredient name with the selected option
    this.ingredients[index].ingredientName = selectedIngredient;
  }


  onIngredientInput(index: number, event: Event): void {
    const input = (event.target as HTMLInputElement).value;
    this.ingredientInput = input;

    // Filter the ingredients list based on the input value
    this.filteredIngredients = this.ingredientsList.filter((ingredient) =>
      ingredient.name.toLowerCase().includes(input.toLowerCase())
    );

    // Check if the input matches an existing ingredient in the list
    this.allowAddNew = !this.filteredIngredients.some(
      (ingredient) => ingredient.name.toLowerCase() === input.toLowerCase()
    );
  }

  addIngredient() {
    this.ingredients.push({ ingredientName: '', quantity: 1, measurementUnit: MeasurementUnit.Cups });
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
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
    this.recipe.recipeIngredients = this.ingredients;

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
