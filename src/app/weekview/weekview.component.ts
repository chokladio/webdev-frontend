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
  recipes = []

  constructor(private sds:SelectedDaysService, private recipeService: RecipeService,private router: Router, private dialog: MatDialog) { }

  warn() {
    this.dialog.open(AlertBoxComponent);
    this.router.navigate(['/dashboard'])
  }

  ngOnInit() {
    this.getRecipes()
    this.buildSelectedDays()
    if (this.selectedDays.length === 0) {
      this.warn();
    }
    console.log(this.selectedDays);
    console.log(this.recipes);
  }


  getRecipes(): void {
    this.recipeService.getRecipes()
      .subscribe(recipes => this.recipes = recipes);
  }

  onSelect(day: Day): void {
    let recipe = this.recipes[day.recipeId];
    this.selectedRecipe = recipe;
  }

  buildSelectedDays() {
    let newDays = [];
    this.sds.getSelectedDays().map(val => this.selectedDays.push(val));
    this.selectedDays.forEach(day =>
      {if (day.selected === true) {
        let recipeId = Math.floor(Math.random() * this.recipes.length);
        newDays.push({...day, recipeId: recipeId, recipeName: this.recipes[recipeId].name});
      }}
    )
    this.selectedDays = newDays;

  }

}
