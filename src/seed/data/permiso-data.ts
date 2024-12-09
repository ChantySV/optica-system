interface SeedPermiso {
  id_permiso: string;
  nombre_opcion: string;
  ruta_opcion: string;
  activo: boolean;
}

export const seedPermisos: SeedPermiso[] = [
  {
    id_permiso: '8d03bfb0-d0c7-4e67-8a77-b6204e44c9c1',
    nombre_opcion: 'Ver usuarios',
    ruta_opcion: '/usuarios',
    activo: true,
  },
  {
    id_permiso: 'c1b0cfb1-43a7-4f1c-9c2f-8d3e68d8f58a',
    nombre_opcion: 'Gestionar roles',
    ruta_opcion: '/roles',
    activo: true,
  },
  {
    id_permiso: '46e30b4a-abe3-4b1f-8024-846b8ec7e242',
    nombre_opcion: 'Ver permisos',
    ruta_opcion: '/permisos',
    activo: true,
  },
];
