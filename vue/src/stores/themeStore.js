import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useThemeStore = defineStore('themeStore', () => {
  const isDarkMode = ref(false)
  const themeName = computed(() => isDarkMode.value ? 'Deep Dark' : 'Clean Light')
  
  function toggleTheme() {
    isDarkMode.value = !isDarkMode.value
  }
  
  return { isDarkMode, themeName, toggleTheme }
})