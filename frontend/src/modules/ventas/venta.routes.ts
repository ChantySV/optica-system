export default [
  {
    path: '/ventas',
    name: 'ventas',
    component: () => import('@/modules/ventas/views/VentasView.vue'),
    meta: { requiresAuth: true, role: 'encargado-ventas' },
  },
];
