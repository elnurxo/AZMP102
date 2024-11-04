class Human {
  constructor(fullName, age) {
    this.fullName = fullName;
    this.age = age;
  }

  getInfo() {
    return `${this.fullName} is ${this.age} years old`;
  }
}

class User extends Human {
  #password;
  #isAdmin;
  //static - id
  static idCounter = 0;
  constructor(fullName, age, username, email, password) {
    super(fullName, age);
    this.id = fullName[0].toUpperCase() + age + "_" + ++User.idCounter;
    this.username = username;
    this.email = email;
    this.#password = password;
    this.#isAdmin = false;
    this.isLogged = false;
    this.createdAt = new Date();
  }

  getInfo() {
    return `${this.username} has this email: ${this.email}`;
  }
  checkAdmin() {
    return this.#isAdmin;
  }
  set changeAdminStatus(newAdminStatus) {
    this.#isAdmin = newAdminStatus;
  }
  login(username, password) {
    if (this.username === username && this.#password === password) {
      this.isLogged = true;
      console.log("welcome");
    } else {
      console.log("username or password is incorrect");
    }
  }
  logout() {
    this.isLogged = false;
  }
}

const user1 = new User("john doe", 21, "john123", "john@gmail.com", "John123@");
const user2 = new User("john doe", 21, "john123", "john@gmail.com", "John123@");
const user3 = new User("john doe", 21, "john123", "john@gmail.com", "John123@");

console.log(user1.id);
console.log(user2.id);
console.log(user3.id);

// console.log(user1.getInfo());
// user1.changeAdminStatus = true;
// console.log(user1.checkAdmin());
// user1.login("john123","John123@");
// user1.logout();

// console.log(user1.changeAdminStatus(true));
// console.log(user1);


const objStr = "{name: 'test'}";

const obj = JSON.stringify(objStr);

console.log(obj.name)