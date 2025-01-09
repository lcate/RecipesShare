import { Component } from '@angular/core';
import { ApplianceType, DietaryPreferences, MealType, Recipe } from '../Models/Recipe';
import { Router } from '@angular/router';
import { RecipesService } from '../shared/services/recipes.service';
import { Constants } from '../Helpers/constants';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { text } from 'node:stream/consumers';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrl: './add-recipe.component.css'
})
export class AddRecipeComponent {

  public recipe: Recipe = new Recipe();
  dbPath!: any;

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

  userFk: string = '';

  constructor (private service: RecipesService, private router: Router, private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      mealType: [MealType.Breakfast, Validators.required],  // Ensure this form control is defined here
      dietaryPreferences: [DietaryPreferences.Carnivore, Validators.required],
      preparationTime: ['', Validators.required],
      steps: this.fb.array([this.createStep()]),
      applianceTypes: '',
    });
  }

  ngOnInit() {
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
