import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import { SelectedDaysService } from '../selecteddays.service';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { isNullOrUndefined, isUndefined } from 'util';
import { AlertBoxComponent } from '../dashboard/alert-box/alert-box.component';
import { WVAlertBoxComponent } from './wv-alert-box/wv-alert-box.component';

import { Day } from '../day';
import { Recipe } from '../recipe';
import { RecipeService } from '../recipe.service';
import { RecipesComponent } from '../recipes/recipes.component';

@Component({
  selector: 'app-weekview',
  templateUrl: './weekview.component.html',
  styleUrls: ['./weekview.component.scss']
})

export class WeekviewComponent implements OnInit {
  selectedDays = []
  selectedRecipe: Recipe;
  allRecipes: Recipe[] = [];
  selectedDay: Day;
  loaded:false;

  constructor(private sds: SelectedDaysService, private recipeService: RecipeService, private router: Router, private dialog: MatDialog) { }

  warn() {
    this.dialog.open(WVAlertBoxComponent);
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

    this.sds.getSelectedDays().map(val => this.selectedDays.push(val));
    if (this.selectedDays.length === 0) {
      //Promise is required, otherwise we try to load a dialog before the view has been initialized.
      //In the future, consider placing alert window in ngAfterViewInit instead.
      Promise.resolve().then(() => this.warn());
    } else {
      this.recipeService.getRecipesAPI().subscribe(recipes => {
        this.allRecipes = recipes
        let newDays = [];
        if (this.recipeService.getStoredRecipes().length === 0) {
          this.selectedDays.forEach(day => {
            if (day.selected === true) {
              let recipe_id = Math.floor(Math.random() * this.allRecipes.length);
              while (this.recipeService.getStoredRecipes().filter((recipe: Recipe) => recipe.recipe_id === this.allRecipes[recipe_id].getID()).length !== 0) {
                recipe_id = Math.floor(Math.random() * this.allRecipes.length);
                console.log(recipe_id);
              }
              let newRecipe = this.allRecipes[recipe_id];
              newRecipe.setDay(day.day);
              this.recipeService.addRecipe(newRecipe);
              newDays.push({ ...day, recipe_id: newRecipe.getID(), title: newRecipe.title });
            }
          })
        } else {
          let index = 0;

          this.selectedDays.forEach(day => {
              this.recipeService.getStoredRecipes().forEach((recipe: Recipe) => {
                if (recipe.day === day.day) {
                  newDays.push({ ...day, recipe_id: recipe.getID(), title: recipe.title });
                }
              })
          })
        }
        this.selectedDays = newDays;
        console.log(this.recipeService.getStoredRecipes())
      });
    }
    console.log(this.selectedDays);
    this.loaded = true;
  }

  onSelect(day: Day): void {
    let recipe = this.recipeService.getStoredRecipes().filter((recipe: Recipe) => recipe.recipe_id === day.recipe_id)[0];
    this.selectedRecipe = recipe;
    this.selectedDay = day;
  }

  generateNew() {
      let recipe_id = Math.floor(Math.random() * this.allRecipes.length);
      while (this.recipeService.getStoredRecipes().filter((recipe: Recipe) => recipe.recipe_id === this.allRecipes[recipe_id].getID()).length !== 0) {
        recipe_id = Math.floor(Math.random() * this.allRecipes.length);
        console.log(recipe_id);
      }
      this.recipeService.removeRecipe(this.selectedDay.recipe_id);
      let newRecipe = this.allRecipes[recipe_id];
      newRecipe.setDay(this.selectedDay.day);
      this.recipeService.addRecipe(newRecipe);
      let newDay = { ...this.selectedDay, recipe_id: newRecipe.getID(), title: newRecipe.title };
      this.selectedDays[this.selectedDays.indexOf(this.selectedDay)] = newDay
      this.onSelect(newDay);
      console.log(this.recipeService.getStoredRecipes());
    }

  buildSelectedDays() {
    let newDays = [];
    let index = 0;
    this.sds.getSelectedDays().map(val => this.selectedDays.push(val));
    this.selectedDays.forEach(day => {
      if (day.selected === true) {
        let recipe_id = Math.floor(Math.random() * this.allRecipes.length);
        console.log(this.allRecipes[recipe_id]);
        this.recipeService.addRecipe(this.allRecipes[recipe_id]);
        newDays.push({ ...day, recipe_id: index, title: this.recipeService.getStoredRecipes()[index].title });
        index++
      }
    }
    )
    this.selectedDays = newDays;
  }



  private getWeekNumber() {
    let d = new Date();
    var dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    return Math.ceil((((d.valueOf() - yearStart.valueOf()) / 86400000) + 1)/7)
  }

  saveWeek() {
    let week = {weekNumber: this.getWeekNumber().toString(),
      days: JSON.stringify(this.selectedDays)}
    localStorage.setItem(week.weekNumber, week.days)
  }

  getWeek(weekNumber) {
    let JSONweek = localStorage.getItem(weekNumber);
    let week = JSON.parse(JSONweek);
    this.selectedDays = week;
  }

}
