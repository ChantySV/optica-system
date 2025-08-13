interface SeedVenta {
  id_persona: string;
  detalleVentas: { id_trabajo: string }[];
  monto_total: number;
  fecha_venta: string;
}

export const seedVenta = [
  {

    monto_total: 150.50,
    fecha_venta: '2025-01-15',
    id_personal: 'd2c0a7b5-8a8c-482e-a6d7-3b6f5435c97e',
    detalleVentas: [
      { id_trabajo: 'd3920569-be28-4d64-bce0-c74b90c82571' },
      { id_trabajo: '7fe5547c-2f5a-4fa5-90dd-0a0f2d67cc55' },
    ],
  },
  {

    monto_total: 200.75,
    fecha_venta: '2025-01-20',
    id_personal: 'f3b5c6d7-4a7c-4e8f-b9e2-1c5d7f9b3e6a',
    detalleVentas: [
      { id_trabajo: 'ee54cfaa-858a-4548-b365-6382db99d031' },
    ],
  },
  {

    monto_total: 320.00,
    fecha_venta: '2025-02-05',
    id_personal: 'f3b5c6d7-4a7c-4e8f-b9e2-1c5d7f9f4e6a',
    detalleVentas: [
      { id_trabajo: '57bff79a-e93e-4920-85d0-310b33da6f61' },
      { id_trabajo: 'a6a3ebc0-f0d0-4fd5-97d6-017c067dbecb' },
      { id_trabajo: '54c78aef-5a70-4932-a334-95bbab77adef' },
    ],
  },
  {

    monto_total: 180.25,
    fecha_venta: '2025-02-18',
    id_personal: '7d405d21-d519-44f7-801c-0f88d9d158bd',
    detalleVentas: [
      { id_trabajo: '1260efa7-d8c2-41a6-b644-83477e01ccdd' },
    ],
  },
  {

    monto_total: 220.00,
    fecha_venta: '2025-03-02',
    id_personal: 'd2c0a7b5-8a8c-482e-a6d7-3b6f5435c97e',
    detalleVentas: [
      { id_trabajo: '4c8c169c-1ec3-4bb3-8d78-77a1c4727cb6' },
      { id_trabajo: '0aba8687-840d-4e07-9287-4ee6f7bab23a' },
    ],
  },
  {

    monto_total: 140.50,
    fecha_venta: '2025-03-10',
    id_personal: 'f3b5c6d7-4a7c-4e8f-b9e2-1c5d7f9b3e6a',
    detalleVentas: [
      { id_trabajo: '2f1e42eb-fdc0-4d92-ac96-885b8ecc142f' },
    ],
  },
  {

    monto_total: 300.00,
    fecha_venta: '2025-03-22',
    id_personal: '7d405d21-d519-44f7-801c-0f88d9d158bd',
    detalleVentas: [
      { id_trabajo: 'f710e6d8-6f35-4fa4-9419-5b7737a4ffb2' },
      { id_trabajo: '896c1df5-ef9f-4f5d-970e-d8deea92c89a' },
    ],
  },
];
