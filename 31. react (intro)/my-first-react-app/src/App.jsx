import { useState } from "react";
import Article from "./components/Article.jsx";

//smart component
function App() {
  let [counter, setCounter] = useState(0);

  function handleIncrease() {
    setCounter(++counter);
  }

  return (
    <>
      <h1>Hello React JS</h1>
      <button onClick={handleIncrease}>increase counter</button>
      <span>{counter}</span>
      <button
        onClick={() => {
          setCounter(--counter);
        }}
      >
        decrease button
      </button>

      <button
        onClick={() => {
          document.body.style.backgroundColor = "red";
        }}
      >
        change body bgc
      </button>
      <Article />
    </>
  );
}

export default App;
