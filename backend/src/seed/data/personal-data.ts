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
    apellido_paterno: 'Doe',
    email: 'john.doe@example.com',
    telefono: 123456789,
    tipo_persona: 'juridica',
    activo: true,
  },
  {
    id_personal: 'f3b5c6d7-4a7c-4e8f-b9e2-1c5d7f9b3e6a', 
    nombres: 'Jane',
    apellido_paterno: 'Smith',
    email: 'jane.smith@example.com',
    telefono: 987654321,
    tipo_persona: 'natural',
    activo: true,
  },
  {    
    nombres: 'Bulbasaur',
    apellido_paterno: 'Verde',
    email: 'Verde@example.com',
    telefono: 123459876,
    tipo_persona: 'juridica',
    activo: true,
  },
  {    
    nombres: 'Squirtle',
    apellido_paterno: 'azul',
    email: 'Squirtle@example.com',
    telefono: 123456987,
    tipo_persona: 'natural',
    activo: true,
  },
  {   
    nombres: 'Mary',
    apellido_paterno: 'jane',
    email: 'mary.jane@example.com',
    telefono: 123456798,
    tipo_persona: 'natural',
    activo: true,
  },
];
