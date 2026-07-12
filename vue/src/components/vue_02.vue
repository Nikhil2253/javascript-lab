<script setup>
const image = "https://picsum.photos/200";

const website = "https://google.com";

const width = 200;
const height = 200;

const heading = "Image";

const isDisabled = false;

const isActive = true;

const textColor = "blue";

// v-bind dynamically binds JavaScript values to HTML attributes.

// : is the shorthand syntax for v-bind.

// v-bind can bind src, href, class, style, disabled, id, value, and other HTML attributes.

// Without v-bind, the attribute is treated as a plain string.

// v-bind evaluates JavaScript expressions.
</script>

<template>

    <h1>{{ heading }}</h1>

    <!-- Static Attribute -->
    <img src="https://picsum.photos/150"  :width="200" :height="100">

    <br><br>

    <!-- Dynamic src -->
    <img :src="image" >

    <br><br>

    <!-- Multiple Dynamic Attributes -->
    <img
        :src="image"
        :width="width"
        :height="height"
    >

    <br><br>

    <!-- Dynamic href -->
    <a :href="website" target="_blank">
        Google
    </a>

    <br><br>

    <!-- Dynamic Class -->
    <h2 :class="isActive ? 'active' : 'inactive'">
        Active
    </h2>

    <!-- Multiple Classes -->
    <h2 :class="['title', isActive ? 'active' : '']">
        Example
    </h2>

    <br>

    <!-- Dynamic Style -->
    <h2 :style="{ color: textColor }">
        Blue Text
    </h2>

    <!-- Inline Style -->
    <h2 :style="{ color: 'red', fontSize: '30px' }">
        Red Text
    </h2>

    <br>

    <!-- Boolean Attribute -->
    <button :disabled="isDisabled">
        Submit
    </button>

</template>

<style scoped>
.active {
    color: green;
}

.inactive {
    color: red;
}

.title {
    text-decoration: underline;
}

button {
    margin-top: 20px;
}
</style>