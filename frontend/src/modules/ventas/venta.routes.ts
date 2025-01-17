export default [
  {
    path: '/ventas',
    name: 'ventas',
    component: () => import('@/modules/ventas/Views/VentasView.vue'),
    meta: { requiresAuth: true, role: 'encargado-ventas' },
  },
];
