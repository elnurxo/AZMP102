import { useEffect, useMemo, useState } from "react";
import AddProduct from "./AddProduct";
import SearchProduct from "./SearchProduct";
import ProductList from "./ProductList";
import ProductItem from "./ProductItem";
import { ProductType } from "../types/product";
import { getAll } from "../services/api/request";
import { API_URL } from "../services/api/contants";
import { API_ENDPOINTS } from "../enums/endpoints";

const Product = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    getAll<ProductType[]>(API_URL + API_ENDPOINTS.products).then((data) => {
      try {
        setProducts([...data?.data]);
      } catch (error) {
        console.error("error occurred: ", error);
      }
    });
  }, []);

  //use Memo
  const filteredProducts = useMemo(() => {
    return (
      products &&
      products.filter((prod) => {
        return prod.name
          .toLowerCase()
          .trim()
          .includes(searchQuery.trim().toLowerCase());
      })
    );
  }, [products, searchQuery]);

  return (
    <>
      <h4>Products List</h4>
      <AddProduct products={products} setProducts={setProducts} />
      <hr />
      <SearchProduct setSearchQuery={setSearchQuery} />
      <hr />
      <ProductList>
        {filteredProducts &&
          filteredProducts.map((prod) => {
            return <ProductItem key={prod.id} product={prod} />;
          })}
      </ProductList>
    </>
  );
};

export default Product;
