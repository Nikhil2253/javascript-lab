import { sum, PI } from "./utils/math.js";
import getname from "./utils/getname.js";
import * as math from "./utils/math.js";

console.log("Start");

console.log("Middle");

console.log("End");

// The Call Stack executes synchronous code one statement at a time.

setTimeout(() => {
    console.log("Timeout");
}, 0);

// setTimeout() callbacks are placed in the Macrotask Queue.

Promise.resolve().then(() => {
    console.log("Promise");
});

// Promise callbacks are placed in the Microtask Queue.

console.log("Start");

setTimeout(() => {
    console.log("Timeout");
}, 0);

Promise.resolve().then(() => {
    console.log("Promise");
});

console.log("End");

// Microtasks are executed before Macrotasks.

console.log("Start");

setTimeout(() => {
    console.log("A");
}, 0);

Promise.resolve().then(() => {
    console.log("B");
});

Promise.resolve().then(() => {
    console.log("C");
});

console.log("End");

// The Event Loop executes all Microtasks before processing the next Macrotask.

function first() {
    console.log("First");
    second();
}

function second() {
    console.log("Second");
}

first();

// Function calls are pushed onto the Call Stack and removed after execution.

console.log("Start");

setTimeout(() => {
    console.log("Timeout");
}, 0);

Promise.resolve().then(() => {
    console.log("Promise 1");
});

Promise.resolve().then(() => {
    console.log("Promise 2");
});

console.log("End");

// Execution Order:
// 1. Synchronous Code
// 2. Microtask Queue
// 3. Macrotask Queue

try {
    console.log(a);
} catch (error) {
    console.log(error);
}

// try executes code, and catch handles any error that occurs.

try {
    console.log(a);
} catch (error) {
    console.log(error.name);
    console.log(error.message);
}

// The error object contains information about the error.

try {
    console.log("Hello");
} catch (error) {
    console.log(error);
} finally {
    console.log("Finished");
}

// finally executes whether an error occurs or not.

function divide(a, b) {
    if (b === 0) {
        throw new Error("Division by zero is not allowed.");
    }

    return a / b;
}

try {
    console.log(divide(10, 0));
} catch (error) {
    console.log(error.message);
}

// throw creates a custom error.

async function getData() {
    try {
        const result = await Promise.reject("Request Failed");

        console.log(result);
    } catch (error) {
        console.log(error);
    }
}

getData();

// try...catch handles errors from async/await.

try {
    try {
        throw new Error("Inner Error");
    } catch (error) {
        console.log(error.message);
    }
} catch (error) {
    console.log(error.message);
}

// try...catch blocks can be nested.

console.log(PI);
console.log(sum(10, 20));

// Named imports must match the exported names.

getname();

// Default imports can have any valid name.

console.log(math.PI);
console.log(math.sum(50, 25));

// import * imports all named exports as an object.