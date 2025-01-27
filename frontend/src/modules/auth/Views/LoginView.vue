<template>
  <!-- Contenedor principal -->
  <div class="flex items-center justify-center min-h-screen bg-gray-200">
    <!-- Tarjeta de Login -->
    <div class="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
      <!-- Título / Marca -->
      <div class="flex justify-center mb-6">
        <span class="text-3xl font-bold text-orange-600">OPTALVISION</span>
      </div>

      <!-- Formulario de Login -->
      <form @submit.prevent="onLogin" class="space-y-6">
        <!-- Campo: Nombre de Usuario -->
        <div>
          <label for="nombre_usuario" class="block text-sm font-medium text-gray-700 mb-1">
            Nombre de Usuario
          </label>
          <input
            v-model="myForm.nombre_usuario"
            ref="userInputRef"
            id="nombre_usuario"
            type="text"
            placeholder="Ingresa tu usuario"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-800 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
          />
        </div>

        <!-- Campo: Contraseña -->
        <div>
          <label for="contrasenha" class="block text-sm font-medium text-gray-700 mb-1">
            Contraseña
          </label>
          <input
            v-model="myForm.contrasenha"
            ref="passwordInputRef"
            id="contrasenha"
            type="password"
            placeholder="Ingresa tu contraseña"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-800 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
          />
        </div>

        <!-- Botón: Ingresar -->
        <div>
          <button
            type="submit"
            class="w-full px-4 py-2 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
          >
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
  if (myForm.nombre_usuario.trim() === '') {
    toast.warning('El nombre de usuario no puede estar vacío');
    userInputRef.value?.focus();
    return;
  }

  if (myForm.contrasenha.trim().length < 6) {
    toast.warning('La contraseña no puede estar vacía o ser menor a 6 caracteres');
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
        router.push('/admin/personal');
        break;
      case 'encargado-ventas':
        router.push('/ventas');
        break;
      case 'encargado-trabajos':
        router.push('/trabajos');
        break;
      case 'encargado-productos':
        router.push({ name: 'proveedoresProductos' });
        break;
      default:
        toast.error('Rol desconocido');
        authStore.logOut();
        router.push('/login');
    }
  } catch (error) {
    console.error(error);
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
