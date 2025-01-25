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
    console.error('Error al crear trabajo:', error);

    const message =
      error?.response?.data?.message ||
      'Ocurrió un error al intentar crear el trabajo.';

    return {
      ok: false,
      message,
    };
  }
};

// Función auxiliar para convertir cadenas de fecha a objetos Date
const convertirFechas = (trabajos: Trabajo[]): Trabajo[] => {
  return trabajos.map(trabajo => ({
    ...trabajo,
    fecha_entrada: trabajo.fecha_entrada ? new Date(trabajo.fecha_entrada) : null,
    fecha_salida: trabajo.fecha_salida ? new Date(trabajo.fecha_salida) : null,
    // Si hay más campos de fecha dentro de DetalleTrabajo, conviértelos aquí
    detalleTrabajo: {
      ...trabajo.detalleTrabajo,
      // Supongamos que hay campos de fecha dentro de DetalleTrabajo
      // fecha_algun_campo: trabajo.detalleTrabajo.fecha_algun_campo ? new Date(trabajo.detalleTrabajo.fecha_algun_campo) : null,
    },
  }));
};


// Obtener todos los trabajos con paginación y orden
export const getTrabajos = async (
  limit: number,
  offset: number,
  sortBy: keyof Trabajo = 'numero_trabajo', // Asegura que sortBy sea una clave válida de Trabajo
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

//Obtener Productos
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
export const findTramiento = async (): Promise<{
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
): Promise<{
  ok: boolean;
  data?: Trabajo;
  message?: string;
}> => {
  try {
    const response = await backendApi.patch(`/trabajos/${id_trabajo}`, updateTrabajoDto);
    return {
      ok: true,
      data: response.data, // Asegúrate de que la respuesta de tu API tenga esta estructura
    };
  } catch (error: any) {
    console.error(error);
    return {
      ok: false,
      message: error.response?.data?.message || 'No se pudo actualizar el trabajo.',
    };
  }
};
