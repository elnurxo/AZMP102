import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchAllProducts,
  fetchProductById,
  createProduct,
  updateProduct,
  patchProduct,
  deleteProduct,
} from "../api/services/productService";

// Fetch all products
export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchAllProducts,
  });
};

// Fetch a single product by ID
export const useProduct = (id) => {
  return useQuery({
    queryKey: ["products", id],
    queryFn: () => fetchProductById(id),
    enabled: !!id, // Only fetch if ID is provided
  });
};

// Create a product with optimistic updates
export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]); // Refresh product list after creation
    },
  });
};

// Update a product with optimistic updates
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateProduct(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries(["products"]);
      const previousProducts = queryClient.getQueryData(["products"]);
      queryClient.setQueryData(["products"], (oldProducts) =>
        oldProducts.map((product) =>
          product.id === id ? { ...product, ...data } : product
        )
      );
      return { previousProducts };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(["products"], context.previousProducts);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });
};

// Patch a product with optimistic updates
export const usePatchProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => patchProduct(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries(["products"]);
      const previousProducts = queryClient.getQueryData(["products"]);
      queryClient.setQueryData(["products"], (oldProducts) =>
        oldProducts.map((product) =>
          product.id === id ? { ...product, ...data } : product
        )
      );
      return { previousProducts };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(["products"], context.previousProducts);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });
};

// Delete a product with optimistic updates
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteProduct(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries(["products"]);
      const previousProducts = queryClient.getQueryData(["products"]);
      queryClient.setQueryData(["products"], (oldProducts) =>
        oldProducts.filter((product) => product.id !== id)
      );
      return { previousProducts };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(["products"], context.previousProducts);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });
};
