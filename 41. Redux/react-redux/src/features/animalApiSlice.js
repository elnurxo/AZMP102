import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_API_URL } from "../constants";

export const animalsApiSlice = createApi({
  reducerPath: "animalsApi", // Name of the slice
  baseQuery: fetchBaseQuery({ baseUrl: BASE_API_URL }), // Base API URL
  endpoints: (builder) => ({
    getAnimals: builder.query({
      query: () => "/animals", // Endpoint to fetch animals
    }),
    deleteAnimal: builder.mutation({
      query: (id) => ({
        url: `/animals/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          animalsApiSlice.util.updateQueryData(
            "getAnimals",
            undefined,
            (draft) => {
              return draft.filter((user) => user.id !== id);
            }
          )
        );
        try {
          await queryFulfilled; // Wait for the server's confirmation
        } catch {
          patchResult.undo(); // Revert changes if deletion fails
        }
      },
    }),
    addAnimal: builder.mutation({
      query: (newAnimal) => ({
        url: "/animals",
        method: "POST",
        body: newAnimal, // Pass the new animal data in the request body
      }),
      //optimistic update
      onQueryStarted(newAnimal, { dispatch }) {
        dispatch(
          animalsApiSlice.util.updateQueryData(
            "getAnimals",
            undefined,
            (draft) => {
              draft.push(newAnimal); // Optimistically add the new animal
            }
          )
        );
      },
    }),
  }),
});

export const { useGetAnimalsQuery, useDeleteAnimalMutation } = animalsApiSlice;
