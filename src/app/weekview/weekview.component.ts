import { Component, OnInit } from '@angular/core';
import { SelectedDaysService } from '../selecteddays.service';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-weekview',
  templateUrl: './weekview.component.html',
  styleUrls: ['./weekview.component.scss']
})
export class WeekviewComponent implements OnInit {
  selectedDays = []

  constructor(private recipeService: RecipeService, private sds: SelectedDaysService) { }

  ngOnInit() {

    /*
    pull new backend!
    run server first. (only one recipe in database currently) Then:
    */

    /*
    Examples of how to use the recipe service. Note the addRecipe:
    The entirety of the app is depending on which recipes are added to the service.
    Consider this our store of states, i.e. not unlike redux store.
    Every page will fetch data from the recipe service,
    So on re-randomize or if customer isn't happy with the generated selection =>
    delete from service, and add the new one.
    */
    
    const allRecipes = this.recipeService.getRecipesAPI().subscribe(recipes => {
      console.log(recipes);
    })
    
    //apply randomize function to allRecipes and return array of same size as 
    //the number of true values in selectedDays.
    //then ->
    //recipes.forEach(recipe => this.recipeService.addRecipe(recipe));

    //when customer generates new recipe for a day -> delete previous recipe
    //this.recipeService.removeRecipe(id)
    //add new recipe.
    /*
    this.recipeService.getRecipeAPI('3b05bd629af20456700e1058526a8f43').subscribe(recipe => {
      console.log(recipe);
    })
    */
    this.sds.getSelectedDays().map(val => this.selectedDays.push(val));
    console.log(this.selectedDays);
    console.log(this.recipeService.getStoredRecipes());
    this.recipeService.removeRecipe('3b05bd629af20456700e1058526a8f43');
    console.log(this.recipeService.getStoredRecipes());

  }

}
