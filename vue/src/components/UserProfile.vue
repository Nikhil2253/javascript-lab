<script setup>
import { useRoute } from 'vue-router'

// useRoute() reads info about the CURRENT route — read-only
const route = useRoute()

// route.params.id comes from the ":id" dynamic segment in the path
// note: always a string, even if it looks numeric
</script>

<template>
  <h2>User Profile</h2>
  <p>Viewing user with id: {{ route.params.id }}</p>
</template>