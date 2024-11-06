export class Human {
  constructor(fullName, age) {
    this.fullName = fullName;
    this.age = age;
  }
}

export class Student extends Human {
  static idCounter = 1;
  constructor(fullName, age, hasPassed = false) {
    super(fullName, age);
    this.createdAt = new Date();
    this.id = Student.idCounter++;
    this.hasPassed = hasPassed;
  }
}
