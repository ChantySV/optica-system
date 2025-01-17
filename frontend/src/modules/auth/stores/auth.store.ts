import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { AuthStatus } from '../interfaces/auth-status.enum';
import type { UserInterface } from '../interfaces/user.interface';
import { loginAction } from '../actions';
import { useLocalStorage } from '@vueuse/core';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'vue-router';

export const useAuthStore = defineStore('auth', () => {
  const authStatus = ref(AuthStatus.Checking);
  const user = ref<UserInterface | undefined>();
  const token = ref(useLocalStorage('token', ''));
  const router = useRouter();

  const isTokenValid = () => {
    try {
      const decodedToken = jwtDecode<{ exp: number }>(token.value || '');
      const now = Math.floor(Date.now() / 1000);
      return decodedToken.exp > now;
    } catch {
      return false;
    }
  };

  const loadUserFromToken = () => {
    if (token.value && isTokenValid()) {
      const decodedToken = jwtDecode<UserInterface>(token.value);
      user.value = decodedToken;
      authStatus.value = AuthStatus.Authenticated;
    } else {
      logOut();
    }
  };

  const login = async (nombre_usuario: string, contrasenha: string) => {
    try {
      const loginResponse = await loginAction(nombre_usuario, contrasenha);
      if (!loginResponse.ok) {
        logOut();
        return false;
      }
      user.value = loginResponse.user;
      token.value = loginResponse.token;
      authStatus.value = AuthStatus.Authenticated;

      // Redirigir según el rol
      const role = loginResponse.user.role.nombre_rol;
      if (role === 'admin') router.push('/admin');
      else if (role === 'encargado-ventas') router.push('/encargado-ventas');
      else if (role === 'encargado-trabajos') router.push('/encargado-trabajos');
      else if (role === 'encargado-productos') router.push('/encargado-productos');

      return true;
    } catch (error) {
      console.log(error);
      return logOut();
    }
  };

  const logOut = () => {
    authStatus.value = AuthStatus.Unauthenticated;
    user.value = undefined;
    token.value = '';
    localStorage.removeItem('token');
    router.push('/'); // Redirige al login
    return false;
  };

  loadUserFromToken();

  return {
    user,
    token,
    authStatus,

    // Getters
    isChecking: computed(() => authStatus.value === AuthStatus.Checking),
    isAuthenticated: computed(() => authStatus.value === AuthStatus.Authenticated),
    username: computed(() => user.value?.nombre_usuario),

    // Actions
    login,
    logOut,
  };
});
