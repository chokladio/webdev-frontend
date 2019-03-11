export class Recipe {
  recipe_id: string;
  title: string;
  recipe_url: string;
  directions: string;
  ingredients:(string | number)[]

  constructor(data: Object|Recipe) {
    Object.assign(this,data);
  }


  getID() {
    return this.recipe_id;
  }
}
