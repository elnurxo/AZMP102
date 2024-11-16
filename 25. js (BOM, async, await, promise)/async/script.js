let promise = new Promise(function (resolve, reject) {
  resolve("orange");
});

async function g() {
  return "this is sync function!";
}

async function gAsync() {
  const res = await promise;
  console.log(res);
  return res;
}

async function f() {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("done!"), 1000);
  });

  let result = await promise; // wait until the promise resolves (*)
//   const x = await result;
//   const y = await x;
  alert(result); // "done!"
}

f();

//3 state - pending, fulfilled, rejected
// let promise = new Promise(function (resolve, reject) {
//   resolve("orange");
// });
//promise chaining
// promise
//   .then((data) => {
//     console.log(data);
//     return 5;
//   })
//   .then((x) => {
//     console.log(x);
//     return x ** 2;
//   })
//   .then((y) => {
//     // throw new Error("y is not defined!");
//     console.log(y);
//   })
//   .then((z) => {
//     console.log(z);
//   })
//   .catch((err) => {
//     console.log("error: ", err);
//   });

const dataHeading = document.querySelector("#data");
promise.then((orange) => {
  dataHeading.textContent = orange;
});
