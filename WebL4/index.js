let person = {
  name: "waleed",
  age: 23,
  gender: "male",
  isStudent: true,
  registeredCources: {
    course1: { name: "Web ENgineering", title: "web" },
    course2: { name: "Stochastic Processes", title: "web" },
    course3: { name: "Web ENgineering", title: "PF" },
  },
  //function
  displayPerson: function () {
    console.log(this['name']);
  },
};

Object.keys(person);
Object.values(person);

let person1 = new Object();
person1.name = "Waleed";
person1.age = 23;

let person2 = Object.create(null);
person2.name = "Waleed";
person2.age = 23;

// access Object
person.name;
person2["name"];
//

let name = document.getElementById("text1").id;

person1["city"] = "Faisalabad";

delete person1["city"];

let currentStudent = {...person, class:"GOOOO"};
Object.seal(person);
Object.freeze(person);

console.log("Hello");
