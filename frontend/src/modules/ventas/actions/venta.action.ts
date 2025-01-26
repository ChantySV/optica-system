import { backendApi } from '@/api/backendApi';
import type { VentasResponse, Datum } from '../interfaces/VentasResponse.interface';

// Obtener todas las ventas con paginación y orden
export const getVentas = async (
  limit: number,
  offset: number,
  sortBy: string = 'fecha_venta',
  order: 'ASC' | 'DESC' = 'ASC',
  search: string = ''
): Promise<{
  ok: boolean;
  data?: Datum[];
  total?: number;
  message?: string;
}> => {
  try {
    const { data } = await backendApi.get('/ventas', {
      params: { limit, offset, sortBy, order, search },
    });

    return {
      ok: true,
      data: data.data,
      total: data.total,
    };
  } catch (error) {
    console.error('Error al obtener las ventas:', error);
    return {
      ok: false,
      message: 'No se pudieron obtener las ventas.',
    };
  }
};


export const searchVentas = async (
  search: string,
  limit: number,
  offset: number
): Promise<{ ok: boolean; data?: VentasResponse[]; total?: number; message?: string }> => {
  try {
    const { data } = await backendApi.get('/ventas/search', {
      params: { search, limit, offset },
    });

    return {
      ok: true,
      data: data.ventas,
      total: data.total,
    };
  } catch (error) {
    console.error('Error al buscar ventas:', error);
    return {
      ok: false,
      message: 'Error al buscar ventas.',
    };
  }
};

export const findPendientes = async (): Promise<{
  ok: boolean;
  data?: any[];
  total?: number;
  message?: string;
}> => {
  try {
    const { data } = await backendApi.get('/trabajos/pendientes');
    return { ok: true, data: data.data, total: data.total };
  } catch (error) {
    console.error('Error al obtener los trabajos pendientes:', error);
    return { ok: false, message: 'No se pudieron obtener los trabajos pendientes' };
  }
};

// Obtener detalle de una venta específica
export const findDetalleVenta = async (id_venta: string): Promise<{
  ok: boolean;
  data?: any;
  message?: string;
}> => {
  try {
    const { data } = await backendApi.get(`/ventas/detalle/${id_venta}`);
    return {
      ok: true,
      data,
    };
  } catch (error) {
    console.error('Error al obtener el detalle de la venta:', error);
    return {
      ok: false,
      message: 'Error al obtener el detalle de la venta.',
    };
  }
};

//Precio Sugerido
export const findPrecioVenta = async (id_trabajo: string): Promise<{
  ok: boolean;
  data?: number;
  message?: string;
}> => {
  try {
    const { data } = await backendApi.get(`/ventas/precio-venta/${id_trabajo}`);
    return {
      ok: true,
      data,
    };
  } catch (error: any) {
    console.error('Error al obtener el precio de venta:', error);
    return {
      ok: false,
      message: error.response?.data?.message || 'Error al obtener el precio de venta.',
    };
  }
};

//Search Comprador
export const searchPersonaVenta = async (search: string): Promise<{ ok: boolean; data?: any[]; message?: string }> => {
  try {
    const { data } = await backendApi.get('/personal/search', { params: { search } });
    return { ok: true, data };
  } catch (error) {
    console.error('Error al buscar personal:', error);
    return { ok: false, message: 'Error al buscar personal.' };
  }
};

// Crear una nueva venta
export const createVenta = async (createVentaDto: any) => {
  try {
    const { data } = await backendApi.post('/ventas', createVentaDto);
    return {
      ok: true,
      data,
    };
  } catch (error) {
    console.error('Error al crear la venta:', error);
    return {
      ok: false,
      message: 'Error al crear la venta.',
    };
  }
};

// Actualizar una venta
export const updateVenta = async (id_venta: string, updateVentaDto: any): Promise<{
  ok: boolean;
  data?: any; // Define una interfaz si sabes la estructura exacta
  message?: string;
}> => {
  try {
    const { data } = await backendApi.patch(`/ventas/${id_venta}`, updateVentaDto);
    return {
      ok: true,
      data,
    };
  } catch (error) {
    console.error('Error al actualizar la venta:', error);
    return {
      ok: false,
      message: 'Error al actualizar la venta.',
    };
  }
};

// Eliminar (desactivar lógicamente) una venta
export const removeVenta = async (id_venta: string): Promise<{
  ok: boolean;
  message?: string;
}> => {
  try {
    await backendApi.delete(`/ventas/${id_venta}`);
    return {
      ok: true,
    };
  } catch (error) {
    console.error('Error al eliminar la venta:', error);
    return {
      ok: false,
      message: 'Error al eliminar la venta.',
    };
  }
};
