// let numbers = [23, 12, 13, 64, 25, 36, 101, 9, 15];
// numbers.splice(3, 1);
// console.log(numbers);

// let students = ["john", "barney", "jack", "todd", "ted", "jonathan"];

// console.log(numbers.length);
// console.log(students.length);

// console.log(numbers.toString().length);

// console.log(numbers.at(0));

let text = "apple pear kiwi";

// console.log(text.split(' ').join(' '));

//pop, push, shift, unshift
// numbers.push(12,24);
// console.log(numbers);
// numbers.pop();
// numbers.pop();
// console.log(numbers);
// numbers.shift();
// console.log(numbers);
// numbers.unshift(101,102);
// console.log(numbers);

// delete numbers[0];
// console.log(numbers);

let boys = ["john", "jack"];
let girls = ["eva", "ann"];

// console.log(boys.copyWithin(0, 2));

// let multiDimension = [[1, [3, 4]], 3];

// console.log(multiDimension.flat(2));

let fruits = ["apple", "kiwi", "pear", "melon", "lemon", "banana"];

// fruits.splice(fruits.indexOf("pear"), 1);

// const newFruits = fruits.toSpliced(fruits.indexOf('kiwi') + 1, 1, "mango");

// console.log(newFruits);

const newFruits = fruits.slice(1, 3);

console.log(newFruits);
