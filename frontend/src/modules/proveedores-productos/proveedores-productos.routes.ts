export default [
  {
    path: '/productos',
    name: 'productos',
    component: () => import('@/modules/proveedores-productos/views/ProveedoresProductosView.vue'),
    meta: { requiresAuth: true, role: 'encargado-productos' },
  },
];
