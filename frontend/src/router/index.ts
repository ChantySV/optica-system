import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '@/modules/auth/Views/LoginView.vue';
import adminRoutes from '@/modules/admin/admin.routes';
import ventasRoutes from '@/modules/ventas/venta.routes';
import trabajosRoutes from '@/modules/trabajos/trabajo.routes';
import productosRoutes from '@/modules/proveedores-productos/proveedores-productos.routes';
import { useAuthStore } from '@/modules/auth/stores/auth.store';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
    },
    ...adminRoutes,
    ...ventasRoutes,
    ...trabajosRoutes,
    ...productosRoutes,
  ],
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'login' });
  } else if (to.meta.role && authStore.user?.role !== to.meta.role) {
    next({ name: 'login' });
  } else {
    next();
  }
});


export default router;
