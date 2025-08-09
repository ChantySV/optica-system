import { backendApi } from "@/api/backendApi";
import type { UsuariosResponse } from "../interfaces/usuariosResponse.interface";


export const updateUsuario = async (
  id_usuario: string,
  payload: any,
): Promise<{
  ok: boolean;
  data?: any;
  message?: string;
}> => {
  try {
    const response = await backendApi.patch(`/usuarios/${id_usuario}`, payload);

    if (response.data?.ok) {
      return {
        ok: true,
        data: response.data.data,
      };
    }

    return {
      ok: false,
      message: response.data?.message || 'Ocurrió un error inesperado.',
    };
  } catch (error: any) {
    return {
      ok: false,
      message: error.response?.data?.message || 'Error al actualizar el usuario.',
    };
  }
};

export const findAllUsuarios = async (
  page: number = 1,
  limit: number = 10,
  sortBy: string = 'nombre_usuario',
  order: 'ASC' | 'DESC' = 'ASC',
  filters: {
    nombre_usuario?: string;
    nombre_rol?: string;
    nombres?: string;
  } = {}
): Promise<UsuariosResponse> => {
  try {
    const params: any = {
      page,
      limit,
      sortBy,
      order,
      ...filters,
    };

    const response = await backendApi.get('/usuarios', { params });

    return {
      ok: true,
      data: response.data.data,
      total: response.data.total,
    };
  } catch (error: any) {
    console.error('Error en findAllUsuarios:', error);
    return {
      ok: false,
      data: [],
      total: 0,
      message: error.response?.data?.message || 'No se pudo cargar los usuarios.',
    };
  }
};

export const toggleActivoUsuario = async (
  nombre_usuario: string
): Promise<{
  ok: boolean;
  data?;
  message?: string;
}> => {
  try {
    const response = await backendApi.delete(`/usuarios/${nombre_usuario}`);
    return {
      ok: true,
      data: response.data.data, // Asegúrate de que el backend responda con { data: Datum }
    };
  } catch (error: any) {
    console.error('Error en toggleActivoUsuario:', error);
    return {
      ok: false,
      message: error.response?.data?.message || 'No se pudo actualizar el estado del usuario.',
    };
  }
};

export const findAllRoles = async (): Promise<{ ok: boolean; data: any, message?: string }> => {
  try {
    const response = await backendApi.get('/roles');

    if (response.data && Array.isArray(response.data.data)) {
      return {
        ok: true,
        data: response.data.data,
      };
    } else {
      return {
        ok: false,
        data: [],
        message: 'Respuesta inesperada del servidor.',
      };
    }
  } catch (error: any) {
    console.error('Error en findAllRoles:', error);

    // Extrae el mensaje de error del backend si está disponible
    const errorMessage = error.response?.data?.message || 'No se pudo cargar los roles.';

    return {
      ok: false,
      data: [],
      message: errorMessage,
    };
  }
};

export const createUsuario = async (
  payload: any
): Promise<{ ok: boolean; data: any | null; message?: string }> => {
  try {
    const response = await backendApi.post('/usuarios', payload);

    if (response.data && response.data.ok) {
      return {
        ok: true,
        data: response.data.data,
      };
    } else {
      return {
        ok: false,
        data: null,
        message: response.data.message || 'Error al crear el usuario.',
      };
    }
  } catch (error: any) {
    console.error('Error en createUsuario:', error);
    return {
      ok: false,
      data: null,
      message: error.response?.data?.message || 'No se pudo crear el usuario.',
    };
  }
};

export const findAllJuridicosAdmin = async () => {
  try {
    const response = await backendApi.get<{
      ok: boolean;
      data: {
        id_personal: string;
        nombres: string;
        apellido_paterno: string;
        apellido_materno: string | null;
        email: string | null;
        telefono: number;
        tipo_persona: string;
        activo: boolean;
      }[];
    }>('/personal/juridicos-admin');

    if (response.data?.ok && Array.isArray(response.data.data)) {
      return {
        ok: true,
        data: response.data.data,
      };
    } else {
      return {
        ok: false,
        data: [],
        message: 'Respuesta inesperada del servidor.',
      };
    }
  } catch (error: any) {
    console.error('Error en findAllJuridicosAdmin:', error);
    return {
      ok: false,
      data: [],
      message: error.response?.data?.message || 'No se pudo cargar la lista de jurídicos sin usuarios.',
    };
  }
};
