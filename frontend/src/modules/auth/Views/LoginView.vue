<template>
  <div class="flex items-center justify-center h-screen px-6 bg-gray-200">
    <div class="w-full max-w-sm p-6 bg-white rounded-md shadow-md">
      <div class="flex items-center justify-center">
        <span class="text-2xl font-semibold text-gray-700">Optica Visión</span>
      </div>

      <form class="mt-4" @submit.prevent="onLogin">
        <label class="block">
          <span class="text-sm text-gray-700">Nombre de Usuario</span>
          <input v-model="myForm.nombre_usuario" ref="userInputRef" id="nombre_usuario" type="text"
            class="block w-full mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500">
        </label>

        <label class="block mt-3">
          <span class="text-sm text-gray-700">Contraseña</span>
          <input v-model="myForm.contrasenha" ref="passwordInputRef" id="contrasenha" type="password"
            class="block w-full mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500">
        </label>
        <div class="mt-6">
          <button type="submit"
            class="w-full px-4 py-2 text-sm text-center text-white bg-indigo-600 rounded-md focus:outline-none hover:bg-indigo-500">
            Ingresar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth.store';
import { useToast } from 'vue-toastification';
import { jwtDecode } from 'jwt-decode';

const router = useRouter();
const toast = useToast();
const authStore = useAuthStore();
const userInputRef = ref<HTMLInputElement | null>(null);
const passwordInputRef = ref<HTMLInputElement | null>(null);

const myForm = reactive({
  nombre_usuario: '',
  contrasenha: '',
});

const onLogin = async () => {
  if (myForm.nombre_usuario.length <= 0) {
    toast.warning('El nombre de usuario no puede estar vacío');
    userInputRef.value?.focus();
    return;
  }

  if (myForm.contrasenha.length < 6) {
    toast.warning('La contraseña no puede estar vacía');
    passwordInputRef.value?.focus();
    return;
  }

  const ok = await authStore.login(myForm.nombre_usuario, myForm.contrasenha);

  if (!ok) {
    toast.error('Credenciales Incorrectas');
    return;
  }

  try {
    if (!authStore.token) {
      toast.error('Token no disponible. Por favor, inicia sesión nuevamente.');
      authStore.logOut();
      return;
    }

    const decodedToken: { role: string } = jwtDecode(authStore.token);
    const userRole = decodedToken.role;

    switch (userRole) {
      case 'admin':
        router.push('/admin');
        break;
      case 'encargado-ventas':
        router.push('/ventas');
        break;
      case 'encargado-trabajos':
        router.push('/trabajos');
        break;
      case 'encargado-productos':
        router.push('/productos');
        break;
      default:
        toast.error('Rol desconocido');
        authStore.logOut();
        router.push('/login');
    }
  } catch (error) {
    console.log(error);
    toast.error('Por favor, inicia sesión nuevamente.');
    authStore.logOut();
  }
};

onMounted(() => {
  if (authStore.isAuthenticated) {
    onLogin();
  }
});
</script>
