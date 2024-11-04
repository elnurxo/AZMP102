class Animal {
  _age;
  constructor(name, age) {
    this.name = name;
    //protected field
    this._age = age;
  }

  //public method
  makeNoise() {
    console.log(`${this.name} makes noise`);
  }

  //getters - encapsulation
  get age() {
    return this._age;
  }
  //setters
  set age(newVal) {
    this._age = newVal > 0 ? newVal : 0;
  }
}

class Cat extends Animal {
  constructor(name, age, color) {
    super(name, age);
    this.color = color;
  }

  //method override - polymorphism
  makeNoise() {
    console.log(`${this.name} meows!`);
  }
}

const animal = new Animal("nemo", 3);
const garfield = new Cat("garfield", 5, "orange");
console.log(garfield);
animal.makeNoise();
garfield.makeNoise();

class Lion extends Cat {
  constructor(name, age, color, killCount) {
    super(name, age, color);
    this.killCount = killCount > 0 ? killCount : 0;
  }

  makeNoise(){
    console.log(`${this.name} roars!`);
  }
}

const simba = new Lion("simba", 12, "yellow", 4);
simba.age = 23;
console.log(simba.age);
simba.makeNoise();
console.log(simba)
