interface SeedPersonal {
  id_personal: string; // UUID del personal
  nombres: string;
  apellido_paterno: string;
  apellido_materno?: string;
  email?: string;
  telefono: number;
  activo: boolean;
}

export const seedPersonal: SeedPersonal[] = [
  {
    id_personal: 'd2c0a7b5-8a8c-482e-a6d7-3b6f5435c97e', 
    nombres: 'John',
    apellido_paterno: 'Doe',
    email: 'john.doe@example.com',
    telefono: 123456789,
    activo: true,
  },
  {
    id_personal: 'f3b5c6d7-4a7c-4e8f-b9e2-1c5d7f9b3e6a', 
    nombres: 'Jane',
    apellido_paterno: 'Smith',
    email: 'jane.smith@example.com',
    telefono: 987654321,
    activo: true,
  },
];
