// src/actions/colores.actions.ts

import { backendApi } from '@/api/backendApi';
import type { Color } from '../interfaces/ColorResponse.interface';

interface FindAllColorsParams {
  page: number;
  limit: number;
  sortBy: string;
  order: 'ASC' | 'DESC';
  filters: {
    nombre: string;
  };
}

interface CreateColorPayload {
  nombre: string;
}

interface UpdateColorPayload {
  nombre?: string;
}

export const findAllColors = async (
  params: FindAllColorsParams
) => {
  try {
    const response = await backendApi.get('/colores', { params });

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
    console.error('Error en findAllColors:', error);
    return {
      ok: false,
      data: [],
      total: 0,
      message: error.response?.data?.message || 'No se pudo cargar la lista de colores.',
    };
  }
};

export const createColor = async (
  payload: CreateColorPayload
): Promise<{ ok: boolean; data: Color | null; message?: string }> => {
  try {
    const response = await backendApi.post('/colores', payload);

    if (response.data && response.data.ok) {
      return {
        ok: true,
        data: response.data.data,
      };
    } else {
      return {
        ok: false,
        data: null,
        message: response.data.message || 'Error al crear el color.',
      };
    }
  } catch (error: any) {
    console.error('Error en createColor:', error);
    return {
      ok: false,
      data: null,
      message: error.response?.data?.message || 'No se pudo crear el color.',
    };
  }
};

export const updateColor = async (
  id_color: string,
  payload: UpdateColorPayload
)=> {
  try {
    const response = await backendApi.patch(`/colores/${id_color}`, payload);

    if (response.data && response.data.ok) {
      return {
        ok: true,
        data: response.data.data,
      };
    } else {
      return {
        ok: false,
      };
    }
  } catch (error: any) {
    console.error('Error en updateColor:', error);
    return {
      ok: false,
      data: null,
      message: error.response?.data?.message || 'No se pudo actualizar el color.',
    };
  }
};

export const removeColor = async (
  id_color: string
): Promise<{ ok: boolean; data: Color | null; message?: string }> => {
  try {
    const response = await backendApi.delete(`/colores/${id_color}`);

    if (response.data && response.data.ok) {
      return {
        ok: true,
        data: response.data.data,
      };
    } else {
      return {
        ok: false,
        data: null,
        message: response.data.message || 'Error al eliminar el color.',
      };
    }
  } catch (error: any) {
    console.error('Error en removeColor:', error);
    return {
      ok: false,
      data: null,
      message: error.response?.data?.message || 'No se pudo eliminar el color.',
    };
  }
};
