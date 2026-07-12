<script setup>
import { reactive } from "vue";

// ==============================
// Scoped Slot
// ==============================
// The CHILD owns this data (user object). The parent has
// no direct access to it. The child exposes the data OUT
// through slot props: <slot :name="..." :age="..." :city="..." />
// The parent then decides HOW to display it, using:
// <template #default="{ name, age, city }">
// This is useful for list/table/data components where the
// child fetches or owns data but the parent controls rendering.
const user = reactive({
    name: "Ameera Kote",
    age: 27,
    city: "Pune"
});
</script>

<template>
<div class="user-card">
    <slot
        :name="user.name"
        :age="user.age"
        :city="user.city"
    >
        <p>{{ user.name }}</p>
    </slot>
</div>
</template>

<style scoped>
.user-card {
    border: 1px solid #d0d7de;
    border-radius: 8px;
    padding: 16px;
    margin: 12px 0;
    background: #f9fbff;
}
</style>