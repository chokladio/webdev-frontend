import { Component, OnInit } from '@angular/core';
import { RecipeService} from '../recipe.service';

@Component({
  selector: 'app-shoppinglist',
  templateUrl: './shoppinglist.component.html',
  styleUrls: ['./shoppinglist.component.scss']
})
export class ShoppinglistComponent implements OnInit {
  private ingredients = [];

  constructor(private recipeService : RecipeService ) { }

  ngOnInit() {
    this.ingredients = this.recipeService.getStoredRecipes()
    .map(recipe => {return recipe.ingredients})
    this.ingredients = [].concat.apply([],this.ingredients);
    console.log(this.ingredients);
  }

}
