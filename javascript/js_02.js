function myname(){
    console.log("Nikhil")
}

myname();

// Function expressions are not fully hoisted because only the variable is hoisted.

const name = () => {
    console.log("Nikhil")
}

name();

// Arrow functions provide shorter syntax and do not have their own 'this'.

function mynameis(name = "Nikhil") {
    return `My Name is ${name}`
}

console.log(mynameis())
console.log(mynameis("Nikhil"))

// name is parameter, "Nikhil" is argument.
// Default parameters are used when no argument is passed.

function sum(...nums) {
    return nums.reduce((a, b) => a + b, 0);
}

console.log(sum(1, 2, 3, 4));

// Rest operator (...) collects multiple arguments into an array.

console.log(this)

// 'this' refers to the object that is calling the function.

const user = {
    name: "Nikhil",

    getUser() {
        console.log(this.name)
    }
}

user.getUser();

// 'this' refers to the object that calls the method.

function sayname() {
    console.log(this)
}

sayname();

// In a regular function, 'this' depends on how the function is called.

const userObj = {
    name: "Nikhil",

    getName: () => {
        console.log(this);
    }
};

userObj.getName();

// Arrow functions do not have their own 'this'; they inherit it from the surrounding scope.

const userObjWithArrowFunction = {
    name: "Nikhil",

    greet() {
        const print = () => {
            console.log(this.name);
        };

        print();
    }
};

userObjWithArrowFunction.greet();

// Arrow functions inherit 'this' from the enclosing function.

function outer() {
    let count = 0;

    function inner() {
        count++;
        console.log(count);
    }

    return inner;
}

const counter = outer();

counter();
counter();
counter();

// A closure is a function that remembers and can access variables from its outer scope even after the outer function has finished executing.

function counterfunction() {
    let count = 0;

    return {
        increment(){
            count++;
        },

        getCount() {
            return count;
        }
    }
}

const c = counterfunction();

c.increment();
c.increment();

console.log(c.getCount());

// Closures can be used to create private variables.