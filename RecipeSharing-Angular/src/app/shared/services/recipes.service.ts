import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

    public updateRecipe(id: number, recipeDto: Recipe) {
        return this.http.put(this.baseUrl + '/api/recipe/' + id, recipeDto);
    }

    public searchRecipes(searchCriteria: { name: string; mealType: string; dietaryPreferences: string }): Observable<Recipe[]> {
      let params = new HttpParams();
      if (searchCriteria.name) params = params.set('name', searchCriteria.name);
      if (searchCriteria.mealType) params = params.set('mealType', searchCriteria.mealType);
      if (searchCriteria.dietaryPreferences) params = params.set('dietaryPreferences', searchCriteria.dietaryPreferences);

      return this.http.get<Recipe[]>(`${this.baseUrl}/api/recipe/search`, { params });
    }


    public deleteRecipe(id: number) {
        return this.http.delete(this.baseUrl + '/api/recipe/' + id);
    }

    public getRecipesForUser(userId: string) {
      return this.http.get<Recipe[]>(this.baseUrl + '/api/recipe/user/' + userId);
    }

    public getLastThreeRecipes(): Observable<Recipe[]> {
      return this.http.get<Recipe[]>(this.baseUrl + `/api/recipe/last-three`);
    }

    public getRecipeById(id: number): Observable<Recipe> {
        return this.http.get<Recipe>(this.baseUrl + '/api/recipe/' + id);
    }
}
