import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Recipe } from '../recipe';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss']
})

export class AddRecipeComponent implements OnInit{
  
  form: FormGroup;
  ingredientList: FormArray;

  constructor(private fb : FormBuilder){ 
  };

  createIngredient(): FormGroup {
    return this.fb.group({
      ingredient: [null, Validators.required],
      amount: [null, Validators.required]
    })
  }

  ngOnInit() {
    this.form = this.fb.group({
      title:[null, Validators.required],
      instruction:[null],
      ingredients: this.fb.array([this.createIngredient()])
    });
    this.ingredientList = this.form.get('ingredients') as FormArray;
  }

  addIngredient(){
    this.ingredientList.push(this.createIngredient());
  }

  removeIngredient(index){
    this.ingredientList.removeAt(index);
  }

  getIngredientsFormGroup(index) : FormGroup {
    this.ingredientList = this.form.get('ingredients') as FormArray;
    const formGroup = this.ingredientList.controls[index] as FormGroup;
    return formGroup;
  }

  get ingredientFormGroup(){
    return this.form.get('ingredients') as FormArray;
  }

  onSubmit(){
    
    var ingredientsArr = [];
    
    for(var i = 0; i < this.form.value.ingredients.length; i++){
      ingredientsArr.push({ingredient: this.form.value.ingredients[i].ingredient , amount: this.form.value.ingredients[i].amount})
    }

    const obj = {
      title: this.form.get('title').value,
      instruction: this.form.get('instruction').value,
      ingredients: ingredientsArr
    }

    return new Recipe(obj);
    //const recipe = new Recipe();
  }

}
