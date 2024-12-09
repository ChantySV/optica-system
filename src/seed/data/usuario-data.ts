interface SeedUsuario {
  nombre_usuario: string;
  contrasenha: string;
  activo: boolean;
  id_rol: string; // UUID de roles
  id_personal: string; // UUID de personal
}

export const seedUsuarios: SeedUsuario[] = [
  {
    nombre_usuario: 'admin',
    contrasenha: '123456',
    activo: true,
    id_rol: 'f2870ba1-91c3-4d39-b15b-7b7e1d69f0db', // UUID del rol "Admin"
    id_personal: 'd2c0a7b5-8a8c-482e-a6d7-3b6f5435c97e', // UUID de personal relacionado
  },
  {
    nombre_usuario: 'jane',
    contrasenha: 'password',
    activo: true,
    id_rol: '3a7b142b-82bb-4043-8741-96c657d0d15f', // UUID del rol "User"
    id_personal: 'f3b5c6d7-4a7c-4e8f-b9e2-1c5d7f9b3e6a', // UUID de personal relacionado
  },
];
