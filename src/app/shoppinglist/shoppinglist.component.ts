import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe';

@Component({
  selector: 'app-shoppinglist',
  templateUrl: './shoppinglist.component.html',
  styleUrls: ['./shoppinglist.component.scss']
})
export class ShoppinglistComponent implements OnInit {
  private recipes: Recipe[];
  private allIngredients = [];
  private clearedIngredients = [];


  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipes = this.recipeService.getStoredRecipes()
    //this.ingredients = [].concat.apply([],this.ingredients);
    console.log(this.recipes);
    this.sortData();
  }

  apiCreateTest() {
    if (this.recipes !== undefined || this.recipes.length !== 0) {
      this.recipeService.createNewRecipeAPI(this.recipes[0]).subscribe(res =>
        console.log(res)
      );
    }
  }
  //For creating a cleaner shoppinglist, not yet finished.
  sortData() {
    const allIngredients = this.recipes.map(recipe => {
      return recipe.ingredients
    })
    const flatIngredients = [].concat.apply([], allIngredients);
    this.allIngredients = flatIngredients;

    let copy = flatIngredients.map(str => {
      return str.replace(/ *\([^)]*\) */g, " ").trim()
    })

    const units = ['cup','teaspoon', 'tablespoons', 'tablespoon', 'pound', 'dash', 'cups', 'can'];
    var regx = new RegExp(units.join("|"),"");
    copy.forEach((ingredient, index) => {
      copy[index] = ingredient.replace(regx,'');
    })
    this.clearedIngredients = copy;

  }

}
