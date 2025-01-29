import { Component } from '@angular/core';
import { RecipesService } from '../shared/services/recipes.service';
import { Recipe } from '../Models/Recipe';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css'],  // Corrected styleUrl to styleUrls
})
export class RecipesListComponent {
  public recipes: Recipe[] = [];
  public recipe: Recipe = new Recipe();
  public length: number = 0;

  public currentPage = 1;
  public itemsPerPage = 4;
  public totalPages: number = 0;
  public paginatedRecipes: Recipe[] = [];
  public pages: number[] = [];

  constructor(private service: RecipesService) {}

  ngOnInit() {
    this.getRecipes();  // Fetch the recipes when the component is initialized
  }

  private getRecipes() {
    this.service.getRecipes().subscribe(recipes => {
      this.recipes = recipes;
      this.length = recipes.length;

      // After recipes are fetched, update pagination logic
      this.totalPages = Math.ceil(this.recipes.length / this.itemsPerPage);
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
      this.updatePaginatedRecipes(); // Update the first page of recipes
    });
  }

  updatePaginatedRecipes(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedRecipes = this.recipes.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePaginatedRecipes();
  }

  public createImgPath = (serverPath: string) => {
    if (serverPath !== null && serverPath !== '') {
      return `http://localhost:5216/` + serverPath;
    } else {
      return 'https://www.nestledessertsarabia.com/sites/site.prod1.nestledessertsarabia.com/files/default_images/recipe-default-image.png';
    }
  };
}
