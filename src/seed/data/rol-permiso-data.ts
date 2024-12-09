interface SeedRolePermiso {
    id_rolPermiso: string;
    id_rol: string;
    id_permiso: string;
  }
  
  export const seedRolesPermisos: SeedRolePermiso[] = [
    // Permisos para el rol "Admin"
    {
      id_rolPermiso: 'a413e4c5-402e-4a54-8bd6-2db6d60c4581',
      id_rol: 'f2870ba1-91c3-4d39-b15b-7b7e1d69f0db', // Admin
      id_permiso: '8d03bfb0-d0c7-4e67-8a77-b6204e44c9c1', // Ver usuarios
    },
    {
      id_rolPermiso: 'ec6f3c7f-1d68-479f-a5bc-9b309b6e2587',
      id_rol: 'f2870ba1-91c3-4d39-b15b-7b7e1d69f0db', // Admin
      id_permiso: 'c1b0cfb1-43a7-4f1c-9c2f-8d3e68d8f58a', // Gestionar roles
    },
    {
      id_rolPermiso: '394cb252-705d-495b-8417-b86249c46791',
      id_rol: 'f2870ba1-91c3-4d39-b15b-7b7e1d69f0db', // Admin
      id_permiso: '46e30b4a-abe3-4b1f-8024-846b8ec7e242', // Ver permisos
    },
    // Permisos para el rol "Usuario"
    {
      id_rolPermiso: 'd6dbb165-6167-4d90-b78f-7c5b5cc9e07a',
      id_rol: '3a7b142b-82bb-4043-8741-96c657d0d15f', // Usuario
      id_permiso: '8d03bfb0-d0c7-4e67-8a77-b6204e44c9c1', // Ver usuarios
    },
  ];
  