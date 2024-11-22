// let firstName: string = "test";
// let age: number = 5;
// //type annotation - explicit type
// let isMarried = false;

// let x: any;
// let y: number;
// let surname: string;
// let person: object;
// let numbers: number[];

// //type narrowing
// let car: {
//   id: number;
//   model: string;
//   brand: string;
//   year: number;
// } = { id: 1, model: "x5", brand: "bmw", year: 2014 };

// function greet(fullName: string): string {
//   return `hello ${fullName}`;
// }

// let greeting: (name: string) => string;

// //JS - data types - string, number, bigint, boolean, Symbol, object (non-primitive), null, undefined

// //TS data types - number, string, boolean, object,  array, tuple, enum, any
// // unknown, union, string literal types, type alias, never type

// let num: number = 6;
// num = 7;
// num = 23.5;
// num = Number(false);

// let a: number = 100;
// let b: number = 200;

// let bin = 0b100;
// let anotherBin: number = 0b010;

// let z: null;

// console.log(anotherBin);

// const obj = new Object();

// // array + , tuple + , enum +,  unknown, union, string literal types, never type | type alias,
// let skills: string[] = [
//   "git",
//   "html",
//   "css",
//   "scss",
//   "tailwind",
//   "js",
//   "ts",
//   "react",
//   "node",
//   "mongo db",
// ];
// //union array type
// let scores: (string | number | boolean)[] = ["js", 21, 54, "html", false];

// //tuple type - fixed length array (fixed indexed data type)
// let skill: [string, number, string, string, boolean] = [
//   "js",
//   21,
//   "css",
//   "html",
//   false,
// ];

// let color: [number, number, number, number?] = [256, 0, 0, 0.5];

// enum weekDays {
//   monday,
//   tuesday,
//   wednesday,
//   thursday,
//   friday,
//   saturday,
//   sunday,
// }

// enum APIEndpoints {
//   products = "/products",
//   singers = "/singers",
// }

// enum DeliveryStatus {
//   pending,
//   rejected,
//   accepted,
//   onCourier,
//   delivered,
// }

// const request: {
//   id: number;
//   totalPrice: number;
//   product: string;
//   status: DeliveryStatus;
// } = {
//   id: 1,
//   totalPrice: 21,
//   product: "Big Mac menu",
//   status: DeliveryStatus.onCourier,
// };

// console.log(request.status === DeliveryStatus.delivered);

// console.log(weekDays);

// console.log(DeliveryStatus.onCourier);

// //unknown data type -
// let result: unknown;
// result = [1, 2, 3];

// const total = (result as number[]).reduce((a: number, b: number) => a + b, 0);
// console.log(total); // 6

// function displayHey(surname: string, x: number): number {
//   console.log(`hey ${surname}`);
//   if (x % 2 == 0) {
//     return 5;
//   } else {
//     return 0;
//   }
// }

// let apiResponse: { message: string; data: object } | string;

// let mouseEvent: "click" | "dblclick" | "mouseup" | "mousedown" = "click";

// type Id = string | number;
// type User = { id: Id; username: string };

// const user1: User = { id: 1, username: "john_doe123" };
// const user2: User = { id: "1wh321", username: "jack_jones" };

// //type alias
// type Personal = {
//   name: string;
//   age: number;
// };

// type Contact = {
//   email: string;
//   phone: string;
// };

// //intersection types
// type Candidate = Personal & Contact;

// let candidate: Candidate = {
//   name: "Joe",
//   age: 25,
//   email: "joe@example.com",
//   phone: "(408)-123-4567",
// };

// type Alphanumeric = string & number; // never

// function raiseError(message: string): never {
//   while (true) {
//   }
// }

//function constructor
type Id = string | number;
enum Gender {
  male = 'male',
  female = '',
  other = 'other',
}
type Human = {
  id: Id;
  fullName: string;
  age: number;
  gender: Gender;
};
type Student = Human & { GPA: number; university: string };

function createStudent(
  fullName: string,
  age: number,
  gender: Gender,
  GPA: number,
  university: string
): Student {
  return {
    id: Math.random(),
    fullName: fullName,
    age: age,
    gender: gender,
    GPA: GPA,
    university: university,
  };
}

const newStudent = createStudent("John Doe", 23, Gender.male, 4.5, "Azmiu");

let j: any = 4;

console.log(newStudent);
