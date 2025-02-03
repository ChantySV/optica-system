import { backendApi } from '@/api/backendApi';
import type { Trabajo, TrabajoResponse,  } from '../interfaces/TrabajosResponse.interface';
import { handleApiError } from '@/common/utils/handleApiError';



export const createTrabajo = async (createTrabajo: any) => {
  try {

    const { data } = await backendApi.post('/trabajos', createTrabajo);
    return {
      ok: true,
      data,
    };
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      return {
        ok: false,
        code: error.response.data.code || 'UNKNOWN_ERROR',
        message: error.response.data.message };
    } else {
      return { ok: false, message: 'Ocurrió un error al crear el trabajo.' };
    }
  }
};

const convertirFechas = (trabajos: Trabajo[]): Trabajo[] => {
  return trabajos.map(trabajo => ({
    ...trabajo,
    fecha_entrada: trabajo.fecha_entrada ? new Date(trabajo.fecha_entrada) : null,
    fecha_salida: trabajo.fecha_salida ? new Date(trabajo.fecha_salida) : null,
    detalleTrabajo: {
      ...trabajo.detalleTrabajo,
    },
  }));
};


export const getTrabajos = async (
  limit: number,
  offset: number,
  sortBy: keyof Trabajo = 'numero_trabajo',
  order: 'ASC' | 'DESC' = 'ASC'
): Promise<{
  ok: boolean;
  data?: TrabajoResponse;
  total?: number;
}> => {
  try {
    const response = await backendApi.get<TrabajoResponse>('/trabajos', {
      params: { limit, offset, sortBy, order },
    });

    if (response.data && 'trabajos' in response.data && 'total' in response.data) {
      const trabajosConFechas = convertirFechas(response.data.trabajos);

      return {
        ok: true,
        data: {
          trabajos: trabajosConFechas,
          total: response.data.total,
        },
        total: response.data.total,
      };
    } else {
      return {
        ok: false,
        data: undefined,
        total: undefined,
      };
    }
  } catch (error) {
    console.error(error);
    return handleApiError(error, 'No se pudieron obtener los trabajos.');
  }
};

export const findProducto = async (): Promise<{
  ok: boolean;
  data?: { id_producto: string, nombre: string }[];
  message?: string;
}> => {
  try {
    const { data } = await backendApi.get('/productos/nombres');

    return {
      ok: true,
      data,
    };
  } catch (error) {
    console.error('Error al obtener los productos:', error);

    return {
      ok: false,

    };
  }
};

//Obtener Tratamiento
export const findTratamiento = async (): Promise<{
  ok: boolean;
  data?: { id_tratamiento: string, nombre: string }[];
  message?: string;
}> => {
  try {
    const { data } = await backendApi.get('/tratamientos/nombres');

    return {
      ok: true,
      data,
    };
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    return {
      ok: false,
    };
  }
};

//Obtener Color
export const findColor = async (): Promise<{
  ok: boolean;
  data?: { id_color: string, nombre: string }[];
  message?: string;
}> => {
  try {
    const { data } = await backendApi.get('/colores/nombres');

    return {
      ok: true,
      data,
    };
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    return {
      ok: false,
    };
  }
};

//Obtener Personal
export const findPersonal = async (): Promise<{
  ok: boolean;
  data?: { id_personal: string, nombres: string }[];
  message?: string;
}> => {
  try {
    const { data } = await backendApi.get('/personal/nombres');
    return {
      ok: true,
      data,
    };
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    return {
      ok: false,
    };
  }
};

// Actualizar un trabajo existente
export const updateTrabajo = async (
  id_trabajo: string,
  updateTrabajoDto: any
) => {
  try {
    const response = await backendApi.patch(`/trabajos/${id_trabajo}`, updateTrabajoDto);
    return {
      ok: true,
      data: response.data,
    };
  } catch (error: any) {
    console.error(error);
    return {
      ok: false,
      message: error.response?.data?.message || 'Error al actualizar el trabajo.',
      code: error.response?.data?.code || null,
    };
  }
};
