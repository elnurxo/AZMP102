import React from "react";
import { ProductType } from "../types/product";

interface ProductItemProps {
  product: ProductType;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  return (
    <li style={{ color: product.isDiscounted ? "green" : "black" }}>
      {product.name}, {product.price}
    </li>
  );
};

export default ProductItem;
