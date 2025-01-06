// const data = require("./data.js");
// const os = require("os"); // os module - operating system

// const fs = require("fs"); // file system module
// file create, read, update, delete, rename, etc. (folder)

//create folder
// fs.mkdir("./uploads", (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Folder created.");
//   }
// });

//create file
// fs.writeFile("./uploads/hello.txt", "Hello World from Node.js", (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("File created.");
//   }
// });

// if (fs.existsSync("./uploads/hello.txt")) {
//   //read file
//   fs.readFile("./uploads/hello.txt", "utf8", (err, data) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(data);
//     }
//   });
// }

// if (fs.existsSync("./uploads/hello.txt")) {
//   //update file
//     // fs.appendFile("./uploads/hello.txt", " This is an update.", (err) => {
//     //   if (err) {
//     //     console.log(err);
//     //   } else {
//     //     console.log("File updated.");
//     //   }
//     // });

// //   fs.unlink("./uploads/hello.txt", (err) => {
// //     if (err) {
// //       console.log(err);
// //     } else {
// //       console.log("File deleted.");
// //     }
// //   });
// }

// console.log("hello world from index.js");
// BOM, DOM
// console.log(window);
// console.log(document);

//global object - in node.js
// console.log(global);

// __dirname - path to current directory
// console.log(__dirname);

// __filename; // file name
// console.log(__filename);

// console.log(data.categories);

// const path = require("path");

// console.log(path.join(__dirname, "uploads", "hello.txt"));

// const crypto = require("crypto");

// const password = "password123";
// const hash = crypto.createHash("sha256").update(password).digest("hex");

// console.log("Hashed password:", hash);

// const http = require("http");

// console.log(http.STATUS_CODES);

// const https = require("https");

