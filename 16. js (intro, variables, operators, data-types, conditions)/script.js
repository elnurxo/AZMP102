// let, var, const

//hosting, hoisting
// let - ECMA6

// let num1 = 125;
// let num2 = 5;

//arithmetic
// console.log(num1 + num2);
// console.log(num1 - num2);
// console.log(num1 * num2);
// console.log(num1 / num2);
// console.log(num2 ** 2);
// console.log(num1 % num2);
// console.log(num1++);
// console.log(++num1);
// console.log(num1--);
// console.log(--num1);

// let sum = num1 + num2;

// console.log(`sum of ${num1} & ${num2} is ${sum}`);

// let x = 5;
// let y = "5";

// x += y;
// x -= y;
// x *= y;
// x /= y;
// x **= y; //x = x ** y
// x %= y;
// console.log(x);

// console.log((5 > 4) || !false || (!5>=5) && false || true && true  || (true || false));

// console.log(true);

//string concat

//conditions
let fullName = "Aypara Kerimova";
let age = 18;
let balance = 7;
let ticket_price = 8;

if (age > 18) {
  console.log("welcome to the cinema!");
  //nested condition
  if (balance >= ticket_price) {
    balance -= ticket_price;
    console.log("current balance: ", balance);
  } else {
    console.log("not enough balance!");
  }
} else if (age == 18) {
  if (balance >= ticket_price / 2) {
    balance -= ticket_price / 2;
    console.log("current balance: ", balance);
  } else {
    console.log("not enough balance!");
  }
} else {
  console.log("get boyu gelersen!");
  console.log(`current balance: ${balance}`);
}

// let num1 = 18;
// let num2 = 25;

// if (num1 > num2) {
//   console.log("number 1 - ", num1);
// } else if (num1 === num2) {
//   console.log("numbers are equal!");
// }
// else {
//   console.log("number 2 - ", num2);
// }
