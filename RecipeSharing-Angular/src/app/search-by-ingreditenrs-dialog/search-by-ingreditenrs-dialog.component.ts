import { Component } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Ingredient } from '../Models/Ingredient';
import { IngredientsService } from '../shared/services/ingredients.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-search-by-ingreditenrs-dialog',
  templateUrl: './search-by-ingreditenrs-dialog.component.html',
  styleUrl: './search-by-ingreditenrs-dialog.component.css'
})
export class SearchByIngreditenrsDialogComponent {
  ingredientsList: Ingredient[] = [];
  filteredIngredients: Ingredient[] = [];
  allowAddNew: boolean = false;
  ingredientInput: string = '';
  formGroup: FormGroup;

  constructor(
    private ingredientService: IngredientsService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<SearchByIngreditenrsDialogComponent> // Added dialogRef
  ) {
    this.formGroup = this.fb.group({
      ingredients: this.fb.array([this.createIngredient()])
    });
  }

  ngOnInit() {
    this.loadIngredients();
  }

  onIngredientSelected(index: number, event: any): void {
    const selectedIngredient = event.option.value;
    this.ingredients.at(index).patchValue({ name: selectedIngredient });
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

  get ingredients(): FormArray {
    return this.formGroup.get('ingredients') as FormArray;
  }

  addIngredient(): void {
    this.ingredients.push(this.createIngredient());
  }

  removeIngredient(index: number): void {
    if (this.ingredients.length > 1) {
      this.ingredients.removeAt(index);
    }
  }

  createIngredient(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
    });
  }

  search() {
    this.dialogRef.close(this.formGroup.value.ingredients); // Modified to return selected ingredients
  }

  closeDialog() {
    this.dialogRef.close(null); // Allow closing without returning data
  }
}
