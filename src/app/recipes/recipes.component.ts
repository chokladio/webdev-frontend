import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe';
import { RECIPES } from '../mock-recipes';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {
  recipes = RECIPES;
  selectedRecipe: Recipe;

  constructor() { }

  ngOnInit() { //called after creating component, put initialization stuff here
  }

  onSelect(recipe: Recipe): void {
    this.selectedRecipe = recipe;
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.recipes, event.previousIndex, event.currentIndex);
  }
}
