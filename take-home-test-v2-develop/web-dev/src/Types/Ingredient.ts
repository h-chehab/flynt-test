export enum IngredientType {
  STARCH = "starch",
  PROTEINS = "proteins",
  VEGETABLE = "vegetable",
}

export interface Ingredient {
  id: number;
  name: string;
  price: number;
  type: IngredientType
}
