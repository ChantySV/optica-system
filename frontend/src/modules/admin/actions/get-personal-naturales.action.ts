import { backendApi } from "@/api/backendApi";
import type { PersonalInterface } from "../interfaces/personal.interface";

export const getPersonalNaturalAction = async () => {
  try {
    const { data } = await backendApi.get<PersonalInterface[]>(`/personal/naturales`)
    //console.log(error);
    return data

  } catch (error) {
    console.log(error);
    throw new Error('Erro al obtener productos')
  }
}
