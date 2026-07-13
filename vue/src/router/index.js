// router/index.js — where all routes are defined and the router instance is created

import { createRouter, createWebHistory } from 'vue-router'

// Lazy-loaded views — each becomes its own JS chunk, loaded only when visited
const Home = () => import('../components/Home.vue')
const About = () => import('../components/About.vue')
const UserProfile = () => import('../components/UserProfile.vue')
const Search = () => import('../components/Search.vue')
const Login = () => import('../components/Login.vue')
const Admin = () => import('../components/Admin.vue')
const UserLayout = () => import('../components/UserLayout.vue')
const Profile = () => import('../components/Profile.vue')
const Posts = () => import('../components/Posts.vue')

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/about', name: 'about', component: About },

  // Dynamic segment ":id" — matches /users/1, /users/42, etc.
  { path: '/users/:id', name: 'user-profile', component: UserProfile },

  // Query params (?name=&page=) are read at runtime, not declared in the path
  { path: '/search', name: 'search', component: Search },

  { path: '/login', name: 'login', component: Login },

  // Per-route guard — runs only when navigating to this route
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
    beforeEnter: (to, from, next) => {
      const isAdmin = false // replace with real auth check
      isAdmin ? next() : next('/')
    },
  },

  // Nested routes — UserLayout renders its own <RouterView /> for children
  {
    path: '/user/:id',
    component: UserLayout,
    children: [
      { path: 'profile', name: 'user-profile-nested', component: Profile },
      { path: 'posts', name: 'user-posts', component: Posts },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(), // clean URLs like /about (needs server fallback config)
  routes,
})

// Global guard — runs before every navigation, good place for auth checks
router.beforeEach((to, from, next) => {
  const isLoggedIn = true // replace with real auth check
  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login')
  } else {
    next()
  }
})

export default router