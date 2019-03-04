import { Component, OnInit } from '@angular/core';
import {Recipe} from '../recipe';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {
  recipe: Recipe = {
    id: 1,
    name: 'Windstorm'
  };

  constructor() { }

  ngOnInit() { //called after creating component, put initialization stuff here
  }
}
