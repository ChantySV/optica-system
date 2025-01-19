interface SeedPersonal {
  id_personal?: string; // UUID del personal
  nombres: string;
  apellido_paterno: string;
  apellido_materno?: string;
  email?: string;
  telefono: number;
  tipo_persona: string;
  activo: boolean;
}

export const seedPersonal: SeedPersonal[] = [
  {
    id_personal: 'd2c0a7b5-8a8c-482e-a6d7-3b6f5435c97e', 
    nombres: 'John',
    apellido_paterno: 'Admin',
    email: 'john.doe@example.com',
    telefono: 123456789,
    tipo_persona: 'juridica',
    activo: true,
  },
  {
    id_personal: 'f3b5c6d7-4a7c-4e8f-b9e2-1c5d7f9b3e6a', 
    nombres: 'Jane',
    apellido_paterno: 'Productos',
    email: 'jane.smith@example.com',
    telefono: 987654321,
    tipo_persona: 'juridica',
    activo: true,
  },
  {    
    id_personal: 'f3b5c6d7-4a7c-4e8f-b9e2-1c5d7f9f4e6a', 
    nombres: 'Bulbasaur',
    apellido_paterno: 'Ventas',
    email: 'Verde@example.com',
    telefono: 123459876,
    tipo_persona: 'juridica',
    activo: true,
  },
  {    
    id_personal: '7d405d21-d519-44f7-801c-0f88d9d158bd', 
    nombres: 'Squirtle',
    apellido_paterno: 'Trabajos',
    email: 'Squirtle@example.com',
    telefono: 123456987,
    tipo_persona: 'juridica',
    activo: true,
  },
  {   
    nombres: 'Mary',
    apellido_paterno: 'jane',
    email: 'mary.jane@example.com',
    telefono: 987651234,
    tipo_persona: 'natural',
    activo: true,
  },
  {   
    nombres: 'Jane',
    apellido_paterno: 'jane',
    email: 'mary@example.com',
    telefono: 987654123,
    tipo_persona: 'natural',
    activo: true,
  },
  {   
    nombres: 'Rels',
    apellido_paterno: 'Flakko',
    email: 'Flakk@example.com',
    telefono: 987654312,
    tipo_persona: 'natural',
    activo: true,
  },
];
