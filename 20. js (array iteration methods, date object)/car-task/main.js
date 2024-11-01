const car1 = {
  modelName: "bmw",
  brandName: "x5",
  horsePower: 550,
  year: 2018,
  milage: 10_000,
  currentFuel: 35,
  fuelCapacity: 70,
  serviceHistory: [100, 300, 250],
  fuelFor1KM: 4,
  drive: function (km) {
    if (this.currentFuel / this.fuelFor1KM <= km) {
      this.milage += km;
      this.currentFuel -= this.fuelFor1KM * km;
    } else {
      return "not enough fuel!";
    }
  },
  age: function () {
    return new Date().getFullYear() - this.year;
  },
  calculateMaxKm: function () {
    return this.currentFuel / this.fuelFor1KM;
  },
  serviceCost: function () {
    let res = 0;
    for (const cost of this.serviceHistory) {
      res += cost;
    }
    return res;
  },
};
const car2 = {
  modelName: "mercedes",
  brandName: "benz",
  horsePower: 450,
  year: 2012,
  milage: 100_000,
  currentFuel: 15,
  fuelCapacity: 60,
  serviceHistory: [100, 50, 150],
  fuelFor1KM: 6,
  drive: function (km) {
    if (this.currentFuel / this.fuelFor1KM <= km) {
      this.milage += km;
      this.currentFuel -= this.fuelFor1KM * km;
    } else {
      return "not enough fuel!";
    }
  },
  age: function () {
    return new Date().getFullYear() - this.year;
  },
  calculateMaxKm: function () {
    return this.currentFuel / this.fuelFor1KM;
  },
  serviceCost: function () {
    let res = 0;
    for (const cost of this.serviceHistory) {
      res += cost;
    }
    return res;
  },
};
const car3 = {
  modelName: "bmw",
  brandName: "x6",
  horsePower: 500,
  year: 2020,
  milage: 50_000,
  currentFuel: 60,
  fuelCapacity: 80,
  serviceHistory: [250],
  fuelFor1KM: 8,
  drive: function (km) {
    if (this.currentFuel / this.fuelFor1KM <= km) {
      this.milage += km;
      this.currentFuel -= this.fuelFor1KM * km;
    } else {
      return "not enough fuel!";
    }
  },
  age: function () {
    return new Date().getFullYear() - this.year;
  },
  calculateMaxKm: function () {
    return this.currentFuel / this.fuelFor1KM;
  },
  serviceCost: function () {
    let res = 0;
    for (const cost of this.serviceHistory) {
      res += cost;
    }
    return res;
  },
};
const car4 = {
  modelName: "kia",
  brandName: "optima",
  horsePower: 350,
  year: 2013,
  milage: 250_000,
  currentFuel: 15,
  fuelCapacity: 50,
  serviceHistory: [400, 350],
  fuelFor1KM: 5.5,
  drive: function (km) {
    if (this.currentFuel / this.fuelFor1KM <= km) {
      this.milage += km;
      this.currentFuel -= this.fuelFor1KM * km;
    } else {
      return "not enough fuel!";
    }
  },
  age: function () {
    return new Date().getFullYear() - this.year;
  },
  calculateMaxKm: function () {
    return this.currentFuel / this.fuelFor1KM;
  },
  serviceCost: function () {
    let res = 0;
    for (const cost of this.serviceHistory) {
      res += cost;
    }
    return res;
  },
};
const car5 = {
  modelName: "tesla",
  brandName: "y",
  horsePower: 250,
  year: 2023,
  milage: 5_000,
  currentFuel: 45,
  fuelCapacity: 80,
  serviceHistory: [50, 80],
  fuelFor1KM: 2,
  drive: function (km) {
    if (this.currentFuel / this.fuelFor1KM <= km) {
      this.milage += km;
      this.currentFuel -= this.fuelFor1KM * km;
    } else {
      return "not enough fuel!";
    }
  },
  age: function () {
    return new Date().getFullYear() - this.year;
  },
  calculateMaxKm: function () {
    return this.currentFuel / this.fuelFor1KM;
  },
  serviceCost: function () {
    let res = 0;
    for (const cost of this.serviceHistory) {
      res += cost;
    }
    return res;
  },
};

const cars = [car1, car2, car3, car4, car5];

const getTop3HorsepowerCars = (arr) => {
  let resArr = arr
    .sort((x, y) => x.horsePower - y.horsePower)
    .reverse()
    .slice(0, 3);
  return resArr;
};

//operation 1
// console.log(cars.sort((a,b)=>a.year - b.year));

//operation 2
// console.log(cars.find((x)=>x.milage > 10_000));

//operation 3
// console.log(
//   cars.filter((x) => {
//     return x.age() > 10;
//   })
// );


//callback - HOF
function greet(name, cb){
    console.log(`hey ${name}`);
    cb();
}

function callMe(){
    console.log('i am callback function!');
}

greet('Bob', callMe);

(function(){
    console.log('i am IIFE');
})();