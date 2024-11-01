"use strict"

// let numbers = [1, 2, 3];
// let newNumbers = [...numbers];
// newNumbers[0] = "test";
// console.log(numbers === newNumbers);
// console.log(numbers);
// console.log(newNumbers);

// console.log(Math.max(...[1, 3, 7]));

// let obj = { username: "test123", password: "Admin123" };

// let obj2 = { ...obj };

// let price = 6.35676324;

// console.log(price.toFixed(2))

let num = 7;

// try {
//   if (num % 2 === 0) {
//     console.log(num);
//   } else {
//     throw new Error("number is not even");
//   }
// } catch (error) {
//     console.log(error);
// }

//does return new array
//does effect og array

let numbers = [1, 3, 5, 67, 3, 2, 24, 6, 34, 3, 24];

numbers.forEach((num) => {
  console.log(num);
});

const res = numbers.map((num) => {
  return num * 2;
});

console.log(
  numbers.filter((num, idx) => {
    return num % 2 == 0 && idx > 2;
  })
);

console.log(
  numbers.reduce((acc, currentVal) => {
    return (acc += currentVal);
  }, 0)
);

console.log(
  numbers.every((num) => {
    return num > 0;
  })
);

console.log(
  numbers.some((num) => {
    return num % 2 == 0;
  })
);

const test = Array.from("1234");

// console.log(numbers.keys());
// console.log(numbers.keys());

// const months = ["Januar", "Februar", "Mar", "April"];
// const myMonths = months.with(2, "March");

let text = "message";

String.prototype.log = function(){
    console.log(this);
}
String.prototype.wavy = function(){
    let res = "";
    for (let i = 0; i < this.length; i++) {
        if(i%2==0){
            res += this[i].toUpperCase();
        }
        else{
            res += this[i].toLowerCase();
        }
    }
    return res;
}

Array.prototype.sum = function(){
    // this

}

Boolean.prototype.isTrue = function(){
    console.log(this);
    
}

console.log(text.wavy());

numbers.sum();