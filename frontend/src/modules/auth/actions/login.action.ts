import { backendApi } from "@/api/backendApi"
import type { AuthResponse } from "../interfaces/AuthResponse"
import { isAxiosError } from "axios"
import type { UserInterface } from "../interfaces/user.interface"

interface LoginError {
  ok: false,
  message: string
}

interface LoginSuccess {
  ok: true,
  user: UserInterface
  token: string
}


export const loginAction = async (nombre_usuario: string, contrasenha: string): Promise<LoginError | LoginSuccess> => {
  try {

    const { data } = await backendApi.post<AuthResponse>('/usuarios/sign-up', {
      nombre_usuario,
      contrasenha,
    })

    return {
      ok: true,
      user: data.user,
      token: data.token
    }

  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401 || 400) {
      return {
        ok: false,
        message: 'Credenciales Incorrectas'
      }
    }
    console.log(error);
    throw new Error('No se pudo realizar la peticion')
  }
}
