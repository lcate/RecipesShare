import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { MyRecipesListComponent } from './my-recipes-list/my-recipes-list.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    { path: 'authentication', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule) },
    { path: '', component: HomeComponent },
    { path: 'profile', component: UserProfileComponent },
    { path: 'recipes', component: RecipesListComponent },
    { path: 'my-recipes', component: MyRecipesListComponent },
    { path: 'add-recipe', component: AddRecipeComponent },
    { path: 'edit-recipe/:id', component: EditRecipeComponent },
    { path: 'recipe/details/:id', component: RecipeDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
