import { IngredientService } from "../../Services/IngredientService";


export class IngredientsForRecipesDomain {
    public static async validIngredients() {
        return await IngredientService.validIngredients();
    }
}


