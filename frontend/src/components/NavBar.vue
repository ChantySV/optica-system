<template>
  <!-- Barra de navegación superior -->
  <nav class="flex items-center justify-between bg-orange-500 px-5 py-2 text-white ">
    <!-- Sección Izquierda: Logo/Nombre de la App -->
    <div class="flex items-center space-x-3">
      <a href="/" class="text-2xl font-bold tracking-wide hover:opacity-90 transition-opacity">
        Óptica Visión
      </a>
    </div>

    <!-- Sección Derecha: Bienvenida, Notificaciones y Cerrar Sesión -->
    <div class="flex items-center space-x-6">
      <!-- Mensaje de Bienvenida (visible en pantallas grandes) -->
      <div v-if="username" class="hidden lg:block text-sm font-medium">
        Hola, <span class="font-semibold">{{ username }}</span>
      </div>

      <!-- Notificaciones con badge y dropdown -->
      <div class="relative">
        <button
          @click="showNotifications"
          class="flex items-center space-x-2 px-4 py-2 bg-orange-600 rounded-md shadow hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-white transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0a3.001 3.001 0 01-6 0m6 0H9" />
          </svg>
          <span>Notificaciones</span>
          <span
            v-if="unreadNotifications > 0"
            class="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 rounded-full"
          >
            {{ unreadNotifications }}
          </span>
        </button>

        <!-- Dropdown de notificaciones -->
        <ul
          v-if="notificationsVisible"
          class="absolute right-0 mt-2 w-64 bg-white text-gray-800 shadow-lg rounded-lg p-3 z-50"
        >
          <li
            v-for="(notification, index) in notifications"
            :key="index"
            class="text-sm py-2 px-3 hover:bg-gray-100 rounded-md transition-colors"
          >
            {{ notification }}
          </li>
          <li v-if="notifications.length === 0" class="text-sm text-gray-500 text-center py-2">
            No hay notificaciones
          </li>
        </ul>
      </div>

      <!-- Botón de Cerrar Sesión -->
      <button
        @click="logOut"
        class="px-4 py-2 font-semibold rounded-md bg-gray-700 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition-all"
      >
        Cerrar Sesión
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/modules/auth/stores/auth.store';

// Store de autenticación
const authStore = useAuthStore();

// Notificaciones simuladas (podrías reemplazarlas con datos de tu API)
const notifications = ref(['Nueva venta registrada', 'Producto con stock bajo']);
const unreadNotifications = ref(notifications.value.length);
const notificationsVisible = ref(false);

// Obtener el nombre de usuario
const username = authStore.user?.nombre_usuario || 'Usuario';

// Mostrar/Ocultar notificaciones
const showNotifications = () => {
  notificationsVisible.value = !notificationsVisible.value;
  if (notificationsVisible.value) {
    // Marcar como "leídas" al abrir el dropdown
    unreadNotifications.value = 0;
  }
};

// Cerrar sesión
const logOut = () => {
  authStore.logOut();
};
</script>
