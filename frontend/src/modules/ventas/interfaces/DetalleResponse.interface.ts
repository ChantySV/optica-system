export interface DetalleResponseInterfaceTs {
  id_venta:      string;
  monto_total:   string;
  fecha_venta:   Date;
  detalleVentas: DetalleVenta[];
}

export interface DetalleVenta {
  numero_trabajo: number;
  estado:         string;
  producto:       Producto;
}

export interface Producto {
  id_producto:     string;
  nombre_producto: string;
  precio_venta:    string;
}
