import React from "react";
import { useState } from "react";

const Student = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ name: "", age: "" });

  return (
    <>
      <h1>Students List</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          newStudent.id = Date.now();
          setStudents([...students, newStudent]);
          setFilteredStudents([...filteredStudents, newStudent]);
          //reset form
          setNewStudent({ name: "", age: "" });
        }}
      >
        <input
          value={newStudent.name}
          onChange={(e) => {
            setNewStudent({ ...newStudent, name: e.target.value });
          }}
          type="text"
          required
          placeholder="student name"
        />
        <input
          value={newStudent.age}
          onChange={(e) => {
            setNewStudent({ ...newStudent, age: parseInt(e.target.value) });
          }}
          type="number"
          min={0}
          max={100}
          placeholder="student age"
        />
        <button type="submit">add student</button>
      </form>
      <hr />
      <input
        onChange={(e) => {
          setFilteredStudents([
            ...students.filter((x) =>
              x.name
                .trim()
                .toLowerCase()
                .includes(e.target.value.trim().toLowerCase())
            ),
          ]);
        }}
        type="text"
        placeholder="search student"
      />

      <ul>
        {filteredStudents &&
          filteredStudents.map((stud, idx) => {
            return (
              <li key={idx}>
                {stud.name}, {stud.age}
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default Student;
