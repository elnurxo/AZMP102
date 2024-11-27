import { useState } from "react";
import "./App.css";
import Button from "./components/Button";
import Mode from "./components/Mode";
import DataList from "./components/DataList";
import DataListItem from "./components/DataListItem";
import Todo from "./components/Todo";

function App() {
  let person = { name: "jack adams", age: 21 };
  //state - mode
  const [darkMode, setDarkMode] = useState(false);
  let [data, setData] = useState([
    { id: 1, name: "Twix" },
    { id: 2, name: "Snickers" },
    { id: 3, name: "M&Ms" },
    { id: 4, name: "Skittles" },
  ]);

  return (
    <>
      <Todo/>

      {/* <DataList>
        {data &&
          data.map((item) => {
            return <DataListItem key={item.id} item={item} />;
          })}
      </DataList>

      <hr /> */}
      {/* props - properties */}
      {/* <Button person={person} number={5} />
      <hr />
      <Mode darkMode={darkMode} setDarkMode={setDarkMode} /> */}
    </>
  );
}

export default App;
