<script setup>
import { useCounter } from "../composables/useCounter";


// ==============================
// Using a Composable
// ==============================

// Import the composable.

// Call it like a normal function.

// Destructure the returned values.

const {

    count,

    increment,

    decrement,

    reset

} = useCounter();


// A composable lets multiple components
// reuse the same logic without duplication.

// Similar to React Custom Hooks.

</script>

<template>

<h1>
    Vue Composables
</h1>

<hr>

<h2>
    Count : {{ count }}
</h2>

<button @click="increment">
    Increment
</button>

<button @click="decrement">
    Decrement
</button>

<button @click="reset">
    Reset
</button>

</template>

<style scoped>

button{

    margin:10px;

    padding:10px 18px;

    cursor:pointer;

}

</style>