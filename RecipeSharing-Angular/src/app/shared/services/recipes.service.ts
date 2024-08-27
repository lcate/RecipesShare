import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../Environments/environment';
import { Recipe } from '../../Models/Recipe';

@Injectable({
    providedIn: 'root'
})
export class RecipesService {
    private baseUrl: string = environment.baseUrl;

    constructor(private http: HttpClient) { }

    public addRecipe(recipeDto: Recipe) {
        return this.http.post(this.baseUrl + '/api/recipe', recipeDto);
    }

    public updateRecipe(id: number, recipe: Recipe) {
        return this.http.put(this.baseUrl + '/api/recipe/' + id, recipe);
    }

    public getRecipes(): Observable<Recipe[]> {
        return this.http.get<Recipe[]>(this.baseUrl + `/api/recipe`);
    }

    public deleteRecipe(id: number) {
        return this.http.delete(this.baseUrl + '/api/recipe/' + id);
    }

    public getRecipesForUser(userId: string) {
      return this.http.get<Recipe[]>(this.baseUrl + '/api/recipe/user/' + userId);
    }

    public getRecipeById(id: number): Observable<Recipe> {
        return this.http.get<Recipe>(this.baseUrl + '/api/recipe/' + id);
    }
}
