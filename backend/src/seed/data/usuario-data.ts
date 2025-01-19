interface SeedUsuario {
  nombre_usuario: string;
  contrasenha: string;
  activo: boolean;
  id_rol: string; 
  id_personal: string; 
}

export const seedUsuarios: SeedUsuario[] = [
  {
    nombre_usuario: 'admin',
    contrasenha: '123456San',
    activo: true,
    id_rol: 'f2870ba1-91c3-4d39-b15b-7b7e1d69f0db', 
    id_personal: 'd2c0a7b5-8a8c-482e-a6d7-3b6f5435c97e',
  },
  {
    nombre_usuario: 'productos',
    contrasenha: 'Password1',
    activo: true,
    id_rol: '3a7b142b-82bb-4043-8741-96c657d0d15f', 
    id_personal: 'f3b5c6d7-4a7c-4e8f-b9e2-1c5d7f9b3e6a', 
  },
  {
    nombre_usuario: 'ventas',
    contrasenha: 'Password1',
    activo: true,
    id_rol: 'a8c5929e-adde-47b7-900f-51851c4ce1de', 
    id_personal: 'f3b5c6d7-4a7c-4e8f-b9e2-1c5d7f9f4e6a', 
  },
  {
    nombre_usuario: 'trabajos',
    contrasenha: 'Password1',
    activo: true,
    id_rol: '8849b349-0298-4273-8678-151b9dfd5c86', 
    id_personal: '7d405d21-d519-44f7-801c-0f88d9d158bd', 
  },
];
