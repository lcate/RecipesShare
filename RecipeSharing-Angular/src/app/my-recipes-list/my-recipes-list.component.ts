import { Component } from '@angular/core';
import { Recipe } from '../Models/Recipe';
import { RecipesService } from '../shared/services/recipes.service';
import { Constants } from '../Helpers/constants';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';

@Component({
  selector: 'app-my-recipes-list',
  templateUrl: './my-recipes-list.component.html',
  styleUrl: './my-recipes-list.component.css'
})
export class MyRecipesListComponent {
  public recipes: Recipe[] = [];
  public userId: string = '';

  public paginatedRecipes: Recipe[] = [];
  public currentPage = 1;
  public itemsPerPage = 10;
  public totalPages: number = 0;
  public pages: number[] = [];

  constructor(private service: RecipesService, private router: Router,
    private dialog: MatDialog) {}

  ngOnInit() {
    if (typeof window !== 'undefined' && localStorage.getItem(Constants.USER_KEY) !== null){
      this.userId = JSON.parse(localStorage.getItem(Constants.USER_KEY)!).user.id;
      this.getRecipesForUser(this.userId);
    }
  }

  private getRecipesForUser(userId: string) {
    this.service.getRecipesForUser(userId).subscribe(recipes => {
      this.recipes = recipes;
      this.totalPages = Math.ceil(this.recipes.length / this.itemsPerPage);
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
      this.updatePaginatedRecipes();
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

  addRecipeRedirect() {
    this.router.navigate(['/add-recipe']);
  }

  editRecipeRedirect(id: number) {
    this.router.navigate(['/edit-recipe/' + id]);
  }

  deleteRecipe(id: number) {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '300px', // You can change the width of the dialog
      maxWidth: '100vw', // Ensure the dialog does not overflow the screen width
      disableClose: true, // Prevent closing the dialog by clicking outside
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Proceed with deletion if the user confirmed
        this.service.deleteRecipe(id).subscribe(() => {
          this.getRecipesForUser(this.userId); // Refresh the list after deletion
          this.totalPages = Math.ceil(this.recipes.length / this.itemsPerPage);
          this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
          this.updatePaginatedRecipes();
        });
      }
    });
  }


  detailsRecipeRedirect(id: number) {
    this.router.navigate(['/recipe/details/' + id]);
  }

  createImgPath = (serverPath: string) => {
    return serverPath
      ? `http://localhost:5216/${serverPath}`
      : 'https://www.nestledessertsarabia.com/sites/site.prod1.nestledessertsarabia.com/files/default_images/recipe-default-image.png';
  };
}
