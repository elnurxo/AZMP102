const fruits = ["alma", "banan", "qarpız", "nar", "ananas", "portağal"];

let maxLengthWord = fruits[0];

for (let i = 0; i < fruits.length; i++) {
  if (maxLengthWord.length < fruits[i].length) {
    maxLengthWord = fruits[i];
  }
}

console.log("max length word: ", maxLengthWord);

//task 2

let isPalindrome = "amma";
let text = "";
for (let i = isPalindrome.length - 1; i >= 0; i--) {
  text += isPalindrome[i];
}
console.log(text == isPalindrome);
