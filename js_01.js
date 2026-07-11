// var vs let vs const keywords

var a = 10;
var a = 20;

a = 30; 

// var keyword allows reassignment, redeclaration, initial value undefined

console.log(a);

let b =10;

b = 20;

// let b = 30;

// let keyword allows reassignment, but gives error on redeclaration, it is block scoped

console.log(b);

const pi = 3.14;

// pi = 3.14159;

// const keyword doesnt allows reassignment, redeclaration, initialized when declared

console.log(pi);

{
    var x =1;
    let y =1;
    const z=1;
}

// console.log(x)
// console.log(y)
// console.log(z)

// var has function scope, let and const are block scoped

console.log(hoisting_var);

var hoisting_var = 1;

// var is hoisted and initialized with undefined


// console.log(hoisting_let);

let hoisting_let = 1;

// let is hoisted but stays in the Temporal Dead Zone (TDZ)


// console.log(hoisting_const);

const hoisting_const = 3.14;

// const is hoisted but stays in the Temporal Dead Zone (TDZ)

// TDZ (Temporal Dead Zone) is the period between hoisting and initialization of a let or const variable, and accessing it during this period throws a ReferenceError.