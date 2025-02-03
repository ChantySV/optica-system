// src/actions/trabajo.actions.ts

import { backendApi } from '@/api/backendApi';
import type { Trabajo, FindAllTrabajoResponse, UpdateTrabajoResponse, RemoveTrabajoResponse } from '../interfaces/TrabajosResponse.interface';

export const getTrabajos = async (
  search?: string,
  page: number = 1,
  limit: number = 10,
  sortField: string = 'fecha_entrada',
  sortOrder: 'ASC' | 'DESC' = 'ASC'
): Promise<FindAllTrabajoResponse> => {
  try {
    const params: any = { page, limit, sortField, sortOrder };
    if (search) {
      params.search = search;
    }

    const response = await backendApi.get('/trabajos', { params });

    return response.data;
  } catch (error: any) {
    console.error('Error en getTrabajos:', error);
    throw error.response?.data || { ok: false, message: 'Error al obtener los trabajos.' };
  }
};

export const getTrabajosEntregados = async (
  search?: string,
  page: number = 1,
  limit: number = 10,
  sortField: string = 'fecha_entrada',
  sortOrder: 'ASC' | 'DESC' = 'ASC'
): Promise<FindAllTrabajoResponse> => {
  try {
    const params: any = { page, limit, sortField, sortOrder };
    if (search) {
      params.search = search;
    }

    const response = await backendApi.get('/trabajos/entregados', { params });

    return response.data;
  } catch (error: any) {
    console.error('Error en getTrabajos:', error);
    throw error.response?.data || { ok: false, message: 'Error al obtener los trabajos.' };
  }
};


export const getTrabajoById = async (id: string): Promise<Trabajo> => {
  try {
    const response = await backendApi.get(`/trabajos/${id}`);
    if (response.data.ok) {
      return response.data.data;
    }
    throw new Error(response.data.message || 'Error al obtener el trabajo.');
  } catch (error: any) {
    console.error('Error en getTrabajoById:', error);
    throw error.response?.data || { ok: false, message: 'Error al obtener el trabajo.' };
  }
};


export const updateTrabajo = async (id: string, data: Partial<Trabajo>): Promise<UpdateTrabajoResponse> => {
  try {
    const response = await backendApi.patch(`/trabajos/${id}`, data);
    return response.data;
  } catch (error: any) {
    console.error('Error en updateTrabajo:', error);
    throw error.response?.data || { ok: false, message: 'Error al actualizar el trabajo.' };
  }
};


export const removeTrabajo = async (id: string)=> {
  try {
    const response = await backendApi.delete(`/trabajos/${id}`);
    return response.data;
  } catch (error: any) {
    console.error('Error en removeTrabajo:', error);
    throw error.response?.data || { ok: false, message: 'Error al eliminar el trabajo.' };
  }
};
