export class Recipe {
  id: number;
  name: string;
  thumbnail: string;
  short_text: string;
  portions: number;
  ingredients:(string | number)[]
}
