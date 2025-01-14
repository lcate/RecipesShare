import { Injectable } from "@angular/core";
import { environment } from "../../Environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Ingredient } from "../../Models/Ingredient";

@Injectable({
    providedIn: 'root'
})
export class IngredientsService {
    private baseUrl: string = environment.baseUrl;

    constructor(private http: HttpClient) { }

    public getAllIngredients(): Observable<Ingredient[]> {
        return this.http.get<Ingredient[]>(this.baseUrl + `/api/ingredient`);
    }
}
