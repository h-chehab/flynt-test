import { useMutation, UseMutationResult, useQueryClient } from "react-query";
import axios from "../../Utils/axios";
import { Requests } from "../QueriesAndMutationList";

export const useMutationIngredientCreate = (): UseMutationResult<
  any,
  unknown,
  { name: string; price: number, type: string }
> => {
  const clientQuery = useQueryClient();

  return useMutation(
    [Requests.createIngredient],
    async ({ name, price, type }: { name: string; price: number, type: string }) => {
      return await axios.post(`/ingredient/create`, {
        name,
        price,
        type
      });
    },
    {
      onSuccess: () => {
        clientQuery.invalidateQueries(Requests.listRecipe);
      },
    }
  );
};

export const useMutationIngredientUpdate = (): UseMutationResult<
  any,
  unknown,
  { id: number, name: string; price: number, type: string }
> => {
  const clientQuery = useQueryClient();

  return useMutation(
      [Requests.updateIngredient],
      async ({ id, name, price, type }: { id: number, name: string; price: number, type: string }) => {
        return await axios.put(`/ingredient/update`, {
          id,
          name,
          price,
          type
        });
      },
      {
        onSuccess: () => {
          clientQuery.invalidateQueries(Requests.listRecipe);
        },
      }
  );
};

export const useMutationIngredientDelete = (): UseMutationResult<
  any,
  unknown,
  number
> => {
  const clientQuery = useQueryClient();

  return useMutation(
    [Requests.deleteIngredient],
    async (id: number) => {
      return await axios.delete(`/ingredient/delete/${id}`);
    },
    {
      onSuccess: () => {
        clientQuery.invalidateQueries(Requests.listIngredient);
      },
    }
  );
};
