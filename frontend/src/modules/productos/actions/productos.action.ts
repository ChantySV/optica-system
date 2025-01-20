import { backendApi } from '@/api/backendApi';
import type { ProductosResponse, Result } from '../interfaces/productosResponse.interface';
import { handleApiError } from '@/common/utils/handleApiError';

export const getProductosAction = async (
  limit: number,
  offset: number,
  sortBy: string = 'nombre',
  order: 'ASC' | 'DESC' = 'ASC'
): Promise<{
  ok: boolean;
  data?: Result[];
  total?: number;
  message?: string;
}> => {
  try {
    const { data } = await backendApi.get<ProductosResponse>('/productos', {
      params: { limit, offset, sortBy, order },
    });

    return {
      ok: true,
      data: data.result,
      total: data.total,
    };
  } catch (error) {
    console.error(error);
    return handleApiError(error, 'No se pudieron obtener los productos.');
  }
};

export const getProveedoresNamesAction = async (): Promise<{
  ok: boolean;
  data?: { id_proveedor: string; nombre: string }[];
  message?: string;
}> => {
  try {
    const { data } = await backendApi.get('/proveedores/nombres');
    return {
      ok: true,
      data: data.proveedores, // Extraemos solo la lista de proveedores
    };
  } catch (error) {
    console.error(error);
    return handleApiError(error, 'No se pudieron obtener los nombres de los proveedores.');
  }
};

export const searchProductosAction = async (
  search: string,
  limit: number,
  offset: number
): Promise<{
  ok: boolean;
  data?: Result[];
  total?: number;
  message?: string;
}> => {
  try {
    const { data } = await backendApi.get('/productos/search', {
      params: { search, limit, offset },
    });

    return {
      ok: true,
      data: data.productos,
      total: data.total,
    };
  } catch (error) {
    console.error(error);
    return handleApiError(error, 'No se pudo realizar la búsqueda.');
  }
};

export const createProductoAction = async (
  producto: Omit<Result, 'id_producto' | 'proveedores'>
): Promise<{ ok: boolean; message?: string }> => {
  try {
    await backendApi.post('/productos', producto);
    return { ok: true };
  } catch (error) {
    console.error(error);
    return handleApiError(error, 'No se pudo crear el producto.');
  }
};

export const updateProductoAction = async (
  id_producto: string,
  producto: Partial<Result>
): Promise<{ ok: boolean; message?: string }> => {
  try {
    await backendApi.patch(`/productos/${id_producto}`, producto);
    return { ok: true };
  } catch (error) {
    console.error(error);
    return handleApiError(error, `No se pudo actualizar el producto con ID ${id_producto}.`);
  }
};

export const deleteProductoAction = async (
  id_producto: string
): Promise<{ ok: boolean; message?: string }> => {
  try {
    await backendApi.delete(`/productos/${id_producto}`);
    return { ok: true };
  } catch (error) {
    console.error(error);
    return handleApiError(error, `No se pudo eliminar el producto con ID ${id_producto}.`);
  }
};
