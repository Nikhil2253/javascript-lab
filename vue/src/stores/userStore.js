import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// 3. CREATING THE STORE
// 'userStore' is the unique ID mandatory for Vue DevTools tracking.
export const useUserStore = defineStore('userStore', () => {
  
  // 4. STATE (Reactive global values)
  const name = ref('Guest User')
  const age = ref(0)
  const isLoggedIn = ref(false)

  // 5. GETTERS (Cached derivations, acts like computed properties)
  const fullName = computed(() => `${name.value} Account`)
  const isAdult = computed(() => age.value >= 18)

  // 6. ACTIONS (Methods handling business logic and sync/async state modifications)
  function login(username) {
    name.value = username
    age.value = 21 
    isLoggedIn.value = true
  }

  function logout() {
    name.value = 'Guest User'
    age.value = 0
    isLoggedIn.value = false
  }

  function incrementAge() {
    if (isLoggedIn.value) age.value++
  }

  return { 
    name, age, isLoggedIn, 
    fullName, isAdult, 
    login, logout, incrementAge 
  }
})