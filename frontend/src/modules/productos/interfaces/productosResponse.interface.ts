export interface ProductosResponse {
  result: Result[];
  total:  number;
}

export interface Result {
  id_producto:   string;
  nombre:        string;
  precio_compra: string;
  precio_venta:  string;
  stock:         number;
  proveedores:   Proveedore[];
}

export interface Proveedore {
  id_proveedor: string;
  nombre:       string;
}
