import { Student } from "./class.js";

const addForm = document.querySelector("#add-form");
const nameInp = document.querySelector(".name-inp");
const ageInp = document.querySelector(".age-inp");
const hasPassedCheckBox = document.querySelector(".has-passed");
const list = document.querySelector(".students-list");
let students = [];

addForm.addEventListener("submit", function (ev) {
  ev.preventDefault();
  const fullName = nameInp.value;
  const age = ageInp.value;
  const hasPassed = hasPassedCheckBox.checked;

  if (nameInp.value.trim() === "" || ageInp.value.trim() === "") {
    window.alert("form cannot be submitted while inputs are empty!");
  } else {
    const newStudent = new Student(fullName, age, hasPassed);
    students.push(newStudent);
    resetForm(nameInp, ageInp, hasPassedCheckBox);
    renderList(students);
  }
});

function resetForm(name, age, passed) {
  name.value = "";
  age.value = "";
  passed.checked = false;
}

function renderList(arr) {
  list.innerHTML = "";
  arr.forEach((student) => {
    list.innerHTML += `<li data-id="${student.id}" class="${
      student.hasPassed ? "text-success" : "text-danger"
    } list-group-item student-item d-flex justify-content-between align-items-center">
                      <span>${student.fullName}, <b>${student.age}</b></span>
                      <button class="btn btn-outline-danger">delete</button>
                  </li>`;
  });
}

//search
const searchInp = document.querySelector("#search-student");

searchInp.addEventListener("keyup", function (e) {
  const searchedStudents = students.filter((student) => {
    return student.fullName
      .toLowerCase()
      .trim()
      .includes(e.target.value.toLowerCase().trim());
  });
  renderList(searchedStudents);
});

//sort
const sortStudents = document.querySelector("#sort");

sortStudents.addEventListener("change", function (e) {
  let sortedStudents = [];
  switch (e.target.value) {
    case "all":
      sortedStudents = [...students];
      break;
    case "passed":
      sortedStudents = [...students.filter((stu) => stu.hasPassed)];
      break;
    case "failed":
      sortedStudents = [...students.filter((stu) => !stu.hasPassed)];
      break;

    default:
      alert("invalid option");
      break;
  }

  renderList(sortedStudents);
});
