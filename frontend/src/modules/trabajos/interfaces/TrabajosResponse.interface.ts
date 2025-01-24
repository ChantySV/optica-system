export interface TrabajosResponse {
  data:  Datum[];
  total: number;
}

export interface Datum {
  id_trabajo:        string;
  fecha_entrada:     Date;
  numero_trabajo: number;
  fecha_salida:      null;
  estado:            string;
  id_detalleTrabajo: string;
  personal:          string;
}

export interface DetalleResponse {
  data: DataDetalle;
}

export interface DataDetalle {
  id_detalleTrabajo:  string;
  distancia:          boolean;
  esferico_derecho:   string;
  esferico_izquierdo: null;
  cilindro_derecho:   null;
  cilindro_izquierdo: null;
  eje_derecho:        null;
  eje_izquierdo:      null;
  prisma_izquierdo:   null;
  prisma_derecho:     null;
  base_izquierdo:     null;
  base_derecho:       null;
  adicion_izquierdo:  null;
  adicion_derecho:    null;
  altura_izquierdo:   null;
  altura_derecho:     null;
  dip_izquierdo:      null;
  dip_derecho:        null;
  producto:           string;
  color:              null;
  tratamiento:        null;
}
