import {Recipe} from "../../Entities/Recipe";
import {Ingredient, IngredientType} from "../../Entities/Ingredient";
import {RecipeService} from "../../Services/RecipeService";
import {IngredientService} from "../../Services/IngredientService";

// This interface should be shared from another files
interface RecipeRequestData {
    name: string;
    timeToCook: number;
    numberOfPeople: number;
    ingredients: number[];
}

export class RecipeDomain {

    // Todo: upsert recipes with another variable (boolean) that would handle update and ceration
    static async upsertRecipe(recipe: RecipeRequestData, isUpdate: boolean = false): Promise<Recipe> {
        // Fetch Ingredients from an Ids list
        console.log('>>>>>>>>>>>>>>>>> in here');
        const fetchedIngredients = await IngredientService.getIngredientsByIdsList(recipe.ingredients);

        //  Sort ingredients by type
        const { proteins, starches }  = fetchedIngredients.reduce((acc: { proteins: number[], starches: number[]}, ingredient: Ingredient) => {
            if (ingredient.type === IngredientType.PROTEINS) acc.proteins.push(ingredient.id);
            else if (ingredient.type === IngredientType.STARCH) acc.starches.push(ingredient.id);

            return acc;
        }, { proteins: [], starches: [] });

        const areProteinsFoundInRecipes = await RecipeService.checkIfProteinsAreUsedInRecipes(proteins);

        // Check Proteins and starches quantity
        if (proteins.length > 1 || starches.length > 1) throw new Error("You can only have one protein and one starch in a recipe");

        // Check if at least one of the proteins is used in a recipe.
        // This is important because Front-end check cannot be trusted by its own.
        if (areProteinsFoundInRecipes[0].count > 0) throw new Error("You cannot use proteins that are already used in a recipe");

        // This variable is created there because, if there is an error above, we do not want to create a useless variable
        const recipeToCreate: Recipe = {...recipe, ingredients: fetchedIngredients} as Recipe;

        return !isUpdate
            ? await RecipeService.create(recipeToCreate)
            : await RecipeService.update(recipeToCreate);
    }
}
