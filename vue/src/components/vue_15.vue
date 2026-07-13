<script setup>
// App.vue — the root component, holds nav links and the RouterView placeholder
</script>

<template>
  <nav class="nav">
    <!-- RouterLink replaces <a>, no full page reload on click -->
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
    <RouterLink :to="{ name: 'user-profile', params: { id: 5 } }">User 5</RouterLink>
    <RouterLink to="/search?name=Nikhil&page=2">Search</RouterLink>
    <RouterLink to="/admin">Admin</RouterLink>
  </nav>

  <!-- Whatever component matches the current URL renders here -->
  <RouterView />
</template>

<style scoped>
.nav {
  display: flex;
  gap: 16px;
  padding: 16px;
  border-bottom: 1px solid #eee;
}
</style>