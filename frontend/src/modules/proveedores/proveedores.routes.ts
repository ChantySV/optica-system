import ProveedoresProductosView from "./views/ProveedoresView.vue";

export default [
  {
    path: '/proveedores',
    name: 'proveedoresProductos',
    component: ProveedoresProductosView,
    meta: { requiresAuth: true, role: 'encargado-productos' },
  },
];
