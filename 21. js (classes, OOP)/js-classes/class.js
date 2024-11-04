// class MyClass {
//   //fields, properties
//   fullName = "";
//   age;
//   //constructor - method
//   constructor() {}
//   //methods
//   method1() {}
//   method2() {}
// }

// const obj = new MyClass("");

//--------------------------------------------------
// class Human {
//   constructor(fullName, age, nationality, gender) {
//     this.fullName = fullName;
//     this.nationality = nationality;
//     this.gender = gender;
//     this.height = 180;
//     this.age = age > 0 ? age : 0;
//   }

//   //calcBirthYear method
//   calcBirthYear() {
//     return new Date().getFullYear() - this.age;
//   }
// }

// console.log(Object.getOwnPropertyNames(Human.prototype));
// const abbas = new Human("abbas ekberov", 24, "azeri", "male");
// console.log(abbas.calcBirthYear());
// console.log(abbas);

// console.log(abbas instanceof Human);

//------------------------------------------------
class User {
  #password;
  constructor(username, email) {
    this.id =
      username[0].toUpperCase() +
      username[username.length - 1].toUpperCase() +
      "001";
    this.username = username;
    if (email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      this.email = email;
    } else {
      //   throw new Error("invalid email format!");
      this.email = "";
    }
    this.#password = "Salam123";
  }

  //changePass
  changePassword(newPassword) {
    //min 1 lower_case, 1 Upper_Case, 1 digit, min 8 char
    if (
      newPassword.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
    ) {
      this.#password = newPassword;
    } else {
      return "password invalid format!";
    }
  }
}

// user1 = new User("john123", "john@gmail.com");
// user1.changePassword("Admin123@");
// console.log(user1.password);

// user1.changePassword("Admin123@!");

// console.log(user1);

// class Button {
//   constructor(value) {
//     this.value = value;
//   }

//   click = () => {
//     console.log(this.value);
//   };
// }

// let button = new Button("hello");

// setTimeout(button.click, 1000); // undefined
