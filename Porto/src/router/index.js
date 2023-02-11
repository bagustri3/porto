import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ""
    },
    {
      path: '/about',
      name: 'about',
      component: ""
    },
    {
      path: '/skill',
      name: 'home',
      component: ""
    },
    {
      path: '/experience',
      name: 'experience',
      component: ""
    },
    {
      path: '/project',
      name: 'project',
      component: ""
    },
  ]
})

export default router
