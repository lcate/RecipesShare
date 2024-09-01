import { Component } from '@angular/core';
import { Recipe } from '../Models/Recipe';
import { RecipesService } from '../shared/services/recipes.service';
import { Constants } from '../Helpers/constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-recipes-list',
  templateUrl: './my-recipes-list.component.html',
  styleUrl: './my-recipes-list.component.css'
})
export class MyRecipesListComponent {
  public recipes: Recipe[] = [];
  public userId: string = '';

  constructor(private service: RecipesService, private router: Router) {}

  ngOnInit() {
    if (typeof window !== 'undefined' && localStorage.getItem(Constants.USER_KEY) !== null){
      this.userId = JSON.parse(localStorage.getItem(Constants.USER_KEY)!).user.id;
      this.getRecipesForUser(this.userId);
    }
  }

  private getRecipesForUser(userId: string) {
    this.service.getRecipesForUser(userId).subscribe(recipes => {
      this.recipes = recipes;
    });
  }

  addRecipeRedirect() {
    this.router.navigate(['/add-recipe']);
  }

  editRecipeRedirect(id: number) {
    this.router.navigate(['/edit-recipe/' + id]);
  }

  detailsRecipeRedirect(id: number) {
    this.router.navigate(['/recipe/details/' + id]);
  }
}
