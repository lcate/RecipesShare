import { Component } from '@angular/core';
import { Recipe } from '../Models/Recipe';
import { Router } from '@angular/router';
import { RecipesService } from '../shared/services/recipes.service';
import { Constants } from '../Helpers/constants';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrl: './add-recipe.component.css'
})
export class AddRecipeComponent {

  public recipe: Recipe = new Recipe();
  dbPath!: any;

  formGroup = new FormGroup({
    name: new FormControl("", [Validators.required]),
    image: new FormControl(null, [Validators.required]),
    mealType: new FormControl(0, [Validators.required]),
    dietaryPreferences: new FormControl(0, [Validators.required]),
    preparationTime: new FormControl(0, [Validators.required])
  });

  userFk: string = '';

  constructor (private service: RecipesService, private router: Router) {}

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
    this.recipe.dietaryPreferences = this.formGroup.controls.dietaryPreferences.value!;
    this.recipe.image = this.dbPath;
    this.recipe.mealType = this.formGroup.controls.mealType.value!;
    this.recipe.name = this.formGroup.controls.name.value!;
    this.recipe.preparationTime = this.formGroup.controls.preparationTime.value!;
    this.recipe.userFk = this.userFk;
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

  public uploadFinished = (event: any) => {
    this.dbPath = event.dbPath;
  }

  // updateRecipe() {
  //   // this.recipe.dietaryPreferences = this.dietaryPreferences;
  //   this.service.updateRecipe(this.recipe.id, this.recipe).subscribe(() => {
  //     // succ
  //     this.getRecipesForUser(this.userId);
  //   }, () => {
  //     // errr
  //   });
  // }
}
