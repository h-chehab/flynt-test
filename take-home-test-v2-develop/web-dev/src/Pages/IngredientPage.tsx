import { useState } from "react";
import { Box, Button } from "@mui/material";
import { useQueryIngredientList } from "../Hooks/Query/IngredientQuery";
import { Loader } from "../Components/Loader";
import { ErrorPage } from "./ErrorPage";
import { IngredientTable } from "../Tables/IngredientsTable";
import { CreateIngredientForm } from "../Forms/CreateIngredientForm";
import {Ingredient} from "../Types/Ingredient";

export function IngredientPage(): JSX.Element {
  const { data, status, isLoading, refetch } = useQueryIngredientList();
  const [isCreationMode, setIsCreationMode] = useState(false);
  const [ingredientForm, setIngredientForm] = useState<null | Ingredient>(null);

  const handleIngredientFormChange = (ingredient: Ingredient | null) => {
    setIsCreationMode(true);
    setIngredientForm(ingredient);
  }

  const activeCreationMode = () => {
    setIsCreationMode(true);
  };

  const cancelCreationMode = () => {
    setIsCreationMode(false);
    setIngredientForm(null);
  };

  const fetchIngredientsAfterAddition = async (): Promise<void> => {
    await refetch();
    setIngredientForm(null);
    // We might want to close the form after addition in a real life scenario
    // setIsCreationMode(false);
  }



  if (status === "error") {
    return <ErrorPage />;
  }
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div id="recipes-pages">
      <h1>INGREDIENTS</h1>
      <Box>
        <Button
          onClick={isCreationMode ? cancelCreationMode : activeCreationMode}
          variant="outlined"
        >
          {isCreationMode ? "Cancel creation" : "Create new ingredient"}
        </Button>
      </Box>
      <Box display={"flex"} gap={2}>
        {isCreationMode && <CreateIngredientForm fetchIngredients={fetchIngredientsAfterAddition} ingredientToUpdate={ingredientForm} />}
        <IngredientTable ingredients={data} setForm={handleIngredientFormChange} />
      </Box>
    </div>
  );
}
