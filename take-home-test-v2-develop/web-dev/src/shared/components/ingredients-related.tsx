import {Chip} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import GrassIcon from "@mui/icons-material/Grass";
import RiceBowlIcon from "@mui/icons-material/RiceBowl";
import KebabDiningIcon from "@mui/icons-material/KebabDining";
import {IngredientType} from "../../Types/Ingredient";

export const ingredientChip = (ingredientType: string): JSX.Element => {
    const chipMapper: Map<IngredientType | string | null, JSX.Element> =  new Map([
        [null, <Chip icon={<CloseIcon />} label="Not specified" color="warning" variant="outlined" sx={{ width: 130 }} />],
        [IngredientType.STARCH, <Chip icon={<RiceBowlIcon />} label="Startch" color="warning" variant="outlined" sx={{ width: 130 }} /> ],
        [IngredientType.VEGETABLE, <Chip icon={<GrassIcon />} label="Vegetable" color="success" variant="outlined" sx={{ width: 130 }} />],
        [IngredientType.PROTEINS, <Chip icon={<KebabDiningIcon />} label="Proteins" color="error" variant="outlined" sx={{ width: 130 }} />],
    ]);

    return chipMapper.get(ingredientType) as JSX.Element;
}
