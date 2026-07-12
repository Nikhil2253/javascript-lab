<script setup>
import { ref } from "vue";

const name = ref("");
const age = ref(null);
const city = ref("");
const isChecked = ref(false);

const submit = () => {
    console.log("Name:", name.value);
    console.log("Age:", age.value);
    console.log("City:", city.value);
    console.log("Accepted:", isChecked.value);
};

const clear = () => {
    name.value = "";
    age.value = null;
    city.value = "";
    isChecked.value = false;
};

const inputChange = (event) => {
    console.log(event.target.value);
};

const keyPressed = (event) => {
    console.log(event.key);
};

// v-model creates two-way data binding.

// v-on listens for DOM events.

// @ is the shorthand syntax for v-on.

// ref() creates reactive values.
</script>

<template>

    <h2>Registration Form</h2>

    <input
        v-model="name"
        @input="inputChange"
        placeholder="Enter Name"
    >

    <br><br>

    <input
        type="number"
        v-model.number="age"
        @keydown="keyPressed"
        placeholder="Enter Age"
    >

    <br><br>

    <select v-model="city">

        <option value="">Select City</option>

        <option>Delhi</option>

        <option>Moscow</option>

        <option>Bangalore</option>

    </select>

    <br><br>

    <label>
        <input
            type="checkbox"
            v-model="isChecked"
        >
        Accept Terms
    </label>

    <br><br>

    <button @click="submit">
        Submit
    </button>

    <button @click="clear">
        Clear
    </button>

    <hr>

    <h3>Name : {{ name }}</h3>

    <h3>Age : {{ age }}</h3>

    <h3>City : {{ city }}</h3>

    <h3>Accepted : {{ isChecked }}</h3>

</template>

<style scoped>

input,
select{
    display:block;
    padding:8px;
    width:220px;
}

button{
    margin-right:10px;
    padding:8px 15px;
}

</style>