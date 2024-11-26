import { useState } from "react";
import "./App.css";
import Student from "./Student";

function App() {
  //state
  const [text, setText] = useState("simple text");
  const [counter, setCounter] = useState(0);
  const [numbers, setNumbers] = useState([1, 2, 3]);

  function handleClick() {
    setText("updated text");
  }

  return (
    <>
      <Student />
      <hr />
      <h1 style={{ textAlign: "center" }}>React useState hook & props</h1>
      {/* state */}
      <p>{text}</p>
      <button onClick={handleClick}>click</button>

      <hr />
      <h4>numbers state</h4>
      <ul>
        {numbers &&
          numbers.map((number, idx) => {
            return <li key={idx}>{number}</li>;
          })}
      </ul>

      <button
        onClick={() => {
          const newNumber = numbers[numbers.length - 1] + 1;
          // setNumbers([...numbers, newNumber]);
          setNumbers([...numbers, newNumber]);
        }}
      >
        add new number
      </button>

      <hr />

      <button
        onClick={(e) => {
          if (counter > 0) {
            setCounter(counter - 1);
          } else {
            e.target.disabled = true;
          }
        }}
      >
        decrease
      </button>
      <span>{counter}</span>
      <button
        onClick={(e) => {
          e.target.previousElementSibling.previousElementSibling.disabled = false;
          setCounter(counter + 1);
        }}
      >
        increase
      </button>
      <button
        onClick={() => {
          setCounter(0);
        }}
      >
        reset
      </button>
    </>
  );
}

export default App;
