import React from "react";
import { Person } from "../interfaces/person";

interface GreetingProps {
  name: string;
  age: number;
  person: Person;
}

const Greeting: React.FC<GreetingProps> = ({ name, age, person }) => {
  console.log("name: ", name);
  console.log("age: ", age);
  return (
    <div style={{ background: person.isMarried ? "pink" : "beige" }}>
      Hey {person.name}, {person.age}
    </div>
  );
};

export default Greeting;
