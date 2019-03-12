export class Recipe {
  recipe_id: string;
  title: string;
  recipe_url: string;
  directions: string;
  ingredients:(string | number)[];
  day: string;


  constructor(data: Object|Recipe) {
    Object.assign(this,data);
  }


  getID() {
    return this.recipe_id;
  }

  setDay(day: string) {
    this.day = day;
  }
}
