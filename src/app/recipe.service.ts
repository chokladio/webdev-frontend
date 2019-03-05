//Det är den här rackaren som ska hämta data från pythonservern
import { Injectable } from '@angular/core';
import { Recipe } from './recipe';
import { RECIPES } from './mock-recipes';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor() { }

  getRecipes(): Observable<Recipe[]> {
    return of(RECIPES);
  }

  getRecipe(id: number): Observable<Recipe> {
  // TODO: send the message _after_ fetching the recipe
  //this.messageService.add(`RecipeService: fetched recipe id=${id}`);
  return of(RECIPES.find(recipe => recipe.id === id));
}
}
