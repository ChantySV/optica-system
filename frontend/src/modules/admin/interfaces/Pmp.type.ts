export interface PmpResponse {
  ok: boolean;
  data: Datum[];
  total: number;
}

export interface Datum {
  producto: string;
  meses: Mese[];
}

export interface Mese {
  fecha: MeseFecha;
  entradas: Entrada[];
}

export interface Entrada {
  fecha: EntradaFecha;
  concepto: Concepto;
  cantidad: number;
  valor_unidad: string;
  valor_total: string;
}

export enum Concepto {
  Compra = 'compra',
  Venta = 'venta',
}

export type EntradaFecha = string;
export type MeseFecha = string;
