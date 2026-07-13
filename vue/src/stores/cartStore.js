import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCartStore = defineStore('cartStore', () => {
  const totalItems = ref(0)
  
  function addItem() {
    totalItems.value++
  }
  
  function resetCart() {
    totalItems.value = 0
  }
  
  return { totalItems, addItem, resetCart }
})