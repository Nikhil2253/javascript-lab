<script setup>
import { reactive, ref, toRefs } from "vue";

// Counter
const count = ref(0);

const increment = () => count.value++;
const decrement = () => count.value--;
const reset = () => (count.value = 0);

// Form
const user = reactive({
  name: "",
  age: "",
  is_active: false,
});

// Convert reactive properties to refs
const { name, age, is_active } = toRefs(user);

// Users List
const users = ref([]);

const submit = () => {
  if (!name.value || !age.value) return;

  users.value.push({
    name: name.value,
    age: age.value,
    is_active: is_active.value,
  });

  // Reset form
  name.value = "";
  age.value = "";
  is_active.value = false;
};
</script>

<template>
  <div class="container">

    <!-- Counter -->
    <div class="card">
      <h2>Counter</h2>

      <div class="count">{{ count }}</div>

      <div class="buttons">
        <button class="btn green" @click="increment">+</button>
        <button class="btn yellow" @click="reset">Reset</button>
        <button class="btn red" @click="decrement">−</button>
      </div>
    </div>

    <!-- User Form -->
    <div class="card">
      <h2>Add User</h2>

      <input
        type="text"
        placeholder="Name"
        v-model="name"
      />

      <input
        type="number"
        placeholder="Age"
        v-model="age"
      />

      <label>
        <input
          type="checkbox"
          v-model="is_active"
        />
        Active
      </label>

      <button class="btn blue" @click="submit">
        Add User
      </button>
    </div>

    <!-- Users -->
    <div class="card">
      <h2>Users</h2>

      <div
        class="user"
        v-for="(u, index) in users"
        :key="index"
      >
        <h3>{{ u.name }}</h3>
        <p>Age: {{ u.age }}</p>
        <p>
          Status:
          <span :class="u.is_active ? 'active' : 'inactive'">
            {{ u.is_active ? "Active" : "Inactive" }}
          </span>
        </p>
      </div>
    </div>

  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial;
}

.container {
  min-height: 100vh;
  background: #1e3c72;
  display: flex;
  gap: 30px;
  justify-content: center;
  align-items: flex-start;
  padding: 50px;
  flex-wrap: wrap;
}

.card {
  width: 320px;
  background: white;
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 10px 20px rgba(0,0,0,.2);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.count {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: #2563eb;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  font-size: 40px;
  font-weight: bold;
}

.buttons {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}

.btn {
  border: none;
  padding: 10px 18px;
  border-radius: 8px;
  cursor: pointer;
  color: white;
  font-weight: bold;
}

.green {
  background: #22c55e;
}

.red {
  background: #ef4444;
}

.yellow {
  background: #f59e0b;
}

.blue {
  background: #2563eb;
  width: 100%;
  margin-top: 15px;
}

input[type="text"],
input[type="number"] {
  width: 100%;
  padding: 10px;
  margin-bottom: 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
}

label {
  display: flex;
  gap: 8px;
  margin-bottom: 15px;
}

.user {
  border: 1px solid #ddd;
  padding: 12px;
  border-radius: 10px;
  margin-bottom: 12px;
}

.active {
  color: green;
  font-weight: bold;
}

.inactive {
  color: red;
  font-weight: bold;
}
</style>