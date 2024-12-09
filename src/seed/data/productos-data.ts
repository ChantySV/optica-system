interface SeedProducto {
  id_producto: string;
  nombre: string;
  stock: number;
  precio_compra: number;
  precio_venta: number;
  activo: boolean;
  id_proveedor: string,
}

export const seedProductos: SeedProducto[] = [
  {
    id_producto: '1f7d3f26-dadc-4f23-8c58-fb0e85b5a7bc',
    nombre: 'Producto A',
    stock: 100,
    precio_compra: 10.5,
    precio_venta: 15.0,
    activo: true,
    id_proveedor: '3a2f7d26-dadc-4f23-8c58-fb0e85b5a7bd',
  },
  {
    id_producto: '2b8e3d54-ef09-44eb-9d67-51f635d12d0a',
    nombre: 'Producto B',
    stock: 200,
    precio_compra: 20.0,
    precio_venta: 25.0,
    activo: true,
    id_proveedor: '4b8e3d54-ef09-44eb-9d67-51f635d12d0b',
  },
];
