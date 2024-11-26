import { products } from "../data/products.js";

const Main = () => {
  return (
    <>
      <h3>This is Main</h3>
      <h4>Products List</h4>
      <ul>
        {products &&
          products.map((prod) => {
            return (
              <li key={prod.id}>
                <span>{prod.name}, </span>
                <span>{prod.calcSalePrice()}</span>
                <span>
                  | <b>{prod.calculateProfit()}</b>
                </span>
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default Main;
