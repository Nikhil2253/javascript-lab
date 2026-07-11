const user = {
    name: "Nikhil",
    age: 20,
    isStudent: false
};

// Objects store data as key-value pairs.

console.log(user.name);
console.log(user.age);
console.log(user["name"]);
console.log(user["age"]);

// Values can be accessed by both dot notation and bracket notation , // Bracket notation is useful when the property name is dynamic.

user.city = "st. petersburg";

console.log(user)

user.age = 21;

console.log(user)

delete user.isStudent;

console.log(user);

console.log("name" in user);
console.log("salary" in user);

const userObj = {
    name: "Nikhil",

    getName() {
        console.log(`Hello ${this.name}`);
    }
}

userObj.getName();

// Functions inside objects are called methods.

console.log(Object.keys(userObj));
console.log(Object.values(userObj));
console.log(Object.entries(userObj));

// properties of Object

const copy = { ...user };

console.log(copy);

// Spread operator creates a shallow copy.

const copyusingproperty = Object.assign(user);

console.log(copyusingproperty);

// Object.assign() also creates a shallow copy.

const userObject = {
    name: "Nikhil",
    age: 20,
    address: {
        city: "st. petersburg"
    }
};

const copyObject = { ...userObject };

copyObject.address.city = "Incheon";

console.log(userObject)
console.log(copyObject)

// A shallow copy creates a new object but copies references for nested objects and arrays.

const nums = [1, 2, 3, 4, 5];

// Arrays store multiple values in a single variable.

nums.push(6);

console.log(nums);

// push() adds an element at the end of the array.

nums.pop();

console.log(nums);

// pop() removes the last element from the array.

nums.unshift(0);

console.log(nums);

// unshift() adds an element at the beginning of the array.

nums.shift();

console.log(nums);

// shift() removes the first element from the array.

const doubled = nums.map(num => num * 2);

console.log(doubled);

// map() returns a new array by transforming each element.

const even = nums.filter(num => num % 2 === 0);

console.log(even);

// filter() returns a new array containing elements that satisfy the condition.

const sum = nums.reduce((acc, curr) => acc + curr, 0);

console.log(sum);

// reduce() returns a single value by combining all array elements.

const firstEven = nums.find(num => num % 2 === 0);

console.log(firstEven);

// find() returns the first element that satisfies the condition.

const firstEvenIndex = nums.findIndex(num => num % 2 === 0);

console.log(firstEvenIndex);

// findIndex() returns the index of the first matching element.

console.log(nums.some(num => num > 4));

// some() returns true if at least one element satisfies the condition.

console.log(nums.every(num => num > 0));

// every() returns true if all elements satisfy the condition.

console.log(nums.includes(3));

// includes() checks whether an element exists in the array.

const sorted = [5, 2, 8, 1, 3];

sorted.sort((a, b) => a - b);

console.log(sorted);

// sort() sorts the array, use a compare function when sorting numbers.

nums.forEach(num => {
    console.log(num);
});

// forEach() executes a function for each array element and returns undefined.

const obj = {
    name: "Nikhil",
    age: 20,
    city: "Delhi"
};

const { name, age } = obj;

console.log(name);
console.log(age);

// Object destructuring extracts properties from an object into variables.

const { name: fullName } = obj;

console.log(fullName);

// Properties can be renamed while destructuring.

const { salary = 50000 } = obj;

console.log(salary);

// Default values are used if the property does not exist.

const numbers = [10, 20, 30];

const [first, second, third] = numbers;

console.log(first);
console.log(second);
console.log(third);

// Array destructuring extracts values based on their position.

const values = [10, 20, 30, 40];

const [start, , end] = values;

console.log(start);
console.log(end);

// Commas can be used to skip array elements.

const [head, ...remaining] = values;

console.log(head);
console.log(remaining);

// Rest operator collects the remaining elements into an array.

const nestedObj = {
    name: "OpenAI",
    location: {
        city: "San Francisco",
        country: "USA"
    }
};

const {
    location: { city }
} = nestedObj;

console.log(city);

// Nested properties can also be destructured.

const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

const merged = [...arr1, ...arr2];

console.log(merged);

// Spread operator expands elements from arrays.

const obj1 = {
    name: "Nikhil"
};

const obj2 = {
    age: 20
};

const mergedObj = {
    ...obj1,
    ...obj2
};

console.log(mergedObj);

// Spread operator merges objects.

const copyarray = [...arr1];

console.log(copyarray);

// Spread operator creates a shallow copy of an array.

const objCopy = { ...obj1 };

console.log(objCopy);

// Spread operator creates a shallow copy of an object.

function add(a, b, c) {
    return a + b + c;
}

const numsarray = [10, 20, 30];

console.log(add(...numsarray));

// Spread operator expands an array into individual arguments.

function addarraynumbers(...nums) {
    return nums.reduce((acc, curr) => acc + curr, 0);
}

console.log(addarraynumbers(1, 2, 3, 4, 5));

// Rest parameter collects multiple arguments into an array.

const valuesarray = [10, 20, 30, 40];

const [startvalue, ...remainingvalues] = valuesarray;

console.log(startvalue);
console.log(remainingvalues);

// Rest operator collects the remaining array elements.

const employee = {
    name: "Nikhil",
    age: 20,
    city: "Delhi"
};

const { nameofobj, ...details } = employee;

console.log(nameofobj);
console.log(details);

// Rest operator collects the remaining object properties.