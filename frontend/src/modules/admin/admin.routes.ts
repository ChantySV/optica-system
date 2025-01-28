export default [
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/modules/admin/views/AdminView.vue'),
    meta: { requiresAuth: true, role: 'admin' },
    children: [
      {
        path: 'personal',
        name: 'admin-personal',
        component: () => import('@/modules/admin/views/AdminViewPersonal.vue'),
        meta: { requiresAuth: true, role: 'admin' },
      },
      {
        path: 'usuarios',
        name: 'admin-usuarios',
        component: () => import('@/modules/admin/views/AdminViewUsuarios.vue'),
        meta: { requiresAuth: true, role: 'admin' },
      },
      {
        path: 'varios',
        name: 'admin-varios',
        component: () => import('@/modules/admin/views/AdminViewVarios.vue'),
        meta: { requiresAuth: true, role: 'admin' },
      },
      {
        path: 'pmp',
        name: 'admin-pmp',
        component: () => import('@/modules/admin/views/AdminViewPmp.vue'),
        meta: { requiresAuth: true, role: 'admin' },
      },
    ],
  },
];
