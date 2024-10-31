//HOF - Higher Order Function
// function greet(name, callback) {
//   console.log(`Hello, ${name}!`);
//   callback();
// }

// //callback
// function sayGoodbye() {
//   console.log("Goodbye!");
// }

// greet("Alice", sayGoodbye);

// function fetchData(callback) {
//   console.log("call HOF");
//   setTimeout(() => {
//     const x = { id: 1, name: "Alice" };
//     callback(x);
//   }, 2000); // Simulating a delay of 2 seconds
// }

// fetchData((data) => {
//   console.log("Data received:", data);
// });

// const intervalId = setInterval(() => {
//     console.log('hello every 1 second!');
// }, 1000);

// clearInterval(intervalId);

// const timeOutId = setTimeout(() => {
//     console.log('hello after 1 second')
// }, 1000);

// clearTimeout(timeOutId);

// recursive function - countdown
// function counter(count) {
//   console.log(count);

//   if (count > 1) {
//     count = count - 1;

//     counter(count);
//   } else {
//     return;
//   }
// }

// access function
// counter(10);
// function createMultiplier(factor) {
//   return function (number) {
//     return number * factor;
//   };
// }

// const double = createMultiplier(2);
// console.log(double(2));

// console.log(createMultiplier(2)(5));

// // console.log(double(5)); // Output: 10

// function createPrefixer(prefix) {
//     return function(word) {
//         return prefix + word;
//     };
// }

// console.log(createPrefixer('Doc. ')('Smith'));

// IIFE - function declaration, call
((name) => {
  console.log(`hey ${name}`);
})("Bob");
