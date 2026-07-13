const obj = {
    name: "Nikhil"
};

console.log(obj);

// Every object has a hidden prototype.

console.log(Object.getPrototypeOf(obj));

// Object.getPrototypeOf() returns the prototype of an object.

const animal = {
    origin: "Earth",

    run() {
        console.log("Running");
    }
}

const pig = Object.create(animal);

pig.name = "Tommy";
pig.breed = "American";

console.log(pig);

pig.run();

// Object.create() creates a new object that inherits from another object.
// If a property is not found on the object, JavaScript looks for it in the prototype.

function Human(name){
    this.name = name;
}

Human.prototype.getName = function () {
    console.log(`Hello ${this.name}`);
}

const human = new Human("Nikhil");

human.getName();

// Methods added to the prototype are shared by all instances.

console.log(pig.toString());
console.log(pig.hasOwnProperty("name"));
console.log(pig.hasOwnProperty("breed"));
console.log(pig.hasOwnProperty("run"));
console.log(pig.hasOwnProperty("origin"));

// JavaScript searches the prototype chain until the property or method is found.
// hasOwnProperty() checks whether a property belongs directly to the object.