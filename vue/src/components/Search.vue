<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

// route.query reads values after "?" in the URL, e.g. ?name=Nikhil&page=2
</script>

<template>
  <h2>Search Results</h2>
  <p>name: {{ route.query.name }}</p>
  <p>page: {{ route.query.page }}</p>
</template>