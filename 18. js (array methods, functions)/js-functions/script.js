//reusable code blocks
//function signature -
// functions - pure func, arrow func, anonym func (func expression)

//function declaration
//function parameter
// showMessage();

//local variable, outer variable
// var userName = "John";

//function invoke
//function call
//argument

// function getFullName(fName, lName) {
//   //local variable
//   let fullName = fName.concat(" ", lName);
//   return fullName;
// }

// fullName, age, GPA (0-100) => John doe was born in 1999 and (failed/passed) the exam

// function getStudentInfo(firstName, lastName, age, GPA) {
//   let result = `${firstName.concat(" ", lastName)} was born in ${
//     new Date().getFullYear() - age
//   } and placeholder the exam`;

//   if (GPA >= 51) {
//     result = result.replace("placeholder", "passed");
//   } else {
//     result = result.replace("placeholder", "failed");
//   }

//   return result;
// }

// console.log(getStudentInfo("John", "Doe", 28, 58));

// function anotherFunction() {
//   console.log('test')
//   return true;
// }

// function showMessage(from, text = anotherFunction()) {
//   return `this message is from: ${from}\nmessage is: ${text}`;
// }

// console.log(showMessage("John"));

//function declaration

//local var, outer var

//function invoke - signature
//void function - does not return a value

// console.log(Math.max(3, 1, 67, 24, 33, 101, 3));

//func - regular, anonym fun (func expression), arrow func (ECMA6), pure

//regular

//task - 1 parameter -> 3 car brand " ", return array (3 element)

//regular
// "bmw mercedes kia" => ["bmw","mercedes","kia"]

function calcFactorial(num) {
  let counter = 1;
  let factorial = 1;
  while (counter < num) {
    counter++;
    factorial *= counter;
  }
  return factorial;
}

const calcFactorialAnonym = function (num) {
  let counter = 1;
  let factorial = 1;
  while (counter < num) {
    counter++;
    factorial *= counter;
  }
  return factorial;
};

const calcFactorialArrow = (num) => {
  let counter = 1;
  let factorial = 1;
  while (counter < num) {
    counter++;
    factorial *= counter;
  }
  return factorial;
};

// 1 * 2 * 3 * 4
console.log(calcFactorial(5));
