function func() {
    console.log(greet('Abdullah'));
}

let greet = function functionGreeting(name) {
    return `Hello, ${name}`;
}

function findDuplicate(array) {
    let duplicates;
    return function() {
        duplicates = array.filter((i, ind) => array.indexOf(i) !== ind);
        return [...new Set(duplicates)];
    }
}

let findDuplicates = (array) => {
    let duplicates = array.filter((i, ind) => array.indexOf(i) !== ind);
    return [...new Set(duplicates)];
};

let manipulator = function(value1,value2,func) {
    return func(value1,value2);
}
let multiply = function(a,b) {
    return a*b;
}

function counter() {
    let count = 0;
    return function() {
        return count++;
    }
}
let increment = counter();

function mul(...arr) {
    return arr.reduce(((val, acc) => acc * val),1)
}
setTimeout(mul, 5000)

//function generators