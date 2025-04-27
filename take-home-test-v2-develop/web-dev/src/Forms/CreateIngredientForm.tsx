import {useEffect, useState} from "react";
import { Ingredient, IngredientType } from "../Types/Ingredient";
import { CardCustom } from "../Components/CardCustom";
import { useMutationIngredientCreate, useMutationIngredientUpdate } from "../Hooks/Mutation/IngredientsMutation";
import { Snackbar, Alert, Box, Button, FormControl, TextField, Select, MenuItem, InputLabel } from "@mui/material";


export function CreateIngredientForm({ fetchIngredients, ingredientToUpdate }: { fetchIngredients: Function, ingredientToUpdate: Ingredient | null }): JSX.Element {
  const { mutateAsync: createIngredient } = useMutationIngredientCreate();
  const { mutateAsync: updateIngredient } = useMutationIngredientUpdate();
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);

  const [alertData, setAlertData]  = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "info",
  });

  const resetFields = () => {
    setName("");
    setType("");
    setPrice(0);
  };

  useEffect(() => {
    if (ingredientToUpdate) {
      setName(ingredientToUpdate.name);
      setType(ingredientToUpdate.type);
      setPrice(ingredientToUpdate.price);
    }
  }, [ingredientToUpdate]);

  const handleAlertClose = () => {
    setAlertData({
        open: false,
        message: "",
        severity: "info",
    })
  };

  const handlerSubmitNewIngredient = async () => {
    // if (name === undefined || name === "" || price === undefined) {
    //   alert("Please fill all the fields");
    //   return;
    // }

    try {
       !ingredientToUpdate
          ? await createIngredient({ name, price, type })
          : await updateIngredient({ ...ingredientToUpdate, name, price, type });

      setAlertData({
        open: true,
        severity: "success",
        message: `Ingredient ${ingredientToUpdate ? 'updated' : 'created'} successfully!`,
      });
      resetFields();
      fetchIngredients();
    } catch (error: any) {
      setAlertData({
        open: true,
        severity: "error",
        message: error.message
      });
    }
  };

  const handleSelectChange = (event: any) => {
    setType(event.target.value as string);
  }

  return (
    <div id="create-recipes-form">
      <Box
        display="flex"
        justifyContent="space-between"
        className="MarginTop16Px"
      >
        <CardCustom isSmall>
          <h2>New ingredient</h2>
          <FormControl fullWidth margin="normal">
            <TextField
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name-recipe"
              label="Name of the ingredient"
              variant="outlined"
              fullWidth
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              value={price}
              onChange={(e) =>
                e.target.value ? setPrice(Number(e.target.value)) : setPrice(0)
              }
              id="name-recipe"
              label="price"
              variant="outlined"
              type="number"
              fullWidth
            />
            <span className="SmallTextExplanation">
              *Keep in mind that the price is for one person. Prices are
              multiplied by the number of people in the recipe.
            </span>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="ingredient-type-select">Ingredient Type</InputLabel>
            <Select
                labelId="ingredient-type-select-label"
                id="ingredient-select"
                value={type}
                label="Ingredient Type"
                onChange={handleSelectChange}
            >
              <MenuItem value={IngredientType.STARCH}>{IngredientType.STARCH}</MenuItem>
              <MenuItem value={IngredientType.PROTEINS}>{IngredientType.PROTEINS}</MenuItem>
              <MenuItem value={IngredientType.VEGETABLE}>{IngredientType.VEGETABLE}</MenuItem>
            </Select>
          </FormControl>

          <FormControl margin="normal">
            <Button onClick={handlerSubmitNewIngredient} variant="contained" disabled={!name || !price || !type}>
              Submit
            </Button>
          </FormControl>

        </CardCustom>


        <Snackbar open={alertData.open} autoHideDuration={3000} onClose={handleAlertClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} >
            <Alert onClose={handleAlertClose} severity={alertData.severity} sx={{ width: '100%' }}>
              { alertData.message }
            </Alert>
        </Snackbar>

      </Box>
    </div>
  );
}
