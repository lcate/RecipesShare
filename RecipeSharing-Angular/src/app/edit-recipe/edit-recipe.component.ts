import { Component } from '@angular/core';
import { RecipesService } from '../shared/services/recipes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../Models/User';
import { Constants } from '../Helpers/constants';
import { Recipe } from '../Models/Recipe';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrl: './edit-recipe.component.css'
})
export class EditRecipeComponent {

  recipeId!: number;
  recipe: Recipe = new Recipe();
  userId!: string;

  dietaryPreferences: number = 0;
  mealType: number = 0;
  image: string = '';
  name: string = '';
  preparationTime: number = 0;

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
    this.userId = JSON.parse(localStorage.getItem(Constants.USER_KEY)!).id;
    this.getRecipeById(this.recipeId);


    // this.getCommentsByJobApplicationId();
  }

  private getRecipeById(id: number) {
    this.recipeService.getRecipeById(id).subscribe(recipe => {
      this.recipe = recipe;

      this.dietaryPreferences = this.recipe.dietaryPreferences;
      this.image = this.recipe.image;
      this.mealType = this.recipe.mealType;
      this.name = this.recipe.name;
      this.preparationTime = this.recipe.preparationTime;
    });
  }

  editRecipe() {
    this.recipe.dietaryPreferences = this.dietaryPreferences;
    this.recipe.image = this.image;
    this.recipe.mealType = this.mealType;
    this.recipe.name = this.name;
    this.recipe.preparationTime = this.preparationTime;
    this.recipe.userFk = this.userId;
    this.recipeService.updateRecipe(this.recipeId, this.recipe).subscribe(() => {
      // succ
      this.router.navigate(['/my-recipes']);
    }, () => {
      // errr
    });
  }
}
