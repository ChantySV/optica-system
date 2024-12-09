export interface SeedOptica {
    nombre: string;
    direccion?: string;
    numero?: string;
    activo: boolean;
  }
  
  export const seedOpticas: SeedOptica[] = [
    { nombre: 'Optica Vision', direccion: 'Calle Principal #123', numero: '789456123', activo: true },
    { nombre: 'Optica Salud', direccion: 'Av. Secundaria #45', numero: '456123789', activo: true },
  ];
  