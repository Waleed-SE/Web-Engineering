// console,console.log("I AM Initial");

// setTimeout(function () {
//     console.log("i Am Under The Water");
// },2000);
// setTimeout(function () {
//     console.log("i Am Under The Tree");
// }, 500);

// console.log("I Am Ending");

// console.log("Before");

// function fetchUser() {
//     setTimeout(() => {
//         //console.log("I Am Inside");
//         return {name : "Waleed", age: 23};
//     }, 2000);
// }
// const returnedUser = fetchUser();
// console.log("End");

// console.log("Before");

// function fetchUser(userId, callback) {
//   setTimeout(() => {
//     const fetchedUser = { id: userId, name: "Waleed", age: 23 };
//     callback(fetchedUser);
//   }, 2000);
// }
// fetchUser(1, function(user){console.log(user)});
// console.log("End");

// console.log("Before");

// function sendEmail(userEmail, callback) {
//   setTimeout(() => {
//     // const users = [
//     //   { id: 1, name: "Waleed", age: 23, email: "xyz@gmail.com" },
//     //   { id: 2, name: "Waleed", age: 22, email: "xy@gmail.com" },
//     //   { id: 3, name: "Waleed", age: 21, email: "x@gmail.com" },
//     // ];
//     const response = { status: true };
//     callback(response);
//   }, 3000);
// }
// sendEmail("xyz@gmail.com", function (response) {
//   console.log(response);
// });
// console.log("End");

// console.log("Before");

// const promise = new Promise(function (resolve, reject) {
//   setTimeout(() => {
//     //resolve(1);
//     reject(new Error("I AM Rejected"));
//   }, 2000);
// });

// promise.then((result) => {
//   console.log(result.message);
// });
// promise.catch((error) => {
//   console.log(error);
// });

// console.log("End");


const getApi = fetch("https://api.github.com/users/hashimaliii");

getApi.then((result) => {
    console.log(result);
})
getApi.catch((error) => {
    console.log(error);
})

const fruits = [["Banana", "Orange", "Apple", ["Mango","Ali"]],["Banana", "Orange", "Apple", "Mango"],["Banana", "Orange", "Apple", "Mango"]];
let text = fruits.join("");
console.log(text)
