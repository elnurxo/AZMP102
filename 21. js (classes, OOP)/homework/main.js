import x from "./test.js";
import { y, z } from "./test.js";

let employee1 = {
  fullName: "Orxan Aliyev",
  salary: 1200,
  department: "IT",
  experienceYear: 8,
  age: 28,
  isManager: false,
  startYear: 2021,
  email: function () {
    return `${this.fullName}@company.com`;
  },
  address: {
    city: "Baku",
    district: "Narimanov",
  },
  phoneNumber: 123455678,
  getYearsInCompany: function () {
    return new Date().getFullYear() - this.startYear;
  },
  promote: function (newsalary) {
    return (this.salary += newsalary);
  },
};
let employee2 = {
  fullName: "Samira Aliyeva",
  salary: 800,
  department: "HR",
  experienceYear: 2,
  age: 23,
  isManager: true,
  startYear: 2022,
  email: function () {
    return `${this.fullName}@company.com`;
  },
  address: {
    city: "Baku",
    district: "28may",
  },
  phoneNumber: 123455678,
  getYearsInCompany: function () {
    return new Date().getFullYear() - this.startYear;
  },
  promote: function (newsalary) {
    return (this.salary += newsalary);
  },
};
let employee3 = {
  fullName: "Ali Memmedov",
  salary: 2000,
  department: "HR",
  experienceYear: 7,
  age: 30,
  isManager: false,
  startYear: 2019,
  email: function () {
    return `${this.fullName}@company.com`;
  },
  address: {
    city: "Baku",
    district: "Yasamal",
  },
  phoneNumber: 123455678,
  getYearsInCompany: function () {
    return new Date().getFullYear() - this.startYear;
  },
  promote: function (newsalary) {
    return (this.salary += newsalary);
  },
};
let employee4 = {
  fullName: "Esmira Muradova",
  salary: 7000,
  department: "IT",
  experienceYear: 10,
  age: 29,
  isManager: true,
  startYear: 2016,
  email: function () {
    return `${this.fullName}@company.com`;
  },
  address: {
    city: "Baku",
    district: "Ehmedli",
  },
  phoneNumber: 12345678,
  getYearsInCompany: function () {
    return new Date().getFullYear() - this.startYear;
  },
  promote: function (newsalary) {
    return (this.salary += newsalary);
  },
};
let employee5 = {
  fullName: "Vurgun Haciyev",
  salary: 900,
  department: "HR",
  experienceYear: 5,
  age: 25,
  isManager: true,
  startYear: 2023,
  email: function () {
    return `${this.fullName}@company.com`;
  },
  address: {
    city: "Sumqayit",
    district: "ABC",
  },
  phoneNumber: 12345678,
  getYearsInCompany: function () {
    return new Date().getFullYear() - this.startYear;
  },
  promote: function (newsalary) {
    return (this.salary += newsalary);
  },
};

const employees = [employee1, employee2, employee3, employee4, employee5];

function calcAvgDepartmentSalary(arr, department) {
  let departmentCount = 0;
  const totalSalary = arr
    .filter((emp) => emp.department === department)
    .reduce((acc, currentVal) => {
      departmentCount++;
      return (acc += Number(currentVal.salary));
    }, 0);

  return (totalSalary / departmentCount).toFixed(2);
}

// console.log(calcAvgDepartmentSalary(employees, "IT"));

function filterEmployees(arr, criteria) {
  return arr.filter(
    (employee) =>
      employee.age >= criteria.age.min &&
      employee.age <= criteria.age.max &&
      employee.salary >= 1000
  );
}

const criteria = { age: { min: 30, max: 40 }, salary: { min: 1800 } };
console.log(filterEmployees(employees, criteria));
