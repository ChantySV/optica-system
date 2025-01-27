import { backendApi } from '@/api/backendApi'; // Ajusta según tu configuración de axios
import type { personalInteface } from '../interfaces/personalResponse.interface';

// Eliminar un personal jurídico
export const removePersona = async (
  id_personal: string
): Promise<{
  ok: boolean;
  data?: personalInteface;
  message?: string;
}> => {
  try {
    const response = await backendApi.delete(`/personal/${id_personal}`);
    return {
      ok: true,
      data: response.data.data, // Asegúrate de que el backend responda con { data: Personal }
    };
  } catch (error: any) {
    console.error('Error en removePersona:', error);
    return {
      ok: false,
      message: error.response?.data?.message || 'No se pudo eliminar la persona.',
    };
  }
};

export const findAllNaturales = async (
  limit: number,
  offset: number,
  sortBy: string,
  order: 'ASC' | 'DESC',
) => {
  try {
    const response = await backendApi.get('/personal/naturales', {
      params: { limit, offset, sortBy, order },
    });

    return {
      ok: true,
      data: {
        naturales: response.data.naturales,
        total: response.data.total,
      },
    };
  } catch (error: any) {
    console.error('Error en findAllJuridicos:', error);
    return {
      ok: false,
      message: error.response?.data?.message || 'No se pudo obtener la lista de jurídicos.',
    };
  }
};

export const findAllJuridicos = async (
  limit: number,
  offset: number,
  sortBy: string,
  order: 'ASC' | 'DESC',
) => {
  try {
    const response = await backendApi.get('/personal/juridicos', {
      params: { limit, offset, sortBy, order },
    });

    return {
      ok: true,
      data: {
        juridicos: response.data.juridicos,
        total: response.data.total,
      },
    };
  } catch (error: any) {
    console.error('Error en findAllJuridicos:', error);
    return {
      ok: false,
      message: error.response?.data?.message || 'No se pudo obtener la lista de jurídicos.',
    };
  }
};

export const searchPersonaAdmin = async (
  search: string,
) => {
  try {
    const response = await backendApi.get('/personal/search-admin', {
      params: { search },
    });

    return {
      ok: true,
      data: {
        personas: response.data.personas,
        total: response.data.total,
      },
    };
  } catch (error: any) {
    console.error('Error en searchPersonaAdmin:', error);
    return {
      ok: false,
      message: error.response?.data?.message || 'Error al buscar personal.',
    };
  }
};

export const updatePersona = async (
  id_personal: string,
  data: {
    nombres: string;
    apellido_paterno: string;
    apellido_materno: string | null;
    email: string | null;
    telefono: number | null;
    tipo_persona: string;
  }
) => {
  try {
    const response = await backendApi.patch(`/personal/${id_personal}`, {
      nombres: data.nombres,
      apellido_paterno: data.apellido_paterno,
      apellido_materno: data.apellido_materno || null,
      email: data.email || null,
      telefono: data.telefono || null,
      tipo_persona: data.tipo_persona,
    });

    return {
      ok: true,
      data: response.data.data,
    };
  } catch (error: any) {
    console.error('Error en updatePersona:', error);
    return {
      ok: false,
      message: error.response?.data?.message || 'No se pudo actualizar la persona.',
    };
  }
};

export const createPersona = async (
  data: {
    nombres: string;
    apellido_paterno: string;
    apellido_materno: string | null;
    email: string;
    telefono: number | null;
    tipo_persona: string;
  }
): Promise<{
  ok: boolean;
  data?: personalInteface;
  message?: string;
}> => {
  try {
    const response = await backendApi.post(`/personal`, {
      nombres: data.nombres,
      apellido_paterno: data.apellido_paterno,
      apellido_materno: data?.apellido_materno,
      email: data?.email,
      telefono: data?.telefono,
      tipo_persona: data.tipo_persona,
    });

    return {
      ok: true,
      data: response.data.data, // Alineado con la nueva estructura del backend
    };
  } catch (error: any) {
    console.error('Error en createPersona:', error);
    return {
      ok: false,
      message: error.response?.data?.message || 'No se pudo crear la persona.',
    };
  }
};
