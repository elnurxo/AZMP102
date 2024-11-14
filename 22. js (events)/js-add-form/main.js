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
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "New Student Added",
      showConfirmButton: false,
      timer: 2000,
    });
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
                      <i>${moment(student.createdAt).format(
                        "MMM Do YY, h:mm a"
                      )}</i>
                      <button data-id="${
                        student.id
                      }" class="btn btn-outline-danger delete">delete</button>
                  </li>`;
  });

  const deleteButtons = Array.from(document.querySelectorAll(".delete"));

  deleteButtons.forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", function () {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          this.closest("li").remove();
          const idx = students.findIndex(
            (student) => student.id === Number(this.getAttribute("data-id"))
          );
          const newStudents = [...students.splice(idx, 1)];
          console.log(students);
          console.log(newStudents);
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      });
    });
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
