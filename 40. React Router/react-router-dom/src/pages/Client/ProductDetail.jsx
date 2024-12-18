import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
      });
  }, [id]);

  return (
    <>
      {product.id ? (
        <>
          <h1>Product name: {product.title}</h1>
          <h1>Product description: {product.description}</h1>
          <h1>Product price: {product.price}</h1>
          <h1>Product ID: {product.sku}</h1>
          <h1>returnPolicy: {product.returnPolicy}</h1>
          <button>go back</button>
        </>
      ) : (
        <>
          <h1>product not found...</h1>
        </>
      )}
    </>
  );
};

export default ProductDetail;
