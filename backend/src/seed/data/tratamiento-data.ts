export interface SeedTratamiento {
    nombre: string;
    descripcion: string;
    activo: boolean;
  }
  
  export const seedTratamientos: SeedTratamiento[] = [
    { nombre: 'Antirreflejo', descripcion: 'Protege contra reflejos', activo: true },
    { nombre: 'Fotocromático', descripcion: 'Oscurece con el sol', activo: true },
  ];
  