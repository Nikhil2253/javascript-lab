<script setup>
import { ref } from "vue";

const isLoggedIn = ref(true);

const marks = ref(82);

const isVisible = ref(true);

const fruits = [
    "Apple",
    "Banana",
    "Orange",
    "Mango"
];

const products = [
    {
        id: 1,
        name: "Laptop",
        price: 50000
    },
    {
        id: 2,
        name: "Phone",
        price: 25000
    },
    {
        id: 3,
        name: "Keyboard",
        price: 2000
    }
];

const obj = {
    name: "Nikhil",
    age: 20,
    city: "Delhi"
};

const numbers = [1, 2, 3, 4, 5];

const toggleLogin = () => {
    isLoggedIn.value = !isLoggedIn.value;
};

const toggleVisibility = () => {
    isVisible.value = !isVisible.value;
};

// v-if conditionally renders an element.

// v-else runs when v-if is false.

// v-else-if checks another condition.

// v-show hides an element using CSS display:none.

// v-for renders elements by iterating over arrays, objects, and numbers.

// Always provide a unique key when rendering lists.
</script>

<template>

    <button @click="toggleLogin">
        Toggle Login
    </button>

    <br><br>

    <p v-if="isLoggedIn">
        Welcome
    </p>

    <p v-else>
        Please Login
    </p>

    <hr>

    <p v-if="marks >= 90">
        Grade A
    </p>

    <p v-else-if="marks >= 75">
        Grade B
    </p>

    <p v-else-if="marks >= 50">
        Grade C
    </p>

    <p v-else>
        Fail
    </p>

    <hr>

    <button @click="toggleVisibility">
        Toggle Visibility
    </button>

    <br><br>

    <h2 v-show="isVisible">
        Visible using v-show
    </h2>

    <hr>

    <h2>Array</h2>

    <ul>
        <li
            v-for="(fruit, index) in fruits"
            :key="index"
        >
            {{ index }} - {{ fruit }}
        </li>
    </ul>

    <hr>

    <h2>Array of Objects</h2>

    <div
        v-for="product in products"
        :key="product.id"
    >
        <p>{{ product.name }} - ₹{{ product.price }}</p>
    </div>

    <hr>

    <h2>Object</h2>

    <p
        v-for="(value, key) in obj"
        :key="key"
    >
        {{ key }} : {{ value }}
    </p>

    <hr>

    <h2>Number Loop</h2>

    <p
        v-for="number in 5"
        :key="number"
    >
        {{ number }}
    </p>

    <hr>

    <h2>v-for with v-if</h2>

    <p
        v-for="number in numbers"
        :key="number"
        v-if="number % 2 === 0"
    >
        {{ number }}
    </p>

</template>