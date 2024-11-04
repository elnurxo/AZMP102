class Human {
  #age;
  constructor(firstName, surname, age) {
    this.firstName = firstName;
    this.surname = surname;
    this.#age = age;
  }
  //private method - protected
  _calcBirthYear() {
    return new Date().getFullYear() - this.#age;
  }

  //getters
  get age() {
    return this.#age;
  }
  //setters
  set age(newAge) {
    if (newAge > 18) {
      this.#age = newAge;
    } else {
      console.log("age permission denied!");
    }
  }
}

// const human1 = new Human("John", "Wick", 23);
// console.log(human1.calcBirthYear());
// human1.age = 19;
// console.log(human1);
// human1.firstName = "adam";
// console.log(human1);

//OOP - 1. encapsulation - getters, setters (access modifiers)
//OOP - 2. inheritence - extends, super
//OOP - 3. abstraction - interface
//OOP - 4. polymorphism - method override

class Student extends Human {
  constructor(firstName, surname, age, GPA, university) {
    super(firstName, surname, age);
    this.GPA = GPA;
    this.university = university;
  }

  test() {
    return this._calcBirthYear();
  }
}

const student1 = new Student("eli", "veliyev", 21, 4.5, "azmiu");

console.log(student1.test());

console.log(student1);

class Animal {
  constructor() {
    if (this.constructor === Animal) {
      throw new Error(
        "Abstract class 'Animal' cannot be instantiated directly."
      );
    }
  }

  makeSound() {
    throw new Error("Method 'makeSound()' must be implemented.");
  }
}

class Dog extends Animal {
  makeSound() {
    console.log("Woof! Woof!");
  }
}

class Cat extends Animal {
  //method override
  makeSound() {
    console.log("Meow!");
  }
}

class Lion extends Cat{

}

// Trying to instantiate the abstract class will throw an error
try {
  const animal = new Animal(); // This will throw an error
} catch (e) {
  console.error(e.message);
}

// Creating instances of the subclasses
const dog = new Dog();
dog.makeSound(); // Outputs: Woof! Woof!

const cat = new Cat();
cat.makeSound(); // Outputs: Meow!
