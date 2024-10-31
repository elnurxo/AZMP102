// const user = {
//   username: "john123",
//   email: "john@gmail.com",
//   password: "John123@",
//   hobbies: ["football", "coding", "music"],
//   isMarried: true,
//   age: 27,
//   "likes birds": true,
//   address: {
//     city: "Baku",
//     country: "Azerbaijan",
//     postCode: 1403,
//   },
// };

// user.profileImg = "https://img.com/svg";
// user.isAdmin = true;
// delete user.age;

// let key = "isVerified";
// user[key] = true;

// console.log(user);

//function constructor
// function createUser(username, email, password, isAdmin = false) {
//   return {
//     username: username,
//     email,
//     password,
//     isAdmin,
//   };
// }

// const john123 = createUser("john123", "john@gmail.com", "Admin123", true);

// console.log(john123);

// let obj = {};
// obj.__proto__ = 5; // assign a number

// console.log(typeof obj);

// const obj = {};
// const parent = { foo: 'bar' };

// console.log(obj);
// // Expected output: undefined

// Object.setPrototypeOf(obj, parent);

// console.log(obj.foo);

// console.log(obj);
// // Expected output: "bar"

// const parent = { greet() { return "Hello"; } };
// const child = {};
// child.__proto__ = parent;

// console.log(child.greet()); // "Hello"

// const target = { a: 1 };
// const source1 = { b: 2 };
// const source2 = { c: 3 };

// const result = Object.assign(target, source1, source2);
// result.d = 6;
// console.log(result); // { a: 1, b: 2, c: 3 }
// console.log(target); // { a: 1, b: 2, c: 3 } (target is modified)
// console.log(source1);
// console.log(source2);

// const car1 = {name: 'bmw',brand: 'x5'};

// const mercedes = Object.create(car1);

// console.log(mercedes);

// const car2 = car1;
// car2.brand = 'x6';
// console.log(car1);
// console.log(car2);

// const obj = { name: 'Elnur', skills: { coding: true } };
// const shallowCopy = Object.assign({}, obj);
// shallowCopy.name = 'Eldar';

// console.log(obj);
// console.log(shallowCopy);

// let obj = { age: 24 };
// obj.name = 'elmir';
// //immutable
// Object.freeze(obj);
// obj.isAdmin = true;
// console.log(obj);

const user = {
  //fields
  username: "john123",
  email: "john@gmail.com",
  password: "John123@",
  hobbies: ["football", "coding", "music"],
  isMarried: true,
  isLogged: false,
  age: 27,
  address: {
    city: "Baku",
    country: "Azerbaijan",
    postCode: 1403,
  },
  //methods
  calcBirthYear: function () {
    return new Date().getFullYear() - this.age;
  },
  login: function (username, pass) {
    if (this.username === username && this.password === pass) {
      this.isLogged = true;
      return `welcome ${this.username}`;
    } else {
      return "invalid credentials";
    }
  },
};

console.log("test" in user);

// console.log(user.calcBirthYear());
// console.log(user.login('john123','John123@'));
// console.log(user.isLogged);

//object
// for (const key in user) {
//     console.log(user[key]);
// }

//for of - array
// let numbers = [1, 3, 52, 6, 2, 2567];
// for (const num of numbers) {
//   console.log(num);
// }
// for (let i = 0; i < numbers.length; i++) {
//     console.log(array[i])
// }

