import { backendApi } from "@/api/backendApi";
import { isAxiosError } from "axios";
import type { ProveedoresResponseInterface } from "../interfaces/proveedoresResponse.interface";

// Obtener proveedores con paginación
export const getProveedoresAction = async (
  limit: number,
  offset: number
): Promise<{
  ok: boolean;
  data?: ProveedoresResponseInterface[];
  total?: number;
  message?: string;
}> => {
  try {
    const { data } = await backendApi.get('/proveedores', {
      params: { limit, offset },
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


// Crear un proveedor
export const createProveedorAction = async (
  proveedor: Omit<ProveedoresResponseInterface, 'id_proveedor' | 'activo'>
): Promise<{ ok: boolean; message?: string }> => {
  try {
    await backendApi.post('/proveedores', proveedor);
    return { ok: true };
  } catch (error) {
    return handleApiError(error, 'No se pudo crear el proveedor.');
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
