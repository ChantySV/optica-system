import { backendApi } from '@/api/backendApi';
import type { PmpResponse } from '../interfaces/Pmp.type'

export const getPmp = async (
  tipo: string,
  searchQuery: string,
  page: number = 1,
  limit: number = 10
): Promise<PmpResponse> => {
  try {
    const queryParams = new URLSearchParams({
      tipo,
      searchQuery,
      page: String(page),
      limit: String(limit),
    });

    const response = await backendApi.get(`/pmp/pmpData?${queryParams.toString()}`);

    return {
      ok: true,
      data: response.data.data,
      total: response.data.total,
      currentPage: page,
      totalPages: Math.ceil(response.data.total / limit),
    };
  } catch (error) {
    console.error('Error en getPmp:', error);
    return { ok: false, data: [], total: 0, currentPage: page, totalPages: 0 };
  }
};
