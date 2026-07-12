<script setup>
import Card from "./Card.vue";

const users = [
  {
    id: 1,
    name: "Nikhil",
    age: 21,
    isActive: true,
  },
  {
    id: 2,
    name: "Rahul",
    age: 20,
    isActive: false,
  },
  {
    id: 3,
    name: "Priya",
    age: 22,
    isActive: true,
  },
];

const handleDelete = (id) => {
  console.log("Delete User:", id);
};

const handleMessage = (name) => {
  console.log(`Hello ${name}`);
};

// Props send data from the parent to the child.

// Custom events (emit) send data from the child to the parent.
</script>

<template>
  <div class="container">
    <Card
      v-for="user in users"
      :key="user.id"
      :id="user.id"
      :name="user.name"
      :age="user.age"
      :isActive="user.isActive"
      @delete-user="handleDelete"
      @send-message="handleMessage"
    />
  </div>
</template>

<style scoped>
.container {
  min-height: 100vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 25px;
  padding: 40px;
  background: #0f172a;
}
</style>