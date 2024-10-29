//array - list

//length -> 5
//index -> 0,1,2,3,4
//empty -> let empArr = [];
// let numbers = [1, 3, 5, 7, 9];

// let empArr = []; //0
// let emptyArr = new Array();

//js array - fixed deyil
//array dimension - [[1,2],3];

// let num = 1;
// let numbers = [[0, 1], 20, 30, 40, 50, 60, 70, 80, 90];
// let numbers2 = [[0, 1], 20, 30, 40, 50, 60, 70, 80, 90];

// console.log(numbers[0] === numbers2[0]);

// numbers[0] = 'first';
// numbers[100] = 'last';
// console.log(numbers);

// let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // 10

// //loop statements - for, while, do while

// var sum = 0;
// for (let i = 0; i < numbers.length; i++) {
//   sum += numbers[i];
// }
// console.log(sum / numbers.length);

// let students = ["aypara", "nurlan", "qerib", "idris", "ayla", "nermine"];

// for (let i = students.length - 1; i >= 0; i--) {
//   console.log(students[i]);
// }

// let counter = 0;

// for (let i = 0; i < students.length; i++) {

//   for (let j = 0; j < students[i].length; j++) {
//     if (students[i][j] === "r") {
//       counter++;
//     }
//   }

// }
// console.log(counter);

// let counter = -1;
// while (counter === 0) {
//   console.log("inside while loop");
//   counter++;
// }

// do {
//   console.log("inside do while loop");
// } while (counter === 0);

// counter++;

// let people = ["john", "doe", "adam", "jane", "sandler"];

// for (let i = 0; i < people.length; i++) {
//     if(people[i][0]==='j'){
//         console.log(people[i]);
//     }
// }

// let message = 'hello world!';

// console.log(message.length);
// console.log(message.charAt(-1));
// console.log(message.charCodeAt(0));
// console.log(message.at(-2));
// console.log(message[0]);
// console.log(message.slice(0, 4));
// console.log(message.substring(0, 3));
// console.log(message.substr(0, 3));

// const slicedString = message.substring(0,3);

// console.log(slicedString);

// console.log(message.concat(' updated', 'apple'));

// let message = "apple,pear,kiwi,melon,lemon";

// let arr = message.split("");

// console.log(arr);

let fruits = "hello world";

// console.log(fruits.startsWith('hel'));

// let arr = fruits.split(' ');

// let firstIdx = fruits.indexOf("o", fruits.indexOf("o") + 1);
// let result = fruits.indexOf("o", firstIdx + 1);
// console.log(result);

// console.log(fruits.lastIndexOf('p', 4));

let websites = ["turbo.az", "google.com", "translate.uk", "youtube.com"];

for (let i = 0; i < websites.length; i++) {
  if (websites[i].endsWith(".com")) {
    console.log(websites[i]);
  }
}
