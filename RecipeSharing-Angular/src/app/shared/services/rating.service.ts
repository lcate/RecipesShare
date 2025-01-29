import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../Environments/environment';
import { Review } from '../../Models/Recipe';

@Injectable({
    providedIn: 'root'
})
export class RatingSerivce {
    private baseUrl: string = environment.baseUrl;

    constructor(private http: HttpClient) { }

    public addRating(ratingDto: Review) {
        return this.http.post(this.baseUrl + '/api/rating', ratingDto);
    }

    public getRatingsForRecipe(recipeId: number) {
      return this.http.get<Review[]>(this.baseUrl + '/api/rating/recipe/' + recipeId);
    }

    public deleteRating(id: number) {
      return this.http.delete(this.baseUrl + '/api/rating/' + id);
    }
}
