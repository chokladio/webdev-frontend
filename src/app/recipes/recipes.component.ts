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

  constructor(private recipeService: RecipeService) { }

  ngOnInit() { //called after creating component, put initialization stuff here
    this.getRecipes();
  }

  getRecipes(): void {
    this.recipeService.getRecipesAPI()
      .subscribe(recipes => this.recipes = recipes);
  }
}
