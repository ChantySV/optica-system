export default [
  {
    path: '/productos',
    name: 'productos',
    component: () => import('@/modules/productos/views/ProductosView.vue'),
    meta: { requiresAuth: true, role: 'encargado-productos' },
  },
];
