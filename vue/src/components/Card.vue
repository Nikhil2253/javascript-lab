<script setup>
const props = defineProps({
  id: Number,
  name: String,
  age: Number,
  isActive: Boolean,
});

const emit = defineEmits([
  "delete-user",
  "send-message",
]);

const deleteUser = () => {
  emit("delete-user", props.id);
};

const sendMessage = () => {
  emit("send-message", props.name);
};

// defineEmits() declares the custom events emitted by the component.

// emit() sends an event from the child component to the parent component.

// A child component cannot modify parent data directly.

// Props send data from Parent → Child.

// emit sends events from Child → Parent.
</script>

<template>
  <div class="card">
    <div class="avatar">
      {{ props.name.charAt(0).toUpperCase() }}
    </div>

    <h2>{{ props.name }}</h2>

    <p>Age : {{ props.age }}</p>

    <p :class="props.isActive ? 'active' : 'inactive'">
      {{ props.isActive ? "Active" : "Inactive" }}
    </p>

    <button @click="sendMessage">
      Send Message
    </button>

    <button @click="deleteUser">
      Delete
    </button>
  </div>
</template>

<style scoped>
.card {
  width: 320px;
  background: white;
  padding: 25px;
  border-radius: 15px;
  text-align: center;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: royalblue;
  color: white;
  font-size: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
}

.active {
  color: green;
  font-weight: bold;
}

.inactive {
  color: red;
  font-weight: bold;
}

button {
  margin: 10px 5px;
  padding: 10px 18px;
  cursor: pointer;
}
</style>