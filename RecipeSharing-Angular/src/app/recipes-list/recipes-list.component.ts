import { Component } from '@angular/core';
import { RecipesService } from '../shared/services/recipes.service';
import { Recipe } from '../Models/Recipe';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrl: './recipes-list.component.css'
})
export class RecipesListComponent {
  public recipes: Recipe[] = [];
  public recipe: Recipe = new Recipe();
  public length: number = 0;

  constructor(private service: RecipesService) {}

  ngOnInit() {
    this.getRecipes();
  }

  private getRecipes() {
    this.service.getRecipes().subscribe(recipes => {
      this.recipes = recipes;
      this.length = recipes.length;
    });
  }

}
