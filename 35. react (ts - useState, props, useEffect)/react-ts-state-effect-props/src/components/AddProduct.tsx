import React, { useState } from "react";
import { Product } from "../classes/product.ts";
import { ProductType } from "../types/product.ts";

type NewProductType = {
  name: string;
  price: number;
  isDiscounted: boolean;
};

interface AddProductProps {
  products: ProductType[];
  setProducts: (state: ProductType[]) => void;
}

const AddProduct: React.FC<AddProductProps> = ({ products, setProducts }) => {
  const [newProduct, setNewProduct] = useState<NewProductType>({
    name: "",
    price: 0,
    isDiscounted: false,
  });
  function handleAddProduct(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("form submitted");
    if (newProduct.name.trim().length === 0 || newProduct.price === 0) {
      window.alert("invalid input!");
    } else {
      const newProd = new Product(
        newProduct.name,
        newProduct.price,
        newProduct.isDiscounted
      );
      setProducts([...products, newProd]);
      setNewProduct({ name: "", price: 0, isDiscounted: false });
    }
  }

  return (
    <form
      onSubmit={(e) => handleAddProduct(e)}
      style={{ display: "flex", flexDirection: "column", gap: "10px" }}
    >
      <input
        value={newProduct.name}
        onChange={(e) =>
          setNewProduct({ ...newProduct, name: e.target.value as string })
        }
        type="text"
        name="name"
        placeholder="enter product name"
        required
      />
      <input
        value={newProduct.price}
        type="number"
        onChange={(e) =>
          setNewProduct({ ...newProduct, price: Number(e.target.value) })
        }
        name="price"
        placeholder="enter product price"
        required
      />
      <div style={{ display: "flex", gap: "10px" }}>
        <label htmlFor="isDiscounted">Is this product discounted? </label>
        <input
          checked={newProduct.isDiscounted}
          onChange={(e) =>
            setNewProduct({
              ...newProduct,
              isDiscounted: Boolean(e.target.checked),
            })
          }
          id="isDiscounted"
          type="checkbox"
          name="isDiscounted"
        />
      </div>
      <button type="submit">add product</button>
    </form>
  );
};

export default AddProduct;
