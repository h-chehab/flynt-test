import {RecipeService} from "../Services/RecipeService";
import {RecipeDomain} from "../Domains/Recipes/RecipesDomain";


export class RecipeController {
  public static async list(req: any, res: any, next: any): Promise<void> {
    try {
      const recipes = await RecipeService.list();
      res.send(recipes);
    } catch (err) {
      console.error("[RecipeController.list] Error listing recipes", err);
      res.send(500);
    }
  }

  public static async create(req: any, res: any, next: any): Promise<void> {
    try {
      const recipe = await RecipeDomain.upsertRecipe(req.body);
      res.status(200).json({ status: 200, recipe });
    } catch (err: any) {
      console.error("[RecipeController.create] Error creating recipe", err);
      res.status(400).json({ statusCode: 400 , message: err.message });
    }
  }

  public static async update(req: any, res: any, next: any): Promise<void> {
    try {
      const recipe = await RecipeDomain.upsertRecipe(req.body, true);
      res.send(recipe);
    } catch (err) {
      console.error("[RecipeController.update] Error updating recipe", err);
      res.send(500);
    }
  }

  public static async delete(req: any, res: any, next: any): Promise<void> {
    try {
      await RecipeService.delete(req.params.id);
      res.send();
    } catch (err) {
      console.error("[RecipeController.delete] Error deleting recipe", err);
      res.send(500);
    }
  }
}
