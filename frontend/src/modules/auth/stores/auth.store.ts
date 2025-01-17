import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { AuthStatus } from '../interfaces/auth-status.enum'
import type { UserInterface } from '../interfaces/user.interface';
import { loginAction } from '../actions';
import { useLocalStorage } from '@vueuse/core';

export const useAuthStore = defineStore('auth', () => {

  const authStatus = ref(AuthStatus.Checking);
  const user = ref<UserInterface | undefined>()
  const token = ref(useLocalStorage('token',''))

  const login = async (nombre_usuario: string, contrasenha: string) => {
    try {
      const loginResponse = await loginAction(nombre_usuario, contrasenha)
      if (!loginResponse.ok) {
        logOut()
        return false
      }
      user.value = loginResponse.user
      token.value = loginResponse.token
      authStatus.value = AuthStatus.Authenticated

      return true
    } catch (error) {
      console.log(error);
      return logOut
    }
  }

  const logOut = () => {
    authStatus.value = AuthStatus.Unauthenticated
    user.value = undefined
    token.value = ''
    return false
  }

  return {
    user,
    token,
    authStatus,

    //Getters
    isChecking: computed(() => authStatus.value === AuthStatus.Checking),
    isAuthenticated: computed(() => authStatus.value === AuthStatus.Authenticated),
    username: computed(() => user.value?.nombre_usuario),

    //
    login,

  }
})
