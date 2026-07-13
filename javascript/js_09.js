let a = 10;
let b = a;

b = 20;

console.log(a);
console.log(b);

// Primitive values are copied by value.

const obj1 = {
    name: "Nikhil"
};

const obj2 = obj1;

obj2.name = "Rahul";

console.log(obj1);
console.log(obj2);

// Objects are copied by reference.

const arr1 = [10, 20, 30];

const arr2 = arr1;

arr2.push(40);

console.log(arr1);
console.log(arr2);

// Arrays are also copied by reference.

const employee1 = {
    name: "Nikhil",
    department: {
        name: "Engineering"
    }
};

const employee2 = { ...employee1 };

employee2.department.name = "HR";

console.log(employee1);
console.log(employee2);

// A shallow copy copies only the first level and shares nested object references.

const numbers1 = [
    [1, 2],
    [3, 4]
];

const numbers2 = [...numbers1];

numbers2[0][0] = 100;

console.log(numbers1);
console.log(numbers2);

// A shallow copy shares references of nested arrays.

const employee3 = {
    name: "Nikhil",
    department: {
        name: "Engineering"
    }
};

const employee4 = structuredClone(employee3);

employee4.department.name = "HR";

console.log(employee3);
console.log(employee4);

// A deep copy creates completely independent copies of nested objects.

const product1 = {
    name: "Laptop",
    price: 50000
};

const product2 = Object.assign({}, product1);

product2.price = 60000;

console.log(product1);
console.log(product2);

// Object.assign() creates a shallow copy.

let number = 100;
let text = "JavaScript";
let isLoggedIn = true;
let value = null;
let data;
let uniqueId = Symbol("id");
let bigNumber = 12345678901234567890n;

console.log(number);
console.log(text);
console.log(isLoggedIn);
console.log(value);
console.log(data);
console.log(uniqueId);
console.log(bigNumber);

// Primitive types are Number, String, Boolean, Null, Undefined, Symbol, and BigInt.

const obj = {
    id: 1
};

const arr = [1, 2, 3];

const fn = function () {
    console.log("Hello");
};

console.log(obj);
console.log(arr);
fn();

// Objects, Arrays, and Functions are reference types.

console.log(typeof number);
console.log(typeof text);
console.log(typeof isLoggedIn);
console.log(typeof value);
console.log(typeof data);
console.log(typeof uniqueId);
console.log(typeof bigNumber);
console.log(typeof obj);
console.log(typeof arr);
console.log(typeof fn);

// typeof returns the data type of a value.

const original = {
    name: "Nikhil",
    skills: ["JavaScript", "Node.js"]
};

const shallowCopy = { ...original };
const deepCopy = structuredClone(original);

shallowCopy.skills.push("React");
deepCopy.skills.push("PostgreSQL");

console.log(original);
console.log(shallowCopy);
console.log(deepCopy);

// Nested objects and arrays are shared in a shallow copy but completely independent in a deep copy.