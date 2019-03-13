import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Recipe } from '../recipe';
import { RecipeService } from '../recipe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})

export class RecipesComponent implements OnInit {
  recipes: Recipe[];
  selectedRecipe: Recipe;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;


  constructor(private router: Router, private recipeService: RecipeService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 1420px)'); //byt till mode=over när det inte längre får plats dubbla kolumner med recept till vänster om sidenav
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() { //called after creating component, put initialization stuff here
    this.getRecipes();
  }

  getRecipes(): void {
    this.recipeService.getRecipesAPI()
      .subscribe(recipes => this.recipes = recipes);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  setSelected(recipe: Recipe): void {
    this.selectedRecipe = recipe;
  }

  addRecipe() {
    this.router.navigate(['/addrecipe'])
  }
}
