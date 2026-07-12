<script setup>
import Button from './Button.vue';

const name = "Nikhil Saxena";
const age = 20;

const obj = {
    city: "Delhi",
    country: "India"
};

const numbers = [10, 20, 30];

const getName = () => {
    return name.split(" ");
}

// Variables, objects, arrays, and functions declared here can be accessed inside the template.

// {{ }} is used for text interpolation.

// Template syntax binds JavaScript data and expressions to HTML.

// Variables, objects, arrays, and functions can be accessed inside the template.

// Only JavaScript expressions are allowed inside {{ }}.

// Statements like if, for, while, and variable declarations cannot be used inside {{ }}.
</script>

<template>
    <h1>{{ name }}</h1>

    <h2>First Name: {{ getName()[0] }} {{ ", " }} Second Name: {{ getName()[1] }}</h2>

    <p>{{ age >= 18 ? "Adult" : "Teen" }}</p>

    <!-- Text Interpolation -->
    <h3>{{ "Hello Vue" }}</h3>

    <!-- JavaScript Expressions -->
    <h3>{{ 10 + 20 }}</h3>

    <!-- Object Properties -->
    <h3>{{ obj.city }}</h3>
    <h3>{{ obj.country }}</h3>

    <!-- Array Elements -->
    <h3>{{ numbers[0] }}</h3>
    <h3>{{ numbers[2] }}</h3>

    <!-- String Methods -->
    <h3>{{ name.toUpperCase() }}</h3>

    <!-- Function Call -->
    <h3>{{ getName() }}</h3>

    <Button />
</template>

<style scoped>
h1 {
    color: rgb(217, 255, 0);
}

h2 {
    color: rgb(0, 100, 200);
}

p {
    color: skyblue;
}

h3 {
    color: orange;
}
</style>