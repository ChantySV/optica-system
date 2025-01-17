import { authRoutes } from '@/modules/auth/routes'
import LoginView from '@/modules/auth/Views/LoginView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
    },

    //Auth Routes
    authRoutes,
  ],
})

export default router
