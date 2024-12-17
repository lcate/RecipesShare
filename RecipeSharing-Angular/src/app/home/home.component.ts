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

  constructor(private service: RecipesService) {}

  ngOnInit() {
    this.getRecipes();
  }

  private getRecipes() {
    this.service.getLastThreeRecipes().subscribe(recipes => {
      this.recipes = recipes;
    });
  }

  public createImgPath = (serverPath: string) => {
    if (serverPath !== null && serverPath !== '') {
      return `http://localhost:5216/` + serverPath;
    } else {
      return 'https://www.nestledessertsarabia.com/sites/site.prod1.nestledessertsarabia.com/files/default_images/recipe-default-image.png';
    }
  }
}
