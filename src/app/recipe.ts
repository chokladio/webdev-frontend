import { getDiffieHellman } from "crypto";

export class Recipe {

  recipe_id: number;
  title: string;
  recipe_url: string;
  directions: string;
  portions: number;
  ingredients:(string | number)[]
  
  constructor(data: Object|Recipe) {
    Object.assign(this,data);
  }
  

  getID() {
    return this.recipe_id;
  }
}
