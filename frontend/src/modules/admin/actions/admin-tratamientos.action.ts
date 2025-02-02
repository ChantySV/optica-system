// src/actions/tratamientos.actions.ts

import { backendApi } from '@/api/backendApi';
import type { Tratamiento } from '../interfaces/tratamientoResponse.interface';

interface FindAllTratamientosParams {
  page: number;
  limit: number;
  sortBy: string;
  order: 'ASC' | 'DESC';
  filters: {
    nombre: string;
  };
}

export const findAllTratamientos = async (
  params: FindAllTratamientosParams
): Promise<{ ok: boolean; data: Tratamiento[]; total: number; message?: string }> => {
  try {
    const response = await backendApi.get('/tratamientos', { params });

    if (response.data && response.data.ok) {
      return {
        ok: true,
        data: response.data.data,
        total: response.data.total,
      };
    } else {
      return {
        ok: false,
        data: [],
        total: 0,
        message: response.data.message || 'Respuesta inesperada del servidor.',
      };
    }
  } catch (error: any) {
    console.error('Error en findAllTratamientos:', error);
    return {
      ok: false,
      data: [],
      total: 0,
      message: error.response?.data?.message || 'No se pudo cargar la lista de tratamientos.',
    };
  }
};

interface UpdateTratamientoPayload {
  nombre?: string;
  descripcion?: string;
  activo?: boolean;
}

export const createTratamiento = async (
  payload: any
)=> {
  try {
    const response = await backendApi.post('/tratamientos', payload);

    if (response.data && response.data.ok) {
      return {
        ok: true,
        data: response.data.data,
      };
    } else {
      return {
        ok: false,
        data: null,
        message: response.data.message || 'Error al crear el tratamiento.',
      };
    }
  } catch (error: any) {
    console.error('Error en createTratamiento:', error);
    return {
      ok: false,
      data: null,
      message: error.response?.data?.message || 'No se pudo crear el tratamiento.',
    };
  }
};


export const updateTratamiento = async (
  id_tratamiento: string,
  payload: UpdateTratamientoPayload
)=> {
  try {
    const response = await backendApi.patch(`/tratamientos/${id_tratamiento}`, payload);

    if (response.data && response.data.ok) {
      return {
        ok: true,
        data: response.data.data,
      };
    } else {
      return {
        ok: false,
        data: null,
        message: response.data.message || 'Error al actualizar el tratamiento.',
      };
    }
  } catch (error: any) {
    console.error('Error en updateTratamiento:', error);
    return {
      ok: false,
      data: null,
      message: error.response?.data?.message || 'No se pudo actualizar el tratamiento.',
    };
  }
};

export const removeTratamiento = async (
  id_tratamiento: string
)=> {
  try {
    const response = await backendApi.delete(`/tratamientos/${id_tratamiento}`);

    if (response.data && response.data.ok) {
      return {
        ok: true,
        data: response.data.data,
      };
    } else {
      return {
        ok: false,
        data: null,
        message: response.data.message || 'Error al eliminar el tratamiento.',
      };
    }
  } catch (error: any) {
    console.error('Error en removeTratamiento:', error);
    return {
      ok: false,
      data: null,
      message: error.response?.data?.message || 'No se pudo eliminar el tratamiento.',
    };
  }
};
