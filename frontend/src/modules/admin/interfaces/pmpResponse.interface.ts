export interface PmpResponse {
    ok:    boolean;
    data:  Datum[];
    total: number;
}

export interface Datum {
    producto: string;
    meses:    Mese[];
}

export interface Mese {
    fecha:    MeseFecha;
    entradas: Entrada[];
}

export interface Entrada {
    fecha:        EntradaFecha;
    concepto:     Concepto;
    cantidad:     number;
    valor_unidad: string;
    valor_total:  string;
}

export enum Concepto {
    Compra = "compra",
}

export enum EntradaFecha {
    The3152025 = "31/5/2025",
}

export enum MeseFecha {
    MayoDe2025 = "Mayo de 2025",
}
