import ProveedoresProductosView from "./views/ProveedoresProductosView.vue";

export default [
  {
    path: '/proveedores-productos',
    name: 'proveedoresProductos',
    component: ProveedoresProductosView,
    meta: { requiresAuth: true, role: 'encargado-productos' },
  },
];
