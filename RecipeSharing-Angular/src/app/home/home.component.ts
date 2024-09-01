import { Component } from '@angular/core';
import { Recipe } from '../Models/Recipe';
import { RecipesService } from '../shared/services/recipes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

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
    });
  }

}
