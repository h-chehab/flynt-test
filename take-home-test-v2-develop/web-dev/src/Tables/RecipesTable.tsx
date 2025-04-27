import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {Box, Button, Tooltip} from "@mui/material";
import {Recipe} from "../Types/Recipe";
import {Ingredient, IngredientType} from "../Types/Ingredient";
import {useMutationRecipeDelete} from "../Hooks/Mutation/RecipeMutation";
import {useQueryValidIngredientList} from "../Hooks/Query/IngredientQuery";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

export function RecipesTable({ recipes }: { recipes: Recipe[] }): JSX.Element {
  const { mutateAsync: deleteRecipe } = useMutationRecipeDelete();
  const { refetch: refetchValidIngredientList } = useQueryValidIngredientList();

  const handlerButtonDelete = async (recipe: Recipe) => {
    await deleteRecipe(recipe.id);
    refetchValidIngredientList()
  };

  const computePriceByIngredient = (ingredients: Ingredient[]) => {
    return ingredients.reduce((acc, ingredient) => {
      return acc + ingredient.price;
    }, 0);
  };

  // This method should be moved to the backend when we fetch the recipes
  const recipeName = (recipe: Recipe) => {
    // Sort ingredients
    const { proteins, starch } = recipe.ingredients.reduce((acc: { proteins: Ingredient[], starch: Ingredient[]}, ingredient) => {

        if (ingredient.type === IngredientType.PROTEINS) acc.proteins.push(ingredient);
        else if (ingredient.type === IngredientType.STARCH) acc.starch.push(ingredient);

        return acc;
    }, { proteins: [], starch: [] });

    // Check if there is too many proteins or starch sources
    const isInvalidRecipe = proteins.length > 1 || starch.length > 1;

    if (isInvalidRecipe) {
      return (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <p>{ recipe.name }</p>
              <Tooltip title="This recipe is invalid due to the fact that there is too many proteins or starch sources">
                <WarningAmberIcon sx={{ marginLeft: 2, color: 'red' }} />
              </Tooltip>
            </Box>
          </>
      )
    }

    return recipe.name;
  }


  return (
    <Box className="tableContainer">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>My recipes</TableCell>
              <TableCell align="right">Time to cook</TableCell>
              <TableCell align="right">Number of people</TableCell>
              <TableCell align="right">Ingredients</TableCell>
              <TableCell align="right">Total price</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recipes.map((row, index) => (
              <TableRow
                key={`recipe_name${index}`}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {recipeName(row)}
                </TableCell>
                <TableCell align="right">{row.timeToCook}</TableCell>
                <TableCell align="right">{row.numberOfPeople}</TableCell>
                <TableCell align="right">
                  {row.ingredients.map((ingredient, index) => {
                    return <p key={`ing_name${index}`}>{ingredient.name}</p>;
                  })}
                </TableCell>
                <TableCell align="right">
                  {computePriceByIngredient(row.ingredients) *
                    row.numberOfPeople}
                  €
                </TableCell>
                <TableCell align="right">
                  <Button onClick={() => handlerButtonDelete(row)}>
                    DELETE
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
