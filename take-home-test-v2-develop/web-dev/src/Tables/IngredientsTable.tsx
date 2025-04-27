import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Chip, Tooltip } from "@mui/material";
import { Ingredient, IngredientType } from "../Types/Ingredient";
import { useMutationIngredientDelete } from "../Hooks/Mutation/IngredientsMutation";

import { ingredientChip } from "../shared/components/ingredients-related";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";


export function IngredientTable({
  ingredients, setForm,
}: {
  ingredients: Ingredient[], setForm: (ingredient: Ingredient) => void;
}): JSX.Element {
  const { mutateAsync: deleteIngredient } = useMutationIngredientDelete();

  const handlerButtonDelete = async (ingredient: Ingredient) => {
    await deleteIngredient(ingredient.id);
  };

  const ingredientName = (ingredient: Ingredient) => {
    if (!ingredient.type) {
      return (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <p>{ ingredient.name }</p>
              <Tooltip title="Ingredient with no type would not be selectable in recipes">
                <WarningAmberIcon sx={{ marginLeft: 2, color: 'red' }} />
              </Tooltip>
            </Box>
          </>
      )
    }

    return ingredient.name;
  }

  return (
    <Box className="tableContainer">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>My ingredients</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right" sx={{ paddingRight: 9 }}>Type</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ingredients.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">{ ingredientName(row) }</TableCell>
                <TableCell align="right">{row.price} €</TableCell>
                <TableCell align="right">
                  { ingredientChip(row.type) }
                </TableCell>
                <TableCell align="right">
                  <EditIcon onClick={() => setForm(row)} sx={{ cursor: 'pointer', fontSize: 20 }} />
                  <DeleteIcon onClick={() => handlerButtonDelete(row)} sx={{ cursor: 'pointer', color: 'red', fontSize: 20 }} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
