<script setup>
import { storeToRefs } from 'pinia'
// 7. IMPORTING THE STORES
import { useUserStore } from '../stores/userStore'
import { useThemeStore } from '../stores/themeStore'
import { useCartStore } from '../stores/cartStore'

// INSTANTIATE HOOKS
const userStore = useUserStore()
const themeStore = useThemeStore()
const cartStore = useCartStore()

/*
⚠️ INTERVIEW FLASHPOINT (9. storeToRefs):
Destructuring primitive reactive references directly from an object instance breaks reactivity tracking!
We use `storeToRefs()` to build individual proxy mapping lines back to Pinia's database.
*/
const { name, age, isLoggedIn } = storeToRefs(userStore)
</script>

<template>
  <div class="pinia-tutorial-container">
    <header class="tutorial-header">
      <h1>🍍 Pinia Multi-File Masterclass</h1>
      <p>Clean Separation of UI and Global Application State</p>
    </header>

    <main class="demo-grid">
      <!-- 7. CONSUMING INDIVIDUAL STORE INSIDE VIEW -->
      <section class="demo-card user-card">
        <h2>👤 User Account Store</h2>
        <div class="profile-info">
          <p><strong>Status:</strong> 
            <span :class="['badge', isLoggedIn ? 'success' : 'danger']">
              {{ isLoggedIn ? 'Logged In' : 'Logged Out' }}
            </span>
          </p>
          <p><strong>User:</strong> {{ name }} (Age: {{ age }})</p>
          <p><strong>Full Name (Getter):</strong> {{ userStore.fullName }}</p>
          <p><strong>Is Adult?:</strong> {{ userStore.isAdult ? '✅ Yes' : '❌ No' }}</p>
        </div>

        <div class="actions-group">
          <button @click="userStore.login('Nikhil Saxena')" :disabled="isLoggedIn" class="btn primary">Log In</button>
          <button @click="userStore.incrementAge" :disabled="!isLoggedIn" class="btn secondary">Birthday (+1 Age)</button>
          <button @click="userStore.logout" :disabled="!isLoggedIn" class="btn danger">Log Out</button>
        </div>
      </section>

      <!-- 8. SEPARATE CONCURRENT STORES -->
      <section class="demo-card theme-cart-card" :style="{ backgroundColor: themeStore.isDarkMode ? '#1e1e24' : '#f4f4f9', color: themeStore.isDarkMode ? '#ffffff' : '#333333' }">
        <h2>🛒 & 🎨 Multiple Domain Stores</h2>
        <div class="multi-store-status">
          <p><strong>Active Theme:</strong> {{ themeStore.themeName }}</p>
          <p><strong>Items in Cart:</strong> <span class="cart-count">{{ cartStore.totalItems }}</span></p>
        </div>

        <div class="actions-group">
          <button @click="themeStore.toggleTheme" class="btn theme-btn">Toggle Theme</button>
          <button @click="cartStore.addItem" class="btn cart-btn">Add Item to Cart</button>
          <button @click="cartStore.resetCart" class="btn danger-outline">Reset Cart</button>
        </div>
      </section>
    </main>

    <!-- KNOWLEDGE & THEORY REMAINS READABLE -->
    <footer class="theory-section">
      <hr />
      <div class="summary-box">
        <h3>🧠 Why Split Into Separate Files? (Interview Edge)</h3>
        <p>
          Unlike Vuex which enforced a single monolithic nested tree configuration, Pinia inherently manages a flat structure of independent, decoupled modules. Splitting them enables <strong>optimal tree-shaking</strong> during modern bundle builds (Vite) and guarantees clean domain encapsulation across scaling production engines.
        </p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.pinia-tutorial-container {
  font-family: system-ui, -apple-system, sans-serif;
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #fafafa;
  border-radius: 16px;
}
.tutorial-header { text-align: center; margin-bottom: 3rem; }
.demo-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 2rem; }
.demo-card { background: #ffffff; border-radius: 12px; padding: 2rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); border: 1px solid #edf2f7; }
.badge { padding: 0.25rem 0.5rem; border-radius: 4px; font-weight: bold; font-size: 0.8rem; }
.badge.success { background-color: #c6f6d5; color: #22543d; }
.badge.danger { background-color: #fed7d7; color: #742a2a; }
.actions-group { display: flex; flex-direction: column; gap: 0.75rem; margin-top: 1.5rem; }
.btn { padding: 0.6rem 1rem; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; text-align: center; }
.btn:disabled { opacity: 0.5; cursor: not-allowed; }
.btn.primary { background-color: #4f46e5; color: white; }
.btn.secondary { background-color: #edf2f7; color: #4a5568; }
.btn.danger { background-color: #e53e3e; color: white; }
.btn.theme-btn { background-color: #ed8936; color: white; }
.btn.cart-btn { background-color: #319795; color: white; }
.btn.danger-outline { background: transparent; border: 1px solid #e53e3e; color: #e53e3e; }
.cart-count { font-weight: bold; background: #319795; color: white; padding: 2px 8px; border-radius: 20px; }
.summary-box { background-color: #ebf8ff; border-left: 4px solid #3182ce; padding: 1.5rem; border-radius: 0 8px 8px 0; margin-top: 2rem; }
</style>