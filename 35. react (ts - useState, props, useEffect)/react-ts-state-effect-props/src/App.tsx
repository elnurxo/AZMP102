import { useState } from "react";
import "./App.css";
import Login from "./components/Login.tsx";
import Welcome from "./components/Welcome.tsx";
import Logout from "./components/Logout.tsx";
import Product from "./components/Product.tsx";

function App() {
  // const [name, setName] = useState<string>("Jack Adams");
  // const [age, setAge] = useState<number>(24);
  // const [person, setPerson] = useState<Person>({
  //   id: 1,
  //   name: "John Doe",
  //   age: 24,
  //   isMarried: true,
  // });
  const [isLogged, setIsLogged] = useState<boolean>(false);
  return (
    <>
      {isLogged ? (
        <>
          <Welcome />
          <Product />
          <Logout setIsLogged={setIsLogged} />
        </>
      ) : (
        <>
          <Login setIsLogged={setIsLogged} />
          <h2>you should login to view products...</h2>
        </>
      )}
    </>
  );
}

export default App;
