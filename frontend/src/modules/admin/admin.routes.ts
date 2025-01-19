export default [
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/modules/admin/views/AdminView.vue'),
    meta: { requiresAuth: true, role: 'admin' },
  },
];
