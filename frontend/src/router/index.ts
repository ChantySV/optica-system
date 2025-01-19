import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '@/modules/auth/views/LoginView.vue';
import adminRoutes from '@/modules/admin/admin.routes';
import ventasRoutes from '@/modules/ventas/venta.routes';
import trabajosRoutes from '@/modules/trabajos/trabajo.routes';
import productosRoutes from '@/modules/proveedores-productos/proveedores-productos.routes';
import { useAuthStore } from '@/modules/auth/stores/auth.store';
import ProveedoresProductosView from '@/modules/proveedores-productos/views/ProveedoresProductosView.vue';
import SideBar from '@/components/SideBar.vue';
import MainLayout from '@/Layouts/MainLayout.vue';

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
        ...productosRoutes,
      ],
    },
  ],
});

// router.beforeEach((to, from, next) => {
//   const authStore = useAuthStore();
//   // Revisa si la ruta requiere autenticación
//   if (to.meta.requiresAuth && !authStore.isAuthenticated) {
//     return next({ name: 'login' }); // Redirige al login si no está autenticado
//   }

//   // Revisa si hay una restricción de rol y si el usuario cumple con ella
//   if (to.meta.role && authStore.user?.role.nombre_rol !== to.meta.role) {
//     return next({ name: 'login' }); // Redirige o muestra un mensaje de no autorizado
//   }
//   next();
// });



export default router;
