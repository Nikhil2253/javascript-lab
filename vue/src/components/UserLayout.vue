<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <h2>User Dashboard (id: {{ route.params.id }})</h2>

  <nav>
    <RouterLink :to="{ name: 'user-profile-nested', params: { id: route.params.id } }">Profile</RouterLink>
    <RouterLink :to="{ name: 'user-posts', params: { id: route.params.id } }">Posts</RouterLink>
  </nav>

  <!-- child route renders here, nested inside this layout -->
  <RouterView />
</template>