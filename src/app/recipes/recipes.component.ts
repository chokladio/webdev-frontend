import { Component, OnInit } from '@angular/core';

import { Recipe } from '../recipe';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})

export class RecipesComponent implements OnInit {
  recipes: Recipe[];
  selectedRecipe: Recipe;
  constructor(private recipeService: RecipeService) { }

  ngOnInit() { //called after creating component, put initialization stuff here
    this.getRecipes();
  }

  getRecipes(): void {
    this.recipeService.getRecipesAPI()
      .subscribe(recipes => this.recipes = recipes);
  }

  onSelect(recipe: Recipe): void {
    this.selectedRecipe = recipe;
  }

  onFavorite(recipe: Recipe): void {
    let f = localStorage.getItem(recipe.recipe_id);
    localStorage.setItem(recipe.recipe_id,f=='1'?'0':'1');
    console.log(localStorage);
  }

  getLocalValue(key: string): string {
    return localStorage.getItem(key);
  }
}
