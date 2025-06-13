export interface PmpResponseNeto {
  ok:    boolean;
  data:  Datum[];
  total: number;
}

export interface Datum {
  mesAno:         string;
  compras:        number;
  ventas:         number;
  comprasTotales: number;
  ventasTotales:  number;
  balanceNeto:    number;
}
