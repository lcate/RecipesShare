import { Component } from '@angular/core';
import { RecipesService } from '../shared/services/recipes.service';
import { RecipeAddDto } from '../Models/RecipeAddDto';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrl: './recipes-list.component.css'
})
export class RecipesListComponent {
  public recipes: RecipeAddDto[] = [];
  public recipe: RecipeAddDto = new RecipeAddDto();
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
