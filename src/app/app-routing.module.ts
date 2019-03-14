import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { WeekviewComponent } from './weekview/weekview.component';
import { ShoppinglistComponent } from './shoppinglist/shoppinglist.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'recipes', component: RecipesComponent },
  { path: 'detail/:id', component: RecipeDetailComponent },
  { path: 'weekview', component: WeekviewComponent },
  { path: 'shoppinglist', component: ShoppinglistComponent },
  { path: 'addrecipe', component: AddRecipeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
