interface SeedVenta {
  monto_total: number;
  id_optica: string; // Reference to optica ID
  id_usuario: string; // Reference to usuario ID
  activo: boolean;
}

export const seedVentas: SeedVenta[] = [
  {
    monto_total: 1500,
    id_optica: 'optica-id-1', // Replace with actual optica ID
    id_usuario: 'usuario-id-1', // Replace with actual usuario ID
    activo: true,
  },
  {
    monto_total: 800,
    id_optica: 'optica-id-2', // Replace with actual optica ID
    id_usuario: 'usuario-id-2', // Replace with actual usuario ID
    activo: true,
  },
];
