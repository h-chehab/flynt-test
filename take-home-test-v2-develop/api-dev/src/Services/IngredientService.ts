import {In, getRepository, getManager } from "typeorm";
import {Ingredient} from "../Entities/Ingredient";

export class IngredientService {
  static async list(): Promise<Ingredient[]> {
    return await getRepository(Ingredient)
        .createQueryBuilder("ingredient")
        .orderBy("ingredient.type", "ASC")
        .getMany();
  }

  static async validIngredients(): Promise<Ingredient[]> {
    const entityManager = getManager();

    // Raw sql query for exercise sake
    return await entityManager.query(`
      SELECT igt.id, igt.name, igt.price, igt.type FROM ingredient AS igt
      LEFT JOIN recipe_ingredients_ingredient as rcp on rcp."ingredientId" = igt.id
      group by igt.id, rcp."recipeId"
      HAVING igt.type IS NOT NULL AND (igt.type != 'proteins' OR (igt.type = 'proteins' AND rcp."recipeId" IS NULL))
      ORDER BY igt.type ASC;
    `);
  }

  static async getIngredientsByIdsList(ids: number[]): Promise<Ingredient[]> {
    return await getRepository(Ingredient).find({
      where: { id: In(ids) },
    });
  }


  static async create(ingredient: Ingredient): Promise<Ingredient> {
    return await getRepository(Ingredient).save(ingredient);
  }

  static async update(ingredient: Ingredient): Promise<Ingredient> {
    return await getRepository(Ingredient).save(ingredient);
  }

  static async delete(id: number): Promise<void> {
    await getRepository(Ingredient).delete(id);
  }
}
