const fullNameInp = document.querySelector(".full-name");
const salaryInp = document.querySelector(".salary");
const positionInp = document.querySelector(".position");
const addForm = document.querySelector(".add-form");
const employeesList = document.querySelector(".employees");

document.addEventListener("DOMContentLoaded", function () {
  const initialEmployees = checkLocalEmployees();
  renderList(initialEmployees);
});

addForm.addEventListener("submit", function (e) {
  e.preventDefault();
  if (checkValidForm()) {
    const newEmp = createEmployee(
      fullNameInp.value,
      salaryInp.value,
      positionInp.value
    );
    const employees = Employees.add(newEmp);
    renderList(employees);
    resetForm();
  }
});

document.querySelector(".clear-all").addEventListener("click", function () {
  if (window.confirm("are you sure to delete?")) {
    Employees.clearAll();
  }
});

function checkValidForm() {
  let checkValid = true;
  if (
    fullNameInp.value.trim() === "" ||
    salaryInp.value.trim() === "" ||
    salaryInp.value < 0 ||
    positionInp.value.trim() === ""
  ) {
    checkValid = false;
  }

  return checkValid;
}
function resetForm() {
  salaryInp.value = "";
  positionInp.value = "";
  fullNameInp.value = "";
}
function createEmployee(fullName, salary, position) {
  let newEmp;
  try {
    newEmp = new Employee(fullName, salary, position);
  } catch (error) {
    console.log(error);
  }
  return newEmp;
}
function checkLocalEmployees() {
  const localEmployees = window.localStorage.getItem("employees");
  if (!localEmployees) {
    window.localStorage.setItem("employees", JSON.stringify([]));
  }

  return JSON.parse(localEmployees) || [];
}
function renderList(arr) {
  employeesList.innerHTML = "";
  arr.forEach((employee) => {
    employeesList.innerHTML += ` <li class="list-group-item d-flex justify-content-between align-items-center">
            ${employee.fullName}, ${employee.salary} | ${employee.position}
            <button class="btn btn-outline-danger delete-btn" data-id="${employee.id}">delete</button>
        </li>`;
  });

  const deleteButtons = document.querySelectorAll(".delete-btn");
  deleteButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const id = this.getAttribute("data-id");
      Employees.removeOne(id);
    });
  });
}

//Employee Class
class Employee {
  constructor(fullName, salary, position) {
    this.id = new Date();
    this.fullName = fullName;
    this.salary = salary;
    this.position = position;
    this.createdAt = new Date();
  }
}

//Employees Class
class Employees {
  static employees = JSON.parse(window.localStorage.getItem("employees")) || [];

  //methods
  static add(newEmp) {
    Employees.employees.push(newEmp);
    let localEmployees = JSON.parse(localStorage.getItem("employees"));
    localStorage.setItem(
      "employees",
      JSON.stringify([...localEmployees, newEmp])
    );
    return Employees.employees;
  }
  static clearAll() {
    Employees.employees = [];
    localStorage.setItem("employees", JSON.stringify([]));
    renderList([]);
    return Employees.employees;
  }
  static removeOne(id) {
    Employees.employees = [
      ...Employees.employees.filter((emp) => {
        return emp.id != id;
      }),
    ];
    renderList(Employees.employees);
    localStorage.setItem("employees", JSON.stringify([...Employees.employees]));
    return Employees.employees;
  }

}


