<script setup>
import { ref, provide } from "vue";
import Child from "./Child.vue";
import { USER_KEY } from "./keys.js";

// ==============================
// Topic 1 - provide()
// ==============================
// What: provide(key, value) lets an ANCESTOR send data down to
// ANY descendant component, no matter how deeply nested.
// Why: it solves PROP DRILLING - normally data must be passed as
// a prop through every single component in between, even ones
// that don't use it themselves. provide/inject skips straight
// from ancestor to the descendant that actually needs the value.
// When: use for data many descendants need - theme, current user,
// locale, app config, feature flags.
// React comparison: <MyContext.Provider value={...}>
const username = ref("Nikhil Saxena");
const theme = ref("dark");
const company = "Acme Corp"; // plain values can be provided too

provide("username", username);
provide("theme", theme);
provide("company", company);

// ==============================
// Topic 3 - Reactive provide()
// ==============================
// What: providing a ref() keeps it fully reactive on the inject side.
// Why: Vue provides the ref OBJECT itself, not a snapshot of its
// value, so when Parent changes counter.value, every descendant
// that injected it re-renders automatically.
// When: use for live state descendants need to react to, not just
// read once (counters, live settings, loading states).
const counter = ref(0);
provide("counter", counter);

const increaseCounter = () => {
    counter.value++;
};

// ==============================
// Topic 4 - Symbol Keys
// ==============================
// What: providing under a Symbol key instead of a string key.
// Why: string keys ("user") can collide if two unrelated features
// in a large app provide the same string by accident. Symbols are
// guaranteed unique, so collisions become impossible.
// When: recommended for medium/large production Vue apps.
const user = ref({ name: "Ameera Iyer", role: "Admin" });
provide(USER_KEY, user);
</script>

<template>
<div class="box parent-box">
    <h2>Parent</h2>
    <p>Provides: username, theme, company, counter, user (Symbol key)</p>
    <button @click="increaseCounter">Increase Counter</button>
    <p>Counter (in Parent): {{ counter }}</p>
    <Child />
</div>
</template>

<style scoped>
.box {
    border: 2px solid #94a3b8;
    border-radius: 10px;
    padding: 16px;
    margin: 12px 0;
}
.parent-box {
    background: #eef2ff;
    border-color: #6366f1;
}
button {
    margin: 8px 0;
    padding: 6px 14px;
    border: none;
    border-radius: 6px;
    background: #6366f1;
    color: #ffffff;
    cursor: pointer;
    font-size: 14px;
}
button:hover {
    background: #4f46e5;
}
</style>