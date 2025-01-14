import { Component } from '@angular/core';
import { ApplianceType, DietaryPreferences, MealType, MeasurementUnit, Recipe } from '../Models/Recipe';
import { Router } from '@angular/router';
import { RecipesService } from '../shared/services/recipes.service';
import { Constants } from '../Helpers/constants';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { IngredientsService } from '../shared/services/ingredients.service';
import { Ingredient } from '../Models/Ingredient';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrl: './add-recipe.component.css'
})
export class AddRecipeComponent {

  public recipe: Recipe = new Recipe();
  dbPath!: any;
  ingredientsList: Ingredient[] = [];
  filteredIngredients: Ingredient[] = [];
  allowAddNew: boolean = false;
  ingredientInput: string = '';

  formGroup: FormGroup;
  applianceTypes = Object.entries(ApplianceType)
  .filter(([key, value]) => !isNaN(Number(value))) // Filter numeric keys
  .map(([key, value]) => ({ key, value })); // Map to an array of objects
  mealTypes = Object.entries(MealType)
    .filter(([key, value]) => !isNaN(Number(value))) // Filter numeric keys
    .map(([key, value]) => ({ key, value })); // Map to an array of objects
  dietaryPreferencesList = Object.entries(DietaryPreferences)
    .filter(([key, value]) => !isNaN(Number(value))) // Filter numeric keys
    .map(([key, value]) => ({ key, value })); // Map to an array of objects

  measurementUnits = Object.entries(MeasurementUnit)
    .filter(([key, value]) => !isNaN(Number(value))) // Filter numeric keys
    .map(([key, value]) => ({ key, value })); // Map to an array of objects

  userFk: string = '';

  constructor (private service: RecipesService, private ingredientService: IngredientsService, private router: Router, private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      mealType: [MealType.Breakfast, Validators.required],  // Ensure this form control is defined here
      dietaryPreferences: [DietaryPreferences.Carnivore, Validators.required],
      preparationTime: ['', Validators.required],
      steps: this.fb.array([this.createStep()]),
      ingredients: this.fb.array([this.createIngredient()]), // Ingredients array
      applianceTypes: '',
    });
  }

  ngOnInit() {
    this.loadIngredients();
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem(Constants.USER_KEY);
      if (user) {
        this.userFk = JSON.parse(user).user.id;
      }
    }
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formGroup.patchValue({
        image: file
      });
    }
  }

  onIngredientSelected(index: number, event: any): void {
    const selectedIngredient = event.option.value;
    this.ingredients.at(index).patchValue({ ingredientName: selectedIngredient });
  }

  onIngredientInput(index: number, event: Event): void {
    const input = (event.target as HTMLInputElement).value;
    this.ingredientInput = input;

    // Filter the ingredients list
    this.filteredIngredients = this.ingredientsList.filter((ingredient) =>
      ingredient.name.toLowerCase().includes(input.toLowerCase())
    );

    // Allow adding a new ingredient if the input doesn't match any existing one
    this.allowAddNew = !this.filteredIngredients.some(
      (ingredient) => ingredient.name.toLowerCase() === input.toLowerCase()
    );
  }

  loadIngredients(): void {
    this.ingredientService.getAllIngredients().subscribe({
      next: (data) => {
        this.ingredientsList = data; // Assume the API returns an array of ingredient objects
      },
      error: (err) => {
        console.error('Error fetching ingredients:', err);
      },
    });
  }

  addRecipe() {
    this.recipe.dietaryPreferences = this.formGroup.controls['dietaryPreferences'].value!;
    this.recipe.image = this.dbPath;
    this.recipe.mealType = this.formGroup.controls['mealType'].value!;
    this.recipe.name = this.formGroup.controls['name'].value!;
    this.recipe.preparationTime = this.formGroup.controls['preparationTime'].value!;
    this.recipe.userFk = this.userFk;
    this.recipe.recipeSteps = this.steps.value.map((step: any) => ({
      text: step.stepDescription,
    }));
    this.recipe.recipeAppliances = this.formGroup.controls['applianceTypes'].value!.map((t: any) => ({
      ApplianceType: ApplianceType[(t.key) as keyof typeof ApplianceType],
    }));
    this.recipe.recipeIngredients = this.ingredients.value.map((ingredient: any) => ({
      quantity: ingredient.amount,
      measurementUnit: ingredient.unit,
      ingredientName: ingredient.ingredientName
    }));

    this.service.addRecipe(this.recipe)
      .subscribe({
        next: () => {
        this.router.navigate(['/my-recipes']);
        },
        error: () => {
        // errr
        }
      });
  }

  createIngredient(): FormGroup {
    return this.fb.group({
      amount: ['', [Validators.required, Validators.min(1)]],
      unit: ['', Validators.required],
      ingredientName: ['', Validators.required],
    });
  }

  addIngredient(): void {
    this.ingredients.push(this.createIngredient());
  }

  removeIngredient(index: number): void {
    if (this.ingredients.length > 1) {
      this.ingredients.removeAt(index);
    }
  }

  get ingredients(): FormArray {
    return this.formGroup.get('ingredients') as FormArray;
  }

  get steps() {
    return (this.formGroup.get('steps') as unknown as FormArray);
  }

  createStep(): FormGroup {
    return this.fb.group({
      stepDescription: ['', Validators.required]
    });
  }

  addStep(): void {
    this.steps.push(this.createStep());
  }

  removeStep(index: number): void {
    if (this.steps.length > 1) {
      this.steps.removeAt(index);
    }
  }

  public uploadFinished = (event: any) => {
    this.dbPath = event.dbPath;
  }
}
