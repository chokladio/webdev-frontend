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
  private clearedIngredients;
  private extraIngredients;


  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipes = this.recipeService.getStoredRecipes()
    this.processData();
  }
  /*
  apiCreateTest() {
    if (this.recipes !== undefined || this.recipes.length !== 0) {
      this.recipeService.createNewRecipeAPI(this.recipes[0]).subscribe(res =>
        console.log(res)
      );
    }
  }
  */
  /*Processing the ingredients data to separate units and amount and clean up data. Not perfect. We should've done this in the backend, when scraping recipes, but i wanted to include it 
    here to see how the data can be processed.
  */
  processData() {
    const allIngredients = this.recipes.map(recipe => {
      return recipe.ingredients
    })
    const flatIngredients = [].concat.apply([], allIngredients);
    this.allIngredients = flatIngredients;

    let copy = flatIngredients.map(str => {
      return str.replace(/ *\([^)]*\) */g, " ").trim()
    })

    const replaceUnits = ['sprigs', 'sprig', 'cups', 'teaspoons', 'teaspoon', 'tablespoons', 'tablespoon', 'pounds', 'pound', 'dash', 'cans', 'can', 'cup', 'pinch', 'slices', 'ounces', 'ounce', 'packages', 'package', 'cloves', 'clove'];
    const units = [];
    var regx = new RegExp(replaceUnits.join("|"), "");
    copy.forEach((ingredient, index) => {
      if (regx.test(ingredient)) {
        copy[index] = ingredient.replace(regx, function (match) {
          units.push(match);
          return '';
        }).trim();
      } else {
        units.push('');
      }
    })
    const amount = [];
    //I love this dataset.
    //Match any digit, one to unlimited times, optionally one forward slash, until first whitespace.
    //However, after whitespace, if the serie continues, match digits, optional forward slash, until next whitespace.
    //The ingredients may look like: 1 1/2 ounces. 3/4 onion
    var regx2 = new RegExp('^\\d*[\\/]*?[\\s]*\\d+[\\/]*[^\\s]?')
    copy.forEach((ingredient, index) => {
      if (regx2.test(ingredient)) {
        copy[index] = ingredient.replace(regx2, function (match) {
          amount.push(match);
          return '';
        }).trim()
      } else {
        amount.push('');
      }
    })
    //Purge non-essential descriptory words.
    //I.e. chopped onion == onion however, fresh parsley != dried parsley.
    //Why do they constantly give instructions in the ingredient listing?
    let nones = ['coarsely', 'removed', 'if', 'divided', 'chunks', 'small', 'medium', 'thinly', 'seeded', 'cover', 'enough', 'quartered', 'topping', 'deveined', 'peeled', 'softened', 'beaten', 'taste', 'and', 'more', 'as', 'needed', 'halved', 'cut', 'into', 'cubes', 'taste', 'to', 'for', 'or', 'drained', 'finely', 'rinsed', 'chopped', 'shredded', 'softened', 'large', 'small', 'sliced', 'diced', 'crushed', 'cubed', 'cored', 'minced', 'melted']
    //make sure we don't randomly delete characters in other words.
    nones = nones.map(word => {
      return `\\b${word}\\b`
    })
    var regx3 = new RegExp(nones.join("|"), "g");
    copy.forEach((ingredient, index) => {
      copy[index] = ingredient.replace(regx3, '');
    })
    //remove commas.
    copy.forEach((ingredient, index) => {
      copy[index] = ingredient.replace(/,|-/g, '').trim();
    })
    //And extra white spaces.
    copy.forEach((ingredient, index) => {
      copy[index] = ingredient.replace(/\s\s+/, ' ');
    })

    var imap = new Map();
    /*
    {
      name:[unit,amount]
    }
    */
    const ingredientsExtra = [];
    var conversions = ['cup', 'cups', 'tablespoon', 'teaspoon', 'tablespoons', 'teaspoons']

    //Eval would work in this case, but eval is unsafe and should never be used in this scenario (script injection attacks)
    for (let i = 0; i < copy.length; i++) {
      let item = imap.get(copy[i]);
      if (item && Number(item[0]) !== NaN && Number(amount[i]) !== NaN) {
        if (item[1] === units[i] || item[1].concat('s') === units[i] || item[1] === '' || units[i] === '') { //cup===cups
          imap.set(copy[i], [+item[0] + +(this.fracToDec(amount[i])), units[i]])
        } else {
          if (conversions.includes(item[1]) && conversions.includes(units[i])) {
            // 1 teaspoon = 1/3 tablespoon. 
            // 1 cup = 16 tablespoons.
            // 1 cup = 48 teaspoons.
            var mapUnit = conversions[conversions.indexOf(item[1])]
            var newUnit = conversions[conversions.indexOf(units[i])]
            if ((mapUnit === 'tablespoon' || mapUnit === 'tablespoons') && (newUnit === 'teaspoon' || newUnit === 'teaspoons')) {
              imap.set(copy[i], [+item[0] + 3 * (+(this.fracToDec(amount[i]))), units[i]]);
            } else if ((mapUnit === 'teaspoon' || mapUnit === 'teaspoons') && (newUnit === 'tablespoon' || newUnit === 'tablespoons')) {
              imap.set(copy[i], [(+item[0]) / 3 + +(this.fracToDec(amount[i])), units[i]])
            } else if ((mapUnit === 'tablespoon' || mapUnit === 'tablespoons') && (newUnit === 'cup' || newUnit === 'cups')) {
              imap.set(copy[i], [(+item[0]) * 0.0625 + +(this.fracToDec(amount[i])), units[i]])
            }
            else if ((mapUnit === 'cup' || mapUnit === 'cups') && (newUnit === 'tablespoon' || newUnit === 'tablespoons')) {
              imap.set(copy[i], [(+item[0]) + 16 * (+(this.fracToDec(amount[i]))), units[i]])
            }
            else if ((mapUnit === 'teaspoon' || mapUnit === 'teaspoons') && (newUnit === 'cup' || newUnit === 'cups')) {
              imap.set(copy[i], [(+item[0]) * 0.02083 + +(this.fracToDec(amount[i])), units[i]])
            }
            else if ((mapUnit === 'cup' || mapUnit === 'cups') && (newUnit === 'teaspoon' || newUnit === 'teaspoons')) {
              imap.set(copy[i], [(+item[0]) + 48 * (+(this.fracToDec(amount[i]))), units[i]])
            }

          } else {
            ingredientsExtra.push([...item,copy[i]]);
            imap.set(copy[i], [item[0], units[i]])
          }
        }
      }
      else {
        imap.set(copy[i], [this.fracToDec(amount[i]), units[i]]);
      }
    }
    
    this.clearedIngredients = imap;
    this.extraIngredients = ingredientsExtra;
  }

  fracToDec(s) {
    var y = s.split(' ');
    if (y.length > 1) {
      var z = y[1].split('/');
      return (+y[0] + (+z[0] / +z[1]));
    }
    else {
      var z = y[0].split('/');
      if (z.length > 1) {
        return (+z[0] / +z[1]);
      }
      else {
        return (+z[0]);
      }
    }
  }

}
