import { backendApi } from "@/api/backendApi";
import type { PersonalInterface } from "../interfaces/personal.interface";

export const getPersonalJuridicoAction = async (page: number = 0  , limit: number = 10) => {
  try {
    const { data } = await backendApi.get<PersonalInterface[]>(`/personal/juridicos?limit=${limit}&offset=${page}`)
    console.log(data);
    return data

  } catch (error) {
    console.log(error);
    throw new Error('Erro al obtener productos')
  }
}
