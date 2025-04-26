import {getManager, getRepository} from "typeorm";
import {Recipe} from "../Entities/Recipe";

export class RecipeService {
  static async list(): Promise<Recipe[]> {
    return await getRepository(Recipe).find({
      relations: ["ingredients"],
    });
  }

  static async checkIfProteinsAreUsedInRecipes(ingredientsId: number[]) {
    const entityManager = getManager();

    if (!ingredientsId.length) return 0;

    return await entityManager.query(`
        SELECT COUNT(*) FROM recipe_ingredients_ingredient AS rcp
        LEFT JOIN ingredient AS igt ON igt.id = rcp."ingredientId"
        WHERE igt.type = 'proteins' AND rcp."ingredientId" IN (${ingredientsId.join(",")});
    `);
  }

  static async create(recipe: Recipe): Promise<Recipe> {
    return await getRepository(Recipe).save(recipe);
  }

  static async update(recipe: Recipe): Promise<Recipe> {
   return await getRepository(Recipe).save(recipe);
  }

  static async delete(id: number): Promise<void> {
    await getRepository(Recipe).delete(id);
  }
}
