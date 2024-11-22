import "./style.css";

// type alphanumeric = string | number;

// function add(a: alphanumeric, b: alphanumeric): alphanumeric {
//   if (typeof a === "number" && typeof b === "number") {
//     return a + b;
//   }

//   if (typeof a === "string" && typeof b === "string") {
//     return a.concat(b);
//   }

//   throw new Error(
//     "Invalid arguments. Both arguments must be either numbers or strings."
//   );
// }

// class Product {
//   public name: string;
//   constructor(name: string) {
//     this.name = name;
//   }
// }
// class Laptop extends Product {
//   public screenHZ: number;
//   constructor(name: string, screenHZ: number) {
//     super(name);
//     this.screenHZ = screenHZ;
//   }
// }
// class Phone extends Product {
//   public storage: number;
//   constructor(name: string, storage: number) {
//     super(name);
//     this.storage = storage;
//   }
// }
// type ProductType = Laptop | Phone;

// const prod1 = new Laptop("Lenovo Legion 5", 144);
// const prod2 = new Phone("Iphone 15", 512);
// const prod3 = new Laptop("MacBook Pro", 120);
// const prod4 = new Laptop("MacBook Pro 15", 120);

// const products: ProductType[] = [prod1, prod2, prod3, prod4];

// console.log(products);

// function checkIsPhone(arr: ProductType[]): void {
//   arr.forEach((prod) => {
//     // if (prod instanceof Phone) {
//     //   console.log("product: ", prod);
//     // }
//     if ("storage" in prod) {
//       console.log(prod.storage);
//     }
//   });
// }

// function isPhone(prod: ProductType): prod is Phone {
//   return prod instanceof Phone;
// }

// console.log(isPhone(prod2));

// checkIsPhone(products);

//condition statement, typeof, instanceof, is, in, equality, user-defined type guard

// let el = <HTMLInputElement>document.querySelector('input["type="text"]');
// const input = el as HTMLInputElement;
// console.log(el.value);

// let price = "hello";
// const checkNaN = Number.isNaN(Number(price));
// let netPrice = checkNaN ? 0 : Number(price);
// console.log(netPrice);
// let netPrice = Number.isNaN(Number(price)) === NaN ? 0 : Number(price); // error
// console.log(netPrice);

// class Person {
//   public firstName: string;
//   private lastName: string;

//   constructor(private ssn: string, firstName: string, lastName: string) {
//     this.ssn = ssn;
//     this.firstName = firstName;
//     this.lastName = lastName;
//   }

//   getFullName(): string {
//     return `${this.firstName} ${this.lastName}`;
//   }
//   getSocialSecurityNumber(): string {
//     return `${this.ssn}`;
//   }
// }

//base class
// abstract class Person {
//   public readonly birthDate: Date;

//   constructor(birthDate: Date) {
//     this.birthDate = birthDate;
//   }

//   // get age(){

//   // }
//   // set age(){

//   // }
// }

// const john = new Person(new Date("2012-12-12"));
// john.birthDate = new Date();

//type alias
// type PersonType = { firstName: string; lastName: string };
//interface
// interface Person {
//   readonly ssn: string;
//   firstName: string;
//   middleName?: string;
//   lastName: string;
// }

// type Id = string | number;

// type Department = {
//   id: Id;
//   name: string;
//   empCapacity: number;
// };

// interface Employee extends Person {
//   salary: number;
//   position: string;
//   department?: Department;
//   calcYearlySalary(): number;
// }

// const emp: Employee = {
//   ssn: "145EF",
//   firstName: "John",
//   middleName: "Adams",
//   lastName: "Doe",
//   salary: 2000,
//   position: "HR",
//   department: {
//     id: 1,
//     name: "HR department",
//     empCapacity: 45,
//   },
//   calcYearlySalary(): number {
//     return this.salary * 12;
//   },
// };

// console.log("employee: ", emp);
// console.log(emp.calcYearlySalary());

// let format: StringFormat;

// format = function (str: string, isUpper: boolean): string {
//   return isUpper ? str.toLocaleUpperCase() : str.toLocaleLowerCase();
// };

// console.log(format("hi", true));

// function getFullName(person: Person): string {
//   // if(person.middleName){

//   // }
//   return `${person.firstName} ${person.middleName} ${person.lastName}`;
// }

// let person = {
//   firstName: "John",
//   lastName: "Doe",
// };

// console.log(getFullName({ ssn: "157RC", firstName: "John", lastName: "Doe" }));

// interface Json {
//   toJson(): string;
// }
// interface IPerson {
//   experienceYear: number;
// }

// enum subscriptionType {
//   standard,
//   gold,
//   silver,
//   diamond,
// }

// class Employee {}

// class Person extends Employee implements Json {
//   constructor(private firstName: string, private lastName: string) {}
//   toJson(): string {
//     return JSON.stringify(this);
//   }
// }
// let person = new Person("John", "Doe");
// console.log(person.toJson());

// Primitive Type Alias
// type UserType = string | number;

// // Object Type Alias
// interface User {
//   name: string;
//   age: number;
// }

// type successResponse = {};
// type errorResponse = {};
// type T = successResponse | errorResponse;

// async function getData<T>(apiURL: string): Promise<T> {
//   const resp = await fetch(apiURL).then((res) => res.json());
//   const data = await resp;
//   return data;
// }

function identity<T>(arg: T): T {
  return arg;
}

let output = identity<string>("hello");
let num = identity<number>(5);
console.log(num);
console.log(output); // Output: hello

function reverse<T>(array: T[]): T[] {
  return array.reverse();
}

let numbers: number[] = [1, 2, 3, 4, 5];
let reversedNumbers: number[] = reverse<number>(numbers);
console.log(reversedNumbers); // Output: [5, 4, 3, 2, 1]

