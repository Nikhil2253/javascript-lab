<script setup>
import { inject } from "vue";
import { USER_KEY } from "./keys.js";

// ==============================
// Topic 2 - inject()
// ==============================
// What: inject(key) reads a value provided by ANY ancestor,
// no matter how many components sit in between.
// Why: it lets a deeply nested component use data without every
// component in the chain having to receive and re-pass it as a prop.
// When: use it for values that many descendants need (theme, user,
// locale, config) instead of drilling props level by level.
// React comparison: same idea as useContext(MyContext).
const username = inject("username");
const theme = inject("theme");
const company = inject("company");

// inject(key, defaultValue) -> if no ancestor provided this key,
// the default value is returned instead of throwing an error.
// No ancestor here provides "country", so "India" is returned.
const country = inject("country", "India");

// ==============================
// Topic 3 - Reactive provide() (inject side)
// ==============================
// counter was provided as a ref(), so inject() returns that exact
// same reactive ref, not a copy. {{ counter }} in the template
// auto-unwraps it, and it updates live whenever Parent changes
// counter.value - no extra code needed on this side.
const counter = inject("counter");

// ==============================
// Topic 4 - Symbol Keys (inject side)
// ==============================
// Using the same Symbol imported from keys.js guarantees this
// inject() matches the exact provide() call from Parent, with
// zero chance of accidentally reading an unrelated "user" string key.
const user = inject(USER_KEY);
</script>

<template>
<div class="box grandchild-box">
    <h2>GrandChild</h2>
    <ul>
        <li>Username: {{ username }}</li>
        <li>Theme: {{ theme }}</li>
        <li>Company: {{ company }}</li>
        <li>Country (default, no provider): {{ country }}</li>
        <li>Counter (live, reactive): {{ counter }}</li>
        <li>User (Symbol key): {{ user.name }} - {{ user.role }}</li>
    </ul>
</div>
</template>

<style scoped>
.box {
    border: 2px solid #94a3b8;
    border-radius: 10px;
    padding: 16px;
    margin: 12px 0 12px 24px;
}
.grandchild-box {
    background: #fff7ed;
    border-color: #f97316;
}
ul {
    padding-left: 18px;
    margin: 8px 0 0 0;
}
li {
    margin-bottom: 4px;
}
</style>