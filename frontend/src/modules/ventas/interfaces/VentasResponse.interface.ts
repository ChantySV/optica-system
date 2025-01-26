export interface VentasResponse {
  data:  Datum[];
  total: number;
}

export interface Datum {
  id_venta:      string;
  monto_total:   string;
  fecha_venta:   Date;
  usuario:       string;
  personal:     string;
  detalleVentas: DetalleVenta[];
}

export interface DetalleVenta {
  id_detalle:     string;
  numero_trabajo: number;
  id_trabajo:     string;
}
