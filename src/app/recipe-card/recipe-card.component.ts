import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Recipe } from '../recipe';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss']
})

export class RecipeCardComponent implements OnInit {
  @Input() recipe: Recipe;
  @Input() drawer: Promise;
  @Input() selectedRecipe: Recipe;

  @Output() selRec = new EventEmitter<Recipe>();

  constructor() { }

  ngOnInit() { }

  onSelect(recipe: Recipe): void {
    this.selRec.emit(recipe);
  }

  onFavorite(recipe: Recipe): void {
    localStorage.setItem(recipe.recipe_id, this.getLocalValue(recipe.recipe_id) == '1' ? '0' : '1');
  }

  getLocalValue(key: string): string {
    return localStorage.getItem(key);
  }
}
