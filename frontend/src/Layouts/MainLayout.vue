<template>
  <div class="flex h-screen bg-gray-100 overflow-hidden">
    <!-- SIDEBAR -->
    <aside class="fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300
             bg-[#252525] shadow-md flex flex-col overflow-hidden"
      :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full'">
      <!-- Encabezado con branding -->
      <div class="p-4 bg-[#252525] flex items-center space-x-3">
        <div class="w-10 h-10 bg-white rounded-full flex items-center justify-center">
          <span class="text-orange-500 font-bold text-lg">V</span>
        </div>
        <h1 class="text-lg font-bold text-white" v-if="sidebarOpen">
          Optica Visión
        </h1>
      </div>

      <!-- Menú de navegación -->
      <ul v-if="sidebarOpen" class="menu flex-1 p-4 space-y-3">
        <!-- Admin -->
        <li v-if="role === 'admin'">
          <router-link to="/admin" class="flex items-center px-3 py-2 rounded-md text-gray-300
                   hover:text-white hover:bg-orange-500 hover:scale-105
                   transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 10h11m-2-7h7v7M8 21h8m-4-4v4" />
            </svg>
            <span>Admin</span>
          </router-link>
        </li>

        <!-- Encargado de Ventas -->
        <li v-if="role === 'admin' || role === 'encargado-ventas'">
          <router-link to="/ventas" class="flex items-center px-3 py-2 rounded-md text-gray-300
                   hover:text-white hover:bg-orange-500 hover:scale-105
                   transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 14l6-6m0 0l-6-6m6 6H3" />
            </svg>
            <span>Ventas</span>
          </router-link>
        </li>

        <!-- Otros roles... -->
      </ul>

      <!-- Footer -->
      <div v-if="sidebarOpen" class="p-4 bg-[#252525] text-gray-400 text-sm border-t border-gray-600">
        <p>© 2025 V-Dashboard</p>
      </div>
    </aside>

    <!-- CONTENIDO PRINCIPAL -->
    <div :class="`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'
      }`">
      <!-- Navbar -->
      <nav class="flex items-center justify-between bg-orange-500 px-5 py-4 text-white shadow-md">
        <!-- Botón para alternar el Sidebar -->
        <button @click="toggleSidebar" class="text-white p-2 rounded hover:bg-orange-600
                 focus:outline-none focus:ring-2 focus:ring-white transition">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <!-- Elementos del Navbar -->
        <div class="flex items-center space-x-6">
          <!-- Mensaje de Bienvenida -->
          <div v-if="username" class="hidden lg:block text-sm font-medium">
            Hola, <span class="font-semibold">{{ username }}</span>
          </div>

          <!-- Notificaciones -->
          <div class="relative">
            <button @click="showNotifications" class="relative flex items-center space-x-2 px-4 py-2 bg-orange-600 rounded-md shadow
                     hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-white transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118
                     14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0
                     10-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0
                     .538-.214 1.055-.595 1.436L4 17h5m6 0a3.001 3.001
                     0 01-6 0m6 0H9" />
              </svg>
              <span>Notificaciones</span>
              <span v-if="unreadNotifications > 0"
                class="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 rounded-full">
                {{ unreadNotifications }}
              </span>
            </button>
          </div>

          <!-- Botón de Cerrar Sesión -->
          <button @click="logOut" class="px-4 py-2 font-semibold rounded-md bg-gray-700 hover:bg-red-600
                   focus:outline-none focus:ring-2 focus:ring-red-300 transition-all">
            Cerrar Sesión
          </button>
        </div>
      </nav>

      <!-- Contenido dinámico -->
      <!-- Contenedor dinámico con scroll -->
      <main class="mb-20 bg-[#f5f6fa] h-screen overflow-y-auto">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAuthStore } from '@/modules/auth/stores/auth.store';

// Sidebar abierto/cerrado
const sidebarOpen = ref(true);

// Función para alternar el Sidebar
const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};

// Store de autenticación
const authStore = useAuthStore();
const username = authStore.user?.nombre_usuario || 'Usuario';
const role = computed(() => authStore.user?.role.nombre_rol || 'guest');

// Notificaciones
const notifications = ref(['Nueva venta registrada', 'Producto con stock bajo']);
const unreadNotifications = ref(notifications.value.length);
const notificationsVisible = ref(false);

const showNotifications = () => {
  notificationsVisible.value = !notificationsVisible.value;
  if (notificationsVisible.value) unreadNotifications.value = 0;
};

const logOut = () => {
  authStore.logOut();
};
</script>
