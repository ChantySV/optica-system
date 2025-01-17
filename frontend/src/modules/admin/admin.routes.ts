export default [
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/modules/admin/Views/AdminView.vue'),
    meta: { requiresAuth: true, role: 'admin' },
  },
];
