import { backendApi } from "@/api/backendApi";
import { isAxiosError } from "axios";
import type { ProveedoresResponseInterface } from "../interfaces/proveedoresResponse.interface";

// Obtener proveedores con paginación
export const getProveedoresAction = async (
  limit: number,
  offset: number,
  sortBy: string = 'nombre',
  order: 'ASC' | 'DESC' = 'ASC',
  search: string = ''
): Promise<{
  ok: boolean;
  data?: ProveedoresResponseInterface[];
  total?: number;
}> => {
  try {
    const { data } = await backendApi.get('/proveedores', {
      params: { limit, offset, sortBy, order, search },
    });

    return {
      ok: true,
      data: data.proveedores,
      total: data.total,
    };
  } catch (error) {
    console.error(error);
    return handleApiError(error, 'No se pudieron obtener los proveedores.');
  }
};

// Barra de Busqueda proveedor
export const searchProveedoresAction = async (
  search: string,
  limit: number,
  offset: number
): Promise<{
  ok: boolean;
  data?: ProveedoresResponseInterface[];
  total?: number;
  message?: string;
}> => {
  try {
    // Validar si el término de búsqueda está vacío antes de hacer la solicitud
    if (!search.trim()) {
      return {
        ok: false,
        message: 'El término de búsqueda no puede estar vacío.',
      };
    }

    const { data } = await backendApi.get('/proveedores/search', {
      params: { search, limit, offset },
    });

    return {
      ok: true,
      data: data.proveedores,
      total: data.total,
    };
  } catch (error) {
    console.error(error);
    return handleApiError(error, 'No se pudo realizar la búsqueda.');
  }
};


// Crear un proveedor
export const createProveedorAction = async (
  proveedor: Omit<ProveedoresResponseInterface, 'id_proveedor' | 'activo'>
) => {
  try {
    const response =  await backendApi.post('/proveedores', proveedor);
    return { ok: true, data: response.data };
  } catch (error: any) {
    if (error.response && error.response.status === 400) {
      return { ok: false, message: error.response.data.message };
    }
    return { ok: false, message: 'Error inesperado al crear el proveedor.' };
  }
};

// Actualizar un proveedor
export const updateProveedorAction = async (
  id_proveedor: string,
  proveedor: Partial<ProveedoresResponseInterface>
): Promise<{ ok: boolean; message?: string }> => {
  try {
    await backendApi.patch(`/proveedores/${id_proveedor}`, proveedor);
    return { ok: true };
  } catch (error) {
    return handleApiError(error, 'No se pudo actualizar el proveedor.');
  }
};

// Eliminar un proveedor
export const deleteProveedorAction = async (
  id_proveedor: string
): Promise<{ ok: boolean; message?: string }> => {
  try {
    await backendApi.delete(`/proveedores/${id_proveedor}`);
    return { ok: true };
  } catch (error) {
    return handleApiError(error, 'No se pudo eliminar el proveedor.');
  }
};

// Manejo centralizado de errores
const handleApiError = (
  error: unknown,
  defaultMessage: string
): { ok: boolean; message: string } => {
  if (isAxiosError(error)) {
    const status = error.response?.status;
    if (status === 401) {
      return { ok: false, message: 'No autorizado. Verifica tus credenciales.' };
    }
    if (status === 400) {
      return { ok: false, message: 'Solicitud inválida. Verifica los datos enviados.' };
    }
    return { ok: false, message: error.response?.data?.message || defaultMessage };
  }
  console.error(error);
  return { ok: false, message: defaultMessage };
};
