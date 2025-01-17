export default [
  {
    path: '/trabajos',
    name: 'trabajos',
    component: () => import('@/modules/trabajos/views/TrabajoView.vue'),
    meta: { requiresAuth: true, role: 'encargado-trabajos' },
  },
];
