export interface TrabajoResponse {
  trabajos: Trabajo[];
  total:    number;
}

export interface Trabajo {
  id_trabajo:     string;
  numero_trabajo: number;
  fecha_entrada:  Date;
  fecha_salida:   Date | null;
  activo:         boolean;
  estado:         Estado;
  detalleTrabajo: DetalleTrabajo;
  personal:       Personal;
}

export interface DetalleTrabajo {
  id_detalleTrabajo:  string;
  distancia:          boolean;
  esferico_derecho:   null | string;
  esferico_izquierdo: null | string;
  cilindro_derecho:   null | string;
  cilindro_izquierdo: null | string;
  eje_derecho:        number | null;
  eje_izquierdo:      number | null;
  prisma_izquierdo:   number | null;
  prisma_derecho:     number | null;
  base_izquierdo:     number | null;
  base_derecho:       number | null;
  adicion_izquierdo:  number | null;
  adicion_derecho:    number | null;
  altura_izquierdo:   number | null;
  altura_derecho:     number | null;
  dip_izquierdo:      null | string;
  dip_derecho:        number | null;
  producto:           Producto;
  tratamiento:        Tratamiento | null;
  color:              Color | null;
}

export interface Color {
  id_color: string;
  nombre:   string;
  activo:   boolean;
}

export interface Producto {
  id_producto:   string;
  nombre:        string;
  stock:         number;
  precio_compra: string;
  precio_venta:  string;
  activo:        boolean;
}

export interface Tratamiento {
  id_tratamiento: string;
  nombre:         string;
  descripcion:    string;
  activo:         boolean;
}

export enum Estado {
  Entregado = "entregado",
  Pendiente = "pendiente",
}

export interface Personal {
  id_personal:      string;
  nombres:          string;
  apellido_paterno: string;
  apellido_materno: null;
  email:            string;
  telefono:         number;
  tipo_persona:     TipoPersona;
  activo:           boolean;
}

export enum TipoPersona {
  Juridica = "juridica",
}
