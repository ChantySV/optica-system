// src/interfaces/pmp.interface.ts

export interface EntradaPmp {
  fecha: string; // Fecha específica del registro, formato: 'dd/mm/yyyy'
  concepto: string;
  cantidad: number;
  valor_unidad: number;
  valor_total: number;
}

export interface MesAno {
  fecha: string; // Formato: 'Mes Año' (e.g., 'Enero 2023')
  entradas: EntradaPmp[];
}

export interface PmpCompraData {
  producto: string;
  meses: MesAno[];
}

export interface PmpVentaData {
  producto: string;
  meses: MesAno[];
}

export interface NetoPmp {
  mesAno: string;
  compras: number;
  ventas: number;
  comprasTotales: number;
  ventasTotales: number;
  balanceNeto: number;
}
