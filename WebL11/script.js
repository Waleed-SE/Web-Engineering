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

// localStorage.setItem("1", "Abdullah");
// localStorage.setItem("gitHub", "https://api.github.com/users/hashimaliii");

// const users = [
//   { name: "hashim", age: 52 },
//   { name: "faizan", age: 25 },
// ];
// // console.log(users);
// // console.log(JSON.stringify(users));
// localStorage.setItem("classStudents", JSON.stringify(users));
// console.log(localStorage.getItem("classStudents"));

function autoDelete(id, time) {
  setTimeout(() => {
    let element = document.getElementById(id);
    if (element) {
      element.remove();
    }
  }, time);
}

async function getGitData(e) {
  e.preventDefault();
  console.log("Check");
  var clientId = "Ov23liLgE1z3LeazS0fK";
  var clientSecret = "412a284dcf0a52f99aec8b35d188bd2363eeb9a1";
  var username = document.getElementById("git-id").value;
  console.log(username);
  var url = `https://api.github.com/users/${username}?client_id=${clientId}&client_secret=${clientSecret}`;

  const gitData = await fetch(url);
  if (!gitData.ok) {
    let hh = document.createElement("h1");
    hh.textContent = "User Not Found";
    hh.id = "delete-me";
    document.getElementById("body").appendChild(hh);
    autoDelete("delete-me", 2000);
    throw new Error("404 Not Found");
  }
  const profile = await gitData.json();

  //   let name = profile.name;
  //   let email = profile.email;
  //   let country = profile.country;
  //   let image = profile.image;
  //   console.log(name);
  //   console.log(email);
  //   console.log(country);
  //   console.log(image);

  displayRepo(profile.repos_url);
  displayFollowers(profile.followers_url);
  console.log(profile);
}
document.getElementById("button-submit").addEventListener("click", getGitData);

async function displayRepo(repo) {
  const repos = await fetch(repo);
  const allrepos = await repos.json();
  // let body = document.getElementById("body");
  // let divDescription = document.createElement("div");
  // divDescription.id = "repos";
  // body.addElement(divDescription);
  console.log(allrepos);
}

async function displayFollowers(url) {
  const followers = await fetch(url);
  const allfollowers = await followers.json();
  // let body = document.getElementById("body");
  // let divDescription = document.createElement("div");
  // divDescription.id = "repos";
  // body.addElement(divDescription);
  console.log(allfollowers);
}
