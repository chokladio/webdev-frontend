import { Component, OnInit } from '@angular/core';
import { SelectedDaysService } from '../selecteddays.service';
import { RecipeService } from '../recipe.service';
import { Day } from '../day';
import { Recipe } from '../recipe';
import { RecipesComponent } from '../recipes/recipes.component';
import { AlertBoxComponent } from '../dashboard/alert-box/alert-box.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { routerNgProbeToken } from '@angular/router/src/router_module';


@Component({
  selector: 'app-weekview',
  templateUrl: './weekview.component.html',
  styleUrls: ['./weekview.component.scss']
})
export class WeekviewComponent implements OnInit {
  selectedDays = []
  selectedRecipe: Recipe;
  allRecipes = [];
  selectedDay: Day;


  constructor(private sds:SelectedDaysService, private recipeService: RecipeService,private router: Router, private dialog: MatDialog) { }

  warn() {
    this.dialog.open(AlertBoxComponent);
    this.router.navigate(['/dashboard'])
  }

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
    
    this.recipeService.getRecipesAPI().subscribe(recipes => {this.allRecipes = recipes});
    console.log(this.allRecipes);

    //apply randomize function to allRecipes and return array of same size as 
    //the number of true values in selectedDays.
    //then ->
    //recipes.forEach(recipe => this.recipeService.addRecipe(recipe));

    //when customer generates new recipe for a day -> delete previous recipe
    //this.recipeService.removeRecipe(id)
    //add new recipe.

   // this.recipeService.getRecipeAPI('3b05bd629af20456700e1058526a8f43').subscribe(recipe => {
     // console.log(recipe);
    //})


    //this.buildSelectedDays()
    if (this.selectedDays.length === 0) {
      //this.warn();
    }
    console.log(this.selectedDays);
  }


  onSelect(day: Day): void {
    let recipe = this.recipeService.getStoredRecipes()[day.recipeId];
    this.selectedRecipe = recipe;
    this.selectedDay = day;
  }

  generateNew() {
    let recipeId = Math.floor(Math.random() * this.recipeService.getStoredRecipes().length);
    this.recipeService.removeRecipe(this.recipeService.getStoredRecipes()[this.selectedDay.recipeId].getID);
    let newDay = {...this.selectedDay, recipeId: recipeId, recipeName: 'TEST'};
    this.selectedDays[this.selectedDays.indexOf(this.selectedDay)] = newDay
  }

  buildSelectedDays() {
    let newDays = [];
    this.sds.getSelectedDays().map(val => this.selectedDays.push(val));
    this.selectedDays.forEach(day =>
      {if (day.selected === true) {
        let recipeId = Math.floor(Math.random() * this.allRecipes.length);
        this.recipeService.addRecipe(this.allRecipes[recipeId]);
        newDays.push({...day, recipeId: recipeId, recipeName: this.recipeService.getStoredRecipes()[recipeId].title});
      }}
    )
    this.selectedDays = newDays;
  }

}
