import { backendApi } from '@/api/backendApi';
import type { DetalleResponse, TrabajosResponse } from '../interfaces/TrabajosResponse.interface';
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


// Obtener todos los trabajos con paginación y orden
export const getTrabajos = async (
  limit: number,
  offset: number,
  sortBy: string = 'numero_trabajo',
  order: 'ASC' | 'DESC' = 'ASC'
): Promise<{
  ok: boolean,
  data?: TrabajosResponse[],
  total?: number
}> => {
  try {
    const { data } = await backendApi.get(`/trabajos`, {
      params: { limit, offset, sortBy, order },
    });

    return {
      ok: true,
      data: data.data,
      total: data.total
    };
  } catch (error) {
    console.error(error);
    return handleApiError(error, 'No se pudieron obtener los trabajos.');
  }
};

//Obtener Detalle Trabajo
export const findDetalle = async (id: string): Promise<{
  ok: boolean;
  data?: DetalleResponse; // Cambiado a un único objeto
  message?: string;
}> => {
  try {
    const { data } = await backendApi.get(`/trabajos/detalle/${id}`);
    console.log(data.data[0]);
    return {
      ok: true,
      data: data,
    };
  } catch (error) {
    console.error('Error al obtener los detalles:', error);
    return {
      ok: false,
    };
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

// Actualizar un trabajo por ID
export const updateTrabajo = async (id: string, updateTrabajoDto: any) => {
  try {
    const response = await backendApi.patch(`/trabajos${id}`, updateTrabajoDto);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar trabajo con ID ${id}:`, error);
    throw error;
  }
};

// Eliminar lógicamente (desactivar) un trabajo por ID
export const deleteTrabajo = async (id: string) => {
  try {
    const response = await backendApi.delete(`/trabajos${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar trabajo con ID ${id}:`, error);
    throw error;
  }
};
