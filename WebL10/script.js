// const promise = new Promise((resolve, reject) => {
//     resolve(1);
// });

// const promise2 = new Promise((resolve, reject) => {
//     reject(new Error("Teri Teri Teri"));
// });
// Promise.all([promise, promise2]).then(res).catch(err);

// const getApi = fetch("https://api.github.com/users/hashimaliii");

// getApi.then((res) => res.json()).then((profile) => console.log(profile));

// async function getGitData() {
//     const gitData = await fetch("https://api.github.com/users/hashimaliii");
//     const profile = gitData.json();
//     console.log(profile);
// }

localStorage.setItem("1", "Abdullah");
localStorage.setItem("gitHub", "https://api.github.com/users/hashimaliii");

const users = [
  { name: "hashim", age: 52 },
  { name: "faizan", age: 25 },
];
// console.log(users);
// console.log(JSON.stringify(users));
localStorage.setItem("classStudents", JSON.stringify(users));
console.log(localStorage.getItem("classStudents"));