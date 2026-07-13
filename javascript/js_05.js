const promise = new Promise((resolve, reject) => {
    const success = true;

    if(success){
        resolve("Nikhil")
    } else {
        reject("Error")
    }
});

console.log(promise);

// A Promise represents the eventual completion or failure of an asynchronous operation.
// A Promise has three states: Pending, Fulfilled, and Rejected.

promise
.then(result=>{
    console.log(result);
})
.catch(error=>{
    console.log(error);
})
.finally(()=>{
    console.log("Finished")
});

// then() executes when the Promise is fulfilled.
// catch() executes when the Promise is rejected.
// finally() executes whether the Promise is fulfilled or rejected.

Promise.resolve(10)
       .then(num => num * 2)
       .then(num => num + 5)
       .then(result => console.log(result));

// then() returns a new Promise, allowing Promise chaining.

const one = Promise.resolve(10);
const two = Promise.resolve(20);
const three = Promise.resolve(30);

Promise.all([one, two, three])
       .then(result => console.log(result));

// Promise.all() resolves when all Promises are fulfilled and rejects if any Promise fails.

const promise1 = new Promise(resolve => setTimeout(() => resolve("Promise One"), 1000));
const promise2 = new Promise(resolve => setTimeout(() => resolve("Promise Two"), 2000));

Promise.race([promise1, promise2])
       .then(result => console.log(result));

// Promise.race() settles with the first Promise to resolve or reject.

Promise.allSettled([promise1, promise2])
       .then(result => console.log(result));

// Promise.allSettled() waits for all Promises regardless of success or failure.

Promise.any([promise1, promise2])
       .then(result => console.log(result));

// Promise.any() resolves with the first fulfilled Promise.

const name = async () => {
    const success = await new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, 2000);
    });

    if (success) {
        return "Nikhil";
    } else {
        return "Error";
    }
};

name().then((result) => {
    console.log(result);
});

// async function always returns a Promise.
// await pauses execution until the Promise is fulfilled.

const calculate = async(a,b,operator)=> {
    return eval(`${a}${operator}${b}`);
}

calculate(1,2,"+")
   .then(result => console.log(result));

// Values returned from an async function are automatically wrapped in a Promise.

const run = async() => {
    try{
        await Promise.reject("Error in Running Async Awaited Promise");
    } catch(error) {
        console.log(error);
    }
}

run();

// try...catch handles errors from awaited Promises.

async function addnumbers() {
    const a = await Promise.resolve(10);
    const b = await Promise.resolve(20);

    console.log(a + b);
}

addnumbers();

// await can be used multiple times inside an async function.