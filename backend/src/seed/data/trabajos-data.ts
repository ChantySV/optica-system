interface SeedTrabajo {
    id_trabajo: string;
  numero_trabajo: number;
  id_personal: string;
  detalleTrabajo: {
    distancia: boolean;
    adicion?: number;
    base?: number;
    esferico_derecho?: number;
    esferico_izquierdo?: number;
    cilindro_derecho?: number;
    cilindro_izquierdo?: number;
    eje_derecho?: number;
    eje_izquierdo?: number;
    id_tratamiento?: string;
    id_producto: string;
    id_color?: string;
  };
}

export const seedTrabajo: SeedTrabajo[] = [
    {
      id_trabajo: 'd3920569-be28-4d64-bce0-c74b90c82571',
      numero_trabajo: 1001,
      id_personal: 'd2c0a7b5-8a8c-482e-a6d7-3b6f5435c97e', 
      detalleTrabajo: {
        distancia: true,
        adicion: 2,
        base: 60,
        esferico_derecho: 1.25,
        esferico_izquierdo: 1.50,
        cilindro_derecho: -0.75,
        cilindro_izquierdo: -0.50,
        eje_derecho: 90,
        eje_izquierdo: 85,
        id_producto: '1f7d3f26-dadc-4f23-8c58-fb0e85b5a7bc', 
        id_color: '6d048104-1e5a-4ab7-b1f9-b03f8333c852' 
      }
    },
    {
      id_trabajo: '7fe5547c-2f5a-4fa5-90dd-0a0f2d67cc55',
      numero_trabajo: 1002,
      id_personal: 'f3b5c6d7-4a7c-4e8f-b9e2-1c5d7f9b3e6a',
      detalleTrabajo: {
        distancia: false,
        esferico_derecho: 2.00,
        esferico_izquierdo: 2.25,
        id_producto: '2b8e3d54-ef09-44eb-9d67-51f635d12d0a', 
        id_color: 'f18a429f-7415-4ae2-89ca-b76edc322662' 
      }
    },
    {
      id_trabajo:'ee54cfaa-858a-4548-b365-6382db99d031',
      numero_trabajo: 1003,
      id_personal: 'f3b5c6d7-4a7c-4e8f-b9e2-1c5d7f9f4e6a', 
      detalleTrabajo: {
        distancia: true,
        adicion: 1,
        base: 55,
        esferico_derecho: 0.75,
        esferico_izquierdo: 1.00,
        cilindro_derecho: -1.25,
        cilindro_izquierdo: -1.00,
        eje_derecho: 95,
        eje_izquierdo: 90,
        id_tratamiento: 'e4c9b474-9ea1-4e30-bf7d-7a51ad385f80',
        id_producto: 'e9e56f1a-7533-42a2-924f-6f50a72b8a3c',
        id_color: '17ea4fea-b909-488f-86bc-e8e70cd6edf8' 
      }
    },
    {
      id_trabajo: '57bff79a-e93e-4920-85d0-310b33da6f61',
      numero_trabajo: 1004,
      id_personal: '7d405d21-d519-44f7-801c-0f88d9d158bd', 
      detalleTrabajo: {
        distancia: false,
        esferico_derecho: 3.50,
        esferico_izquierdo: 3.75,
        cilindro_derecho: -2.00,
        cilindro_izquierdo: -1.75,
        eje_derecho: 100,
        eje_izquierdo: 95,
        id_producto: '14b7fdef-0dfa-48b5-9484-7cd0f588334b', 
        id_color: '606d588f-a787-43a6-8c2f-299c16ab7dac'
      }
    },
    {
      id_trabajo:'a6a3ebc0-f0d0-4fd5-97d6-017c067dbecb',
      numero_trabajo: 1005,
      id_personal: 'd2c0a7b5-8a8c-482e-a6d7-3b6f5435c97e',
      detalleTrabajo: {
        distancia: true,
        adicion: 1,
        base: 58,
        esferico_derecho: 1.00,
        esferico_izquierdo: 1.25,
        id_producto: '0f61f962-afdc-4de7-bb22-c9526facc652', 
        id_color: 'ff28b348-0b05-4f7a-b82e-f49d6b0e555e' 
      }
    },
    {
      id_trabajo:'54c78aef-5a70-4932-a334-95bbab77adef',
      numero_trabajo: 1006,
      id_personal: 'f3b5c6d7-4a7c-4e8f-b9e2-1c5d7f9b3e6a',
      detalleTrabajo: {
        distancia: true,
        adicion: 1,
        base: 62,
        esferico_derecho: 0.50,
        esferico_izquierdo: 0.75,
        cilindro_derecho: -0.50,
        cilindro_izquierdo: -0.25,
        eje_derecho: 85,
        eje_izquierdo: 80,
        id_producto: 'ff50f511-2723-4aae-b8ed-182fa9cff915',
        id_color: 'd5a1b2e6-b34c-4c62-9fc7-d7750c0ec8a4'
      }
    },
    {
      id_trabajo: '1260efa7-d8c2-41a6-b644-83477e01ccdd',
      numero_trabajo: 1007,
      id_personal: '7d405d21-d519-44f7-801c-0f88d9d158bd',
      detalleTrabajo: {
        distancia: false,
        esferico_derecho: 4.00,
        esferico_izquierdo: 4.25,
        cilindro_derecho: -1.50,
        cilindro_izquierdo: -1.25,
        eje_derecho: 105,
        eje_izquierdo: 100,
        id_producto: 'bc0bcd4a-52a0-4e23-97f2-1424f273c48f',
        id_color: '6d048104-1e5a-4ab7-b1f9-b03f8333c852'
      }
    },
    {
      id_trabajo: '4c8c169c-1ec3-4bb3-8d78-77a1c4727cb6',
      numero_trabajo: 1008,
      id_personal: 'f3b5c6d7-4a7c-4e8f-b9e2-1c5d7f9f4e6a',
      detalleTrabajo: {
        distancia: true,
        adicion: 2,
        base: 64,
        esferico_derecho: 1.75,
        esferico_izquierdo: 2.00,
        id_tratamiento: 'd1b56d64-b2f2-4f6e-8835-d6e1f3545d76',
        id_producto: '47447c19-8c26-4fab-96ee-96bad567764a',
        id_color: 'f18a429f-7415-4ae2-89ca-b76edc322662'
      }
    },
    {
      id_trabajo: '0aba8687-840d-4e07-9287-4ee6f7bab23a',
      numero_trabajo: 1009,
      id_personal: 'd2c0a7b5-8a8c-482e-a6d7-3b6f5435c97e',
      detalleTrabajo: {
        distancia: false,
        esferico_derecho: 0.25,
        esferico_izquierdo: 0.50,
        cilindro_derecho: -0.75,
        cilindro_izquierdo: -0.50,
        eje_derecho: 90,
        eje_izquierdo: 85,
        id_producto: '5f1a2643-25bc-4f2c-8ff8-72c105f78540',
        id_color: '17ea4fea-b909-488f-86bc-e8e70cd6edf8'
      }
    },
    {
      id_trabajo:'2f1e42eb-fdc0-4d92-ac96-885b8ecc142f',
      numero_trabajo: 1010,
      id_personal: 'f3b5c6d7-4a7c-4e8f-b9e2-1c5d7f9b3e6a',
      detalleTrabajo: {
        distancia: true,
        adicion: 1,
        base: 58,
        esferico_derecho: 2.50,
        esferico_izquierdo: 2.75,
        cilindro_derecho: -1.25,
        cilindro_izquierdo: -1.00,
        eje_derecho: 95,
        eje_izquierdo: 90,
        id_producto: '7624e2e2-8790-4daf-b5f2-0113387b1f21',
        id_color: '606d588f-a787-43a6-8c2f-299c16ab7dac'
      }
    },
    {
      id_trabajo:'f710e6d8-6f35-4fa4-9419-5b7737a4ffb2',
      numero_trabajo: 1011,
      id_personal: '7d405d21-d519-44f7-801c-0f88d9d158bd',
      detalleTrabajo: {
        distancia: false,
        esferico_derecho: 3.25,
        esferico_izquierdo: 3.50,
        id_tratamiento: 'e7fd1325-8d3a-4415-a52d-7acfcf0e94a2',
        id_producto: '95d532b6-6df8-466b-a590-5db57d64b5d3',
        id_color: 'ff28b348-0b05-4f7a-b82e-f49d6b0e555e'
      }
    },
    {
      id_trabajo:'896c1df5-ef9f-4f5d-970e-d8deea92c89a',
      numero_trabajo: 1012,
      id_personal: 'f3b5c6d7-4a7c-4e8f-b9e2-1c5d7f9f4e6a',
      detalleTrabajo: {
        distancia: true,
        adicion: 1,
        base: 60,
        esferico_derecho: 1.00,
        esferico_izquierdo: 1.25,
        cilindro_derecho: -0.75,
        cilindro_izquierdo: -0.50,
        eje_derecho: 90,
        eje_izquierdo: 85,
        id_producto: 'd9c230fa-ddba-461c-aef3-2ee8ab8cfd60',
        id_color: 'd5a1b2e6-b34c-4c62-9fc7-d7750c0ec8a4'
      }
    },
    {
      id_trabajo:'7bfaf42f-f321-469c-af90-9ffb351bc176',
      numero_trabajo: 1013,
      id_personal: 'd2c0a7b5-8a8c-482e-a6d7-3b6f5435c97e',
      detalleTrabajo: {
        distancia: false,
        esferico_derecho: 2.75,
        esferico_izquierdo: 3.00,
        cilindro_derecho: -1.50,
        cilindro_izquierdo: -1.25,
        eje_derecho: 100,
        eje_izquierdo: 95,
        id_producto: 'cf066aba-de53-4392-9ce7-0498c97f3452',
        id_color: '6d048104-1e5a-4ab7-b1f9-b03f8333c852'
      }
    },
    {
      id_trabajo:'01817cea-8eda-4c96-8eb8-4c2673284785',
      numero_trabajo: 1014,
      id_personal: 'f3b5c6d7-4a7c-4e8f-b9e2-1c5d7f9b3e6a',
      detalleTrabajo: {
        distancia: true,
        adicion: 2.00,
        base: 62,
        esferico_derecho: 0.75,
        esferico_izquierdo: 1.00,
        id_producto: 'f66639f3-e28c-421d-9109-46514b711a84',
        id_color: 'f18a429f-7415-4ae2-89ca-b76edc322662'
      }
    },
    {
      id_trabajo:'47e5b5a9-425a-47db-855d-5fc09b97c117',
      numero_trabajo: 1015,
      id_personal: '7d405d21-d519-44f7-801c-0f88d9d158bd',
      detalleTrabajo: {
        distancia: false,
        esferico_derecho: 1.50,
        esferico_izquierdo: 1.75,
        cilindro_derecho: -0.75,
        cilindro_izquierdo: -0.50,
        eje_derecho: 90,
        eje_izquierdo: 85,
        id_tratamiento: '87e0d3fd-0bb0-44ca-808d-df9ac6d98862',
        id_producto: '26ba7f32-df40-4490-a339-51192cfb117c',
        id_color: '17ea4fea-b909-488f-86bc-e8e70cd6edf8'
      }
    },
    {
      id_trabajo:'fd235b35-60f6-4b22-a58d-2a76bc2018d5',
      numero_trabajo: 1016,
      id_personal: 'f3b5c6d7-4a7c-4e8f-b9e2-1c5d7f9f4e6a',
      detalleTrabajo: {
        distancia: true,
        adicion: 1,
        base: 60,
        esferico_derecho: 2.25,
        esferico_izquierdo: 2.50,
        cilindro_derecho: -1.25,
        cilindro_izquierdo: -1.00,
        eje_derecho: 95,
        eje_izquierdo: 90,
        id_producto: '322d2ce2-3093-4fbd-867f-c9cc5ab6808f',
        id_color: '606d588f-a787-43a6-8c2f-299c16ab7dac'
      }
    },
    {
      id_trabajo:'9d35d078-47a3-4e31-9fe1-387841a1bf82',
      numero_trabajo: 1017,
      id_personal: 'd2c0a7b5-8a8c-482e-a6d7-3b6f5435c97e',
      detalleTrabajo: {
        distancia: false,
        esferico_derecho: 0.50,
        esferico_izquierdo: 0.75,
        id_producto: '1856e1ea-7245-4a1b-8fe5-aea5540b8ba7',
        id_color: 'ff28b348-0b05-4f7a-b82e-f49d6b0e555e'
      }
    },
    {
      id_trabajo:'dde6bd0a-25a7-4e47-b8e7-e8ac0c84000c',
      numero_trabajo: 1018,
      id_personal: 'f3b5c6d7-4a7c-4e8f-b9e2-1c5d7f9b3e6a',
      detalleTrabajo: {
        distancia: true,
        adicion: 2,
        base: 64,
        esferico_derecho: 1.50,
        esferico_izquierdo: 1.75,
        cilindro_derecho: -0.75,
        cilindro_izquierdo: -0.50,
        eje_derecho: 90,
        eje_izquierdo: 85,
        id_tratamiento: 'e7fd1325-8d3a-4415-a52d-7acfcf0e94a2',
        id_producto: '487a0c53-a66e-4f62-92f7-fa04794aeec8',
        id_color: 'd5a1b2e6-b34c-4c62-9fc7-d7750c0ec8a4'
      }
    },
  ];