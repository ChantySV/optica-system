interface SeedProveedor {
  id_proveedor: string;
  nombre: string;
  numero?: string;
  direccion_web: string;
  activo: boolean;
}

export const seedProveedores: SeedProveedor[] = [
  {
    id_proveedor: '3a2f7d26-dadc-4f23-8c58-fb0e85b5a7bd',
    nombre: 'Proveedor A',
    numero: '123456789',
    direccion_web: 'https://proveedora.com',
    activo: true,
  },
  {
    id_proveedor: '4b8e3d54-ef09-44eb-9d67-51f635d12d0b',
    nombre: 'Proveedor B',
    direccion_web: 'https://proveedorb.com',
    activo: true,
  },
];
