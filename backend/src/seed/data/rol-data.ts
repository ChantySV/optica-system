interface SeedRole {
  id_rol: string;
  nombre_rol: string;
  activo: boolean;
}

export const seedRoles: SeedRole[] = [
  {
    id_rol: 'f2870ba1-91c3-4d39-b15b-7b7e1d69f0db',
    nombre_rol: 'admin',
    activo: true,
  },
  {
    id_rol: '3a7b142b-82bb-4043-8741-96c657d0d15f',
    nombre_rol: 'encargado-productos',
    activo: true,
  },
  {
    id_rol: 'a8c5929e-adde-47b7-900f-51851c4ce1de',
    nombre_rol: 'encargado-ventas',
    activo: true,
  },
  {
    id_rol: '8849b349-0298-4273-8678-151b9dfd5c86',
    nombre_rol: 'encargado-trabajos',
    activo: true,
  },
];
