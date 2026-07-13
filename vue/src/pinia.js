import { createApp } from 'vue'
import './style.css'
import Vue_16 from './components/vue_16.vue'
import { createPinia } from 'pinia'

const pinia = createPinia();

createApp(Vue_16).use(pinia).mount('#app')
