/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

const List = ({ getItems }) => {
  const [numbers, setNumbers] = useState([]);
  useEffect(() => {
    console.log("numbers changed!");
    setNumbers(getItems(10));
  }, [getItems]);
  return (
    <ul>
      {numbers &&
        numbers.map((num, idx) => {
          return <li key={idx}>{num}</li>;
        })}
    </ul>
  );
};

export default List;
