<script setup>
import { useRouter } from 'vue-router'

// useRouter() gives the router instance for programmatic navigation
const router = useRouter()

function goHome() {
  router.push('/') // adds a new history entry, back button works
}

function replaceWithAbout() {
  router.push('/user/95') // swaps current entry, no back button to previous page
}
</script>

<template>
  <h2>About</h2>
  <button @click="goHome">router.push('/')</button>
  <button @click="replaceWithAbout">router.replace('/about')</button>
  <button @click="router.back()">router.back()</button>
  <button @click="router.forward()">router.forward()</button>
</template>