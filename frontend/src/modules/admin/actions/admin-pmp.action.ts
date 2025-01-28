// src/actions/pmp.actions.ts

import {backendApi} from '@/api//backendApi';
import type { NetoPmp, PmpCompraData, PmpNetoData, PmpVentaData } from '../interfaces/pmpResponse.interface';

export const getPmpCompraData = async (
  searchQuery?: string,
  page: number = 1,
  limit: number = 10
): Promise<{ ok: boolean; data: PmpCompraData[]; total: number; message?: string }> => {
  try {
    const params: any = { page, limit };
    if (searchQuery) {
      params.search = searchQuery;
    }

    const response = await backendApi.get('/pmp/compra', { params });

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
    console.error('Error en getPmpCompraData:', error);
    return {
      ok: false,
      data: [],
      total: 0,
      message: error.response?.data?.message || 'No se pudo cargar la información de PMP Compra.',
    };
  }
};

export const getPmpVentaData = async (
  searchQuery?: string,
  page: number = 1,
  limit: number = 10
): Promise<{ ok: boolean; data: PmpVentaData[]; total: number; message?: string }> => {
  try {
    const params: any = { page, limit };
    if (searchQuery) {
      params.search = searchQuery;
    }

    const response = await backendApi.get('/pmp/venta', { params });

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
    console.error('Error en getPmpVentaData:', error);
    return {
      ok: false,
      data: [],
      total: 0,
      message: error.response?.data?.message || 'No se pudo cargar la información de PMP Venta.',
    };
  }
};

export const getPmpNetoData = async (
  searchQuery?: string,
  page: number = 1,
  limit: number = 10
): Promise<{ ok: boolean; data: NetoPmp[]; total: number; message?: string }> => {
  try {
    const params: any = { page, limit };
    if (searchQuery) {
      params.search = searchQuery;
    }

    const response = await backendApi.get('/pmp/neto', { params });

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
    console.error('Error en getPmpNetoData:', error);
    return {
      ok: false,
      data: [],
      total: 0,
      message: error.response?.data?.message || 'No se pudo cargar la información de PMP Neto.',
    };
  }
};
