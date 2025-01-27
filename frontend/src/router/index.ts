import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '@/modules/auth/views/LoginView.vue';
import adminRoutes from '@/modules/admin/admin.routes';
import ventasRoutes from '@/modules/ventas/venta.routes';
import trabajosRoutes from '@/modules/trabajos/trabajo.routes';
import proveedoresRoutes from '@/modules/proveedores/proveedores.routes';
import { useAuthStore } from '@/modules/auth/stores/auth.store';
import MainLayout from '@/Layouts/MainLayout.vue';
import productosRoutes from '@/modules/productos/productos.routes';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/dashboard',
      component: MainLayout,
      meta: { requiresAuth: true },
      children: [
        ...adminRoutes,
        ...ventasRoutes,
        ...trabajosRoutes,
        ...proveedoresRoutes,
        ...productosRoutes,
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  // Verificar si la ruta requiere autenticación
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return next({ name: 'login' });
  }

  // Verificar rol
  if (to.meta.role) {
    const userRole = authStore.user?.role.nombre_rol;

    // Admin puede acceder a todas las rutas
    if (userRole === 'admin') {
      return next();
    }

    // Restringir acceso según el rol
    if (userRole !== to.meta.role) {
      return next({ name: 'login' });
    }
  }

  next();
});

export default router;
