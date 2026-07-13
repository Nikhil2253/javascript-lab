console.log(1 == "1");

// == compares values after type conversion (type coercion).

console.log(1 === "1");

// === compares both value and data type without type conversion.

console.log(null == undefined);
console.log(null === undefined);

// null and undefined are loosely equal but not strictly equal.
// undefined means no value has been assigned, whereas null represents an intentional absence of a value.

const obj1 = {
    name: "Nikhil"
};

const obj2 = {
    name: "Nikhil"
};

console.log(obj1 == obj2);
console.log(obj1 === obj2);

// Objects are compared by reference, not by value.

const obj3 = obj1;

console.log(obj1 == obj3);
console.log(obj1 === obj3);

// Both variables reference the same object.

const obj = {
    name: "Nikhil"
};

function name(city, country) {
    console.log(this.name, city, country);
}

name.call(obj, "Incheon", "South Korea");

// call() invokes the function immediately and passes arguments individually.

name.apply(obj, ["Incheon", "South Korea"]);

// apply() invokes the function immediately and passes arguments as an array.

const nameUser = name.bind(obj, "Incheon");

nameUser("South Korea");

// bind() can also pre-set function arguments.

const person1 = {
    name: "Nikhil",
    greet() {
        console.log(`Hello ${this.name}`);
    }
};

const person2 = {
    name: "Rahul"
};

person1.greet.call(person2);

// call() can be used for method borrowing.