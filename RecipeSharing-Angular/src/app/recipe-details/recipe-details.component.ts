import { Component } from '@angular/core';
import { Recipe } from '../Models/Recipe';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService } from '../shared/services/recipes.service';
import { Constants } from '../Helpers/constants';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.css'
})
export class RecipeDetailsComponent {

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
    this.userId = JSON.parse(localStorage.getItem(Constants.USER_KEY)!).user.id;
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
}
