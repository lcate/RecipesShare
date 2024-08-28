import { Component } from '@angular/core';
import { Recipe } from '../Models/Recipe';
import { Router } from '@angular/router';
import { RecipesService } from '../shared/services/recipes.service';
import { Constants } from '../Helpers/constants';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrl: './add-recipe.component.css'
})
export class AddRecipeComponent {

  public recipe: Recipe = new Recipe();

  userFk: string = '';
  dietaryPreferences: number = 0;
  mealType: number = 0;
  image: string = '';
  name: string = '';
  preparationTime: number = 0;

  constructor (private service: RecipesService, private router: Router) {}

  ngOnInit() {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem(Constants.USER_KEY);
      if (user) {
        this.userFk = JSON.parse(user).id;
      }
    }
  }

  addRecipe() {
    this.recipe.dietaryPreferences = this.dietaryPreferences;
    this.recipe.image = this.image;
    this.recipe.mealType = this.mealType;
    this.recipe.name = this.name;
    this.recipe.preparationTime = this.preparationTime;
    this.recipe.userFk = this.userFk;
    this.service.addRecipe(this.recipe).subscribe(() => {
      // succ
    this.router.navigate(['/my-recipes']);
    }, () => {
      // errr
    });
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
