// src/interfaces/trabajo.interface.ts

export interface Personal {
  id_personal: string;
  nombre: string;
  // Agrega otros campos según tu entidad Personal
}

export interface Producto {
  id_producto: string;
  nombre: string;
  // Agrega otros campos según tu entidad Producto
}

export interface DetalleTrabajo {
  id_detalleTrabajo: string;
  distancia: boolean;
  base?: number;
  adicion?: number;
  esferico_derecho?: number;
  esferico_izquierdo?: number;
  cilindro_derecho?: number;
  cilindro_izquierdo?: number;
  eje_derecho?: number;
  eje_izquierdo?: number;
  tratamiento?: string | "" ;
  color?: string | ""
  producto: Producto;
}

export interface DetalleVenta {
  id_detalleVenta: string;
  // Agrega otros campos según tu entidad DetalleVenta
}

export interface Trabajo {
  id_trabajo: string;
  numero_trabajo: number;
  fecha_entrada: string; // Fecha en formato ISO
  fecha_salida?: string; // Fecha en formato ISO
  activo: boolean;
  estado: string;
  personal: Personal;
  detalleTrabajo?: DetalleTrabajo;
  detalleVenta?: DetalleVenta;
}

export interface FindAllTrabajoResponse {
  ok: boolean;
  data: Trabajo[];
  total: number;
  page: number;
  limit: number;
}

export interface UpdateTrabajoResponse {
  ok: boolean;
  data: Trabajo;
}

export interface RemoveTrabajoResponse {
  ok: boolean;
  message: string;
}
