/* eslint-disable no-empty */
import { useEffect, useMemo, useState } from "react";

const Memo = () => {
  const [number, setNumber] = useState(0);
  const [dark, setDark] = useState(false);

  const doubleNumber = useMemo(() => {
    return slowFunction(number);
  }, [number]);

  const themeStyles = useMemo(() => {
    return {
      backgroundColor: dark ? "black" : "white",
      color: dark ? "white" : "black",
    };
  }, [dark]);

  useEffect(() => {
    console.log("THEME CHANGED!");
  }, [themeStyles]);

  return (
    <>
      <input
        type="number"
        value={number}
        onChange={(e) => {
          setNumber(parseInt(e.target.value));
        }}
      />
      <button onClick={() => setDark((prevDark) => !prevDark)}>
        change theme
      </button>
      <div style={themeStyles}>{doubleNumber}</div>
    </>
  );
};

function slowFunction(num) {
  console.log("slow function...");
  for (let i = 0; i < 1_000_000_000; i++) {}
  return num * 2;
}

export default Memo;
