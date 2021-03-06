import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <-- NgModel lives here
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MyMaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecipesComponent } from './recipes/recipes.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { WeekviewComponent } from './weekview/weekview.component';
import { ShoppinglistComponent } from './shoppinglist/shoppinglist.component';
import { AlertBoxComponent } from './dashboard/alert-box/alert-box.component';
import { WVAlertBoxComponent } from './weekview/wv-alert-box/wv-alert-box.component';
import { RecipeCardComponent } from './recipe-card/recipe-card.component';


@NgModule({
  declarations: [
    AppComponent,
    RecipesComponent,
    RecipeDetailComponent,
    DashboardComponent,
    HeaderComponent,
    WeekviewComponent,
    ShoppinglistComponent,
    AlertBoxComponent,
    WVAlertBoxComponent,
    RecipeCardComponent,
    AddRecipeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MyMaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    MatSnackBarModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    AlertBoxComponent,
    WVAlertBoxComponent
  ]

})
export class AppModule { }
