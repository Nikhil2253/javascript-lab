<script setup>
import GrandChild from "./GrandChild.vue";

// ==============================
// Prop Drilling - Solved
// ==============================
// What: this component does not import ref/provide/inject at all.
// It has no idea username/theme/company/counter/user even exist.
// Why: without provide/inject, Parent would have to pass all of
// these down as props through Child just so GrandChild could use
// them - that's called PROP DRILLING, passing data through
// components that don't actually need it themselves.
// When: provide/inject removes this middle-man requirement for
// any depth of nesting.
</script>

<template>
<div class="box child-box">
    <h2>Child</h2>
    <p>Passes nothing down manually - GrandChild injects directly from Parent.</p>
    <GrandChild />
</div>
</template>

<style scoped>
.box {
    border: 2px solid #94a3b8;
    border-radius: 10px;
    padding: 16px;
    margin: 12px 0 12px 24px;
}
.child-box {
    background: #f0fdf4;
    border-color: #22c55e;
}
</style>