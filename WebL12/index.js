// const add = require("./module/add");
// const sub = require("./module/sub");
// const mul = require("./module/mul");
// const div = require("./module/div");
// console.log("Hello");
// // document.getElementById();
// x = add(5, 6);
// console.log(x);
// console.log(sub(9, 7));
// console.log(mul(9, 7));
// console.log(div(9, 7));

// const file = require("fs");
// //file.writeFile('__dirname__');
// //file.writeFile('__filename__');

// file.writeFile(
//   "./data.txt",
//   "Bkasc ashbcjasnkcnnsd c jhsd c sdh vbdsjc ",
//   (err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("File Written Successfully");
//     }
//   }
// );

// file.readFile("./data.txt", "UTF8", (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data);
//   }
// });

// file.unlink("./data.txt", (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("File Deleted Successfully");
//   }
// });

// const filejson = require('fs').promises;

// filejson.readFile("./data.json", "UTF-8", (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data);
//   }
// });

// function totalSalary() {
//     let data = filejson.readFile("data.json", "utf-8");
//     data = json.parse(data);
//     data.array.forEach(person => {
//         console.log(person);
//         console.log(person.salary);
//     });
// }

const http = require('http');

const server = http.createServer((req, res) =>{
    // res.writeHead(200, { "Content Type:textPlain"})
    res.end("<h1>WelCome</h1>");
    console.log("Server Is Running");
});
server.listen(1000);