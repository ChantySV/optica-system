// export interface DetalleTrabajoDto {
//     distancia: boolean;
//     esferico_derecho?: number;
//     esferico_izquierdo?: number;
//     cilindro_derecho?: number;
//     cilindro_izquierdo?: number;
//     eje_derecho?: number;
//     eje_izquierdo?: number;
//     prisma_derecho?: number;
//     prisma_izquierdo?: number;
//     base_izquierdo?: number;
//     base_derecho?: number;
//     adicion_izquierdo?: number;
//     adicion_derecho?: number;
//     altura_izquierdo?: number;
//     altura_derecho?: number;
//     dip_izquierdo?: number;
//     dip_derecho?: number;
//     id_tratamiento?: string;
//     id_producto: string;
//     id_color?: string;
//   }
  
//   export interface CreateTrabajoDto {
//     numero_trabajo: number;
//     id_personal: string;
//     fecha_salida?: Date;
//     detalleTrabajo: DetalleTrabajoDto;
//   }
   


export const seedTrabajos = [
    {
      "numero_trabajo": 1,
      "id_personal": "d2c0a7b5-8a8c-482e-a6d7-3b6f5435c97e",
      "detalleTrabajo": {
        "distancia": true,
        "esferico_derecho": 1.25,
        "esferico_izquierdo": 1.30,
        "cilindro_derecho": -0.75,
        "cilindro_izquierdo": -0.80,
        "eje_derecho": 45,
        "eje_izquierdo": 42,
        "prisma_derecho": 0.5,
        "prisma_izquierdo": 0.5,
        "id_tratamiento": "afa8b4b6-0259-4e05-9712-05e3c6dc1176",
        "id_producto": "1f7d3f26-dadc-4f23-8c58-fb0e85b5a7bc",
        "id_color": "6d048104-1e5a-4ab7-b1f9-b03f8333c852"
      }
    },
    {
      "numero_trabajo": 2,
      "id_personal": "f3b5c6d7-4a7c-4e8f-b9e2-1c5d7f9b3e6a",
      "detalleTrabajo": {
        "distancia": false,
        "esferico_derecho": 2.15,
        "esferico_izquierdo": 2.10,
        "cilindro_derecho": -0.60,
        "cilindro_izquierdo": -0.55,
        "eje_derecho": 90,
        "eje_izquierdo": 80,
        "adicion_derecho": 1.5,
        "adicion_izquierdo": 1.5,
        "id_tratamiento": "a8d8f6f6-2e68-4c3b-b34b-9505112a3ea4",
        "id_producto": "2b8e3d54-ef09-44eb-9d67-51f635d12d0a",
        "id_color": "f18a429f-7415-4ae2-89ca-b76edc322662"
      }
    },
    {
      "numero_trabajo": 3,
      "id_personal": "f3b5c6d7-4a7c-4e8f-b9e2-1c5d7f9f4e6a",
      "detalleTrabajo": {
        "distancia": true,
        "esferico_derecho": 1.80,
        "esferico_izquierdo": 1.75,
        "cilindro_derecho": -0.90,
        "cilindro_izquierdo": -1.00,
        "eje_derecho": 75,
        "eje_izquierdo": 100,
        "prisma_derecho": 0.8,
        "prisma_izquierdo": 0.8,
        "id_tratamiento": "c1d9e8d6-5137-4f25-9c25-1f0c0e82c7cf",
        "id_producto": "e9e56f1a-7533-42a2-924f-6f50a72b8a3c",
        "id_color": "17ea4fea-b909-488f-86bc-e8e70cd6edf8"
      }
    },
    {
      "numero_trabajo": 4,
      "id_personal": "7d405d21-d519-44f7-801c-0f88d9d158bd",
      "detalleTrabajo": {
        "distancia": false,
        "esferico_derecho": 1.50,
        "esferico_izquierdo": 1.45,
        "cilindro_derecho": -1.20,
        "cilindro_izquierdo": -1.15,
        "eje_derecho": 180,
        "eje_izquierdo": 165,
        "adicion_derecho": 1.0,
        "adicion_izquierdo": 1.0,
        "id_tratamiento": "e4c9b474-9ea1-4e30-bf7d-7a51ad385f80",
        "id_producto": "14b7fdef-0dfa-48b5-9484-7cd0f588334b",
        "id_color": "606d588f-a787-43a6-8c2f-299c16ab7dac"
      }
    },
    {
      "numero_trabajo": 5,
      "id_personal": "d2c0a7b5-8a8c-482e-a6d7-3b6f5435c97e",
      "detalleTrabajo": {
        "distancia": true,
        "esferico_derecho": 2.30,
        "esferico_izquierdo": 2.25,
        "cilindro_derecho": -1.00,
        "cilindro_izquierdo": -1.10,
        "eje_derecho": 55,
        "eje_izquierdo": 65,
        "prisma_derecho": 1.0,
        "prisma_izquierdo": 1.0,
        "id_tratamiento": "d1b56d64-b2f2-4f6e-8835-d6e1f3545d76",
        "id_producto": "0f61f962-afdc-4de7-bb22-c9526facc652",
        "id_color": "ff28b348-0b05-4f7a-b82e-f49d6b0e555e"
      }
    },
    {
      "numero_trabajo": 6,
      "id_personal": "f3b5c6d7-4a7c-4e8f-b9e2-1c5d7f9b3e6a",
      "detalleTrabajo": {
        "distancia": false,
        "esferico_derecho": 1.80,
        "esferico_izquierdo": 1.85,
        "cilindro_derecho": -0.50,
        "cilindro_izquierdo": -0.60,
        "eje_derecho": 90,
        "eje_izquierdo": 85,
        "adicion_derecho": 1.2,
        "adicion_izquierdo": 1.2,
        "id_tratamiento": "87e0d3fd-0bb0-44ca-808d-df9ac6d98862",
        "id_producto": "ff50f511-2723-4aae-b8ed-182fa9cff915",
        "id_color": "d5a1b2e6-b34c-4c62-9fc7-d7750c0ec8a4"
      }
    },
    {
      "numero_trabajo": 7,
      "id_personal": "7d405d21-d519-44f7-801c-0f88d9d158bd",
      "detalleTrabajo": {
        "distancia": true,
        "esferico_derecho": 1.60,
        "esferico_izquierdo": 1.55,
        "cilindro_derecho": -0.80,
        "cilindro_izquierdo": -0.75,
        "eje_derecho": 120,
        "eje_izquierdo": 135,
        "prisma_derecho": 0.7,
        "prisma_izquierdo": 0.7,
        "id_tratamiento": "e7fd1325-8d3a-4415-a52d-7acfcf0e94a2",
        "id_producto": "bc0bcd4a-52a0-4e23-97f2-1424f273c48f",
        "id_color": "6d048104-1e5a-4ab7-b1f9-b03f8333c852"
      }
    },
    {
      "numero_trabajo": 8,
      "id_personal": "f3b5c6d7-4a7c-4e8f-b9e2-1c5d7f9f4e6a",
      "detalleTrabajo": {
        "distancia": false,
        "esferico_derecho": 2.10,
        "esferico_izquierdo": 2.00,
        "cilindro_derecho": -1.20,
        "cilindro_izquierdo": -1.10,
        "eje_derecho": 150,
        "eje_izquierdo": 160,
        "adicion_derecho": 1.5,
        "adicion_izquierdo": 1.5,
        "id_tratamiento": "ee6ab7c0-1a07-432b-91ef-3a64370f5709",
        "id_producto": "47447c19-8c26-4fab-96ee-96bad567764a",
        "id_color": "f18a429f-7415-4ae2-89ca-b76edc322662"
      }
    },
    {
      "numero_trabajo": 9,
      "id_personal": "7d405d21-d519-44f7-801c-0f88d9d158bd",
      "detalleTrabajo": {
        "distancia": true,
        "esferico_derecho": 2.00,
        "esferico_izquierdo": 1.90,
        "cilindro_derecho": -1.10,
        "cilindro_izquierdo": -1.00,
        "eje_derecho": 110,
        "eje_izquierdo": 120,
        "prisma_derecho": 0.9,
        "prisma_izquierdo": 0.9,
        "id_tratamiento": "d509df5a-7f89-4e90-bd39-278634b34f0c",
        "id_producto": "5f1a2643-25bc-4f2c-8ff8-72c105f78540",
        "id_color": "606d588f-a787-43a6-8c2f-299c16ab7dac"
      }
    },
    {
      "numero_trabajo": 10,
      "id_personal": "d2c0a7b5-8a8c-482e-a6d7-3b6f5435c97e",
      "detalleTrabajo": {
        "distancia": false,
        "esferico_derecho": 1.70,
        "esferico_izquierdo": 1.80,
        "cilindro_derecho": -0.90,
        "cilindro_izquierdo": -1.00,
        "eje_derecho": 100,
        "eje_izquierdo": 110,
        "adicion_derecho": 1.0,
        "adicion_izquierdo": 1.0,
        "id_tratamiento": "f66639f3-e28c-421d-9109-46514b711a84",
        "id_producto": "7624e2e2-8790-4daf-b5f2-0113387b1f21",
        "id_color": "d5a1b2e6-b34c-4c62-9fc7-d7750c0ec8a4"
      }
    },
    {
      "numero_trabajo": 11,
      "id_personal": "f3b5c6d7-4a7c-4e8f-b9e2-1c5d7f9b3e6a",
      "detalleTrabajo": {
        "distancia": true,
        "esferico_derecho": 1.50,
        "esferico_izquierdo": 1.40,
        "cilindro_derecho": -0.80,
        "cilindro_izquierdo": -0.70,
        "eje_derecho": 130,
        "eje_izquierdo": 140,
        "prisma_derecho": 1.2,
        "prisma_izquierdo": 1.2,
        "id_tratamiento": "322d2ce2-3093-4fbd-867f-c9cc5ab6808f",
        "id_producto": "95d532b6-6df8-466b-a590-5db57d64b5d3",
        "id_color": "66c7db75-0a8f-4d73-8e58-616fa8985e1e"
      }
    },
    {
      "numero_trabajo": 12,
      "id_personal": "f3b5c6d7-4a7c-4e8f-b9e2-1c5d7f9b3e6a",
      "detalleTrabajo": {
        "distancia": false,
        "esferico_derecho": 2.20,
        "esferico_izquierdo": 2.10,
        "cilindro_derecho": -1.30,
        "cilindro_izquierdo": -1.20,
        "eje_derecho": 140,
        "eje_izquierdo": 145,
        "adicion_derecho": 1.4,
        "adicion_izquierdo": 1.4,
        "id_tratamiento": "1856e1ea-7245-4a1b-8fe5-aea5540b8ba7",
        "id_producto": "ad2a6b38-e095-4f63-9a6c-576ca94c8854",
        "id_color": "ff28b348-0b05-4f7a-b82e-f49d6b0e555e"
      }
    },
    {
      "numero_trabajo": 13,
      "id_personal": "7d405d21-d519-44f7-801c-0f88d9d158bd",
      "detalleTrabajo": {
        "distancia": true,
        "esferico_derecho": 2.00,
        "esferico_izquierdo": 1.90,
        "cilindro_derecho": -1.10,
        "cilindro_izquierdo": -1.00,
        "eje_derecho": 130,
        "eje_izquierdo": 120,
        "prisma_derecho": 1.0,
        "prisma_izquierdo": 1.0,
        "id_tratamiento": "487a0c53-a66e-4f62-92f7-fa04794aeec8",
        "id_producto": "ad2a6b38-e095-4f63-9a6c-576ca94c8854",
        "id_color": "d5a1b2e6-b34c-4c62-9fc7-d7750c0ec8a4"
      }
    },
    {
      "numero_trabajo": 14,
      "id_personal": "7d405d21-d519-44f7-801c-0f88d9d158bd",
      "detalleTrabajo": {
        "distancia": false,
        "esferico_derecho": 1.60,
        "esferico_izquierdo": 1.50,
        "cilindro_derecho": -0.75,
        "cilindro_izquierdo": -0.80,
        "eje_derecho": 125,
        "eje_izquierdo": 135,
        "adicion_derecho": 1.2,
        "adicion_izquierdo": 1.2,
        "id_tratamiento": "68c4d58f-0bb9-4b9b-9989-0ab9385aac62",
        "id_producto": "66c7db75-0a8f-4d73-8e58-616fa8985e1e",
        "id_color": "f18a429f-7415-4ae2-89ca-b76edc322662"
      }
    },
    {
      "numero_trabajo": 15,
      "id_personal": "d2c0a7b5-8a8c-482e-a6d7-3b6f5435c97e",
      "detalleTrabajo": {
        "distancia": true,
        "esferico_derecho": 1.90,
        "esferico_izquierdo": 1.85,
        "cilindro_derecho": -0.60,
        "cilindro_izquierdo": -0.50,
        "eje_derecho": 95,
        "eje_izquierdo": 100,
        "prisma_derecho": 0.8,
        "prisma_izquierdo": 0.8,
        "id_tratamiento": "5b315f55-4aad-4848-8c08-ce249dfe0a73",
        "id_producto": "f66639f3-e28c-421d-9109-46514b711a84",
        "id_color": "6d048104-1e5a-4ab7-b1f9-b03f8333c852"
      }
    }
  ]
  