//Det är den här rackaren som ska hämta data från pythonservern
import { Injectable } from '@angular/core';
import { Recipe } from './recipe';
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Observable, } from 'rxjs';
import { map, } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private recipes: Recipe[] = [];
  baseUrl: string = 'http://localhost:7007/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
  }
  removeRecipe(id) {
    this.recipes = this.recipes.filter((recipe:Recipe) => recipe.recipe_id !== id);
  }

  clearRecipes() {
    this.recipes = [];
  }

  getRecipesAPI(): Observable<Recipe[]> {
    return this.httpClient.get(`${this.baseUrl}recipes/all`).pipe(
      map((data: any[]) => data.map ((item:any) => new Recipe(
        item
      ))),

    );
  }

  createNewRecipeAPI(recipe:Recipe): Observable<string> {
    return this.httpClient.post<string>(`${this.baseUrl}recipes/create`,JSON.stringify(recipe),this.httpOptions)
  }


  getStoredRecipes() {
    return this.recipes;
  }

  getRecipeAPI(id): Observable<Recipe> {
    return this.httpClient.get<Recipe>(`${this.baseUrl}recipes/${id}`).pipe(
      map(res => new Recipe(res)))
  }

}
