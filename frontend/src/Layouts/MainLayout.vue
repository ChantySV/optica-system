<template>
  <div class="flex h-screen bg-gray-100 overflow-hidden">
    <!-- SIDEBAR -->
    <aside
      class="fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300
             bg-[#252525] shadow-md flex flex-col overflow-hidden"
      :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <!-- Encabezado con branding -->
      <div class="p-4 bg-[#252525] flex items-center space-x-3">
        <div class="w-10 h-10 bg-white rounded-full flex items-center justify-center">
          <span class="text-orange-500 font-bold text-lg">V</span>
        </div>
        <h1 class="text-lg font-bold text-white" v-if="sidebarOpen">OptalVision</h1>
      </div>

      <!-- Menú de navegación -->
      <ul v-if="sidebarOpen" class="menu flex-1 p-4 space-y-3">
        <!-- Admin Usuarios -->
        <li v-if="isAdmin">
          <router-link
            to="/admin/personal"
            class="flex items-center px-3 py-2 rounded-md text-gray-300
                   hover:text-white hover:bg-orange-500 hover:scale-105
                   transition-all duration-300"
          >
            <icon-file-invoice class="h-5 w-5 mr-3" />
            <span>Personal</span>
          </router-link>
        </li>

        <!-- Admin Usuarios -->
        <li v-if="isAdmin">
          <router-link
            to="/admin/usuarios"
            class="flex items-center px-3 py-2 rounded-md text-gray-300
                   hover:text-white hover:bg-orange-500 hover:scale-105
                   transition-all duration-300"
          >
          <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="19"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-stars"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17.8 19.817l-2.172 1.138a.392 .392 0 0 1 -.568 -.41l.415 -2.411l-1.757 -1.707a.389 .389 0 0 1 .217 -.665l2.428 -.352l1.086 -2.193a.392 .392 0 0 1 .702 0l1.086 2.193l2.428 .352a.39 .39 0 0 1 .217 .665l-1.757 1.707l.414 2.41a.39 .39 0 0 1 -.567 .411l-2.172 -1.138z" /><path d="M6.2 19.817l-2.172 1.138a.392 .392 0 0 1 -.568 -.41l.415 -2.411l-1.757 -1.707a.389 .389 0 0 1 .217 -.665l2.428 -.352l1.086 -2.193a.392 .392 0 0 1 .702 0l1.086 2.193l2.428 .352a.39 .39 0 0 1 .217 .665l-1.757 1.707l.414 2.41a.39 .39 0 0 1 -.567 .411l-2.172 -1.138z" /><path d="M12 9.817l-2.172 1.138a.392 .392 0 0 1 -.568 -.41l.415 -2.411l-1.757 -1.707a.389 .389 0 0 1 .217 -.665l2.428 -.352l1.086 -2.193a.392 .392 0 0 1 .702 0l1.086 2.193l2.428 .352a.39 .39 0 0 1 .217 .665l-1.757 1.707l.414 2.41a.39 .39 0 0 1 -.567 .411l-2.172 -1.138z" /></svg>
            <span>Usuarios</span>
          </router-link>
        </li>

        <!-- Admin Varios -->
        <li v-if="isAdmin">
          <router-link
            to="/admin/varios"
            class="flex items-center px-3 py-2 rounded-md text-gray-300
                   hover:text-white hover:bg-orange-500 hover:scale-105
                   transition-all duration-300"
          >
          <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="19"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-spiral"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 12.057a1.9 1.9 0 0 0 .614 .743c1.06 .713 2.472 .112 3.043 -.919c.839 -1.513 -.022 -3.368 -1.525 -4.08c-2 -.95 -4.371 .154 -5.24 2.086c-1.095 2.432 .29 5.248 2.71 6.246c2.931 1.208 6.283 -.418 7.438 -3.255c1.36 -3.343 -.557 -7.134 -3.896 -8.41c-3.855 -1.474 -8.2 .68 -9.636 4.422c-1.63 4.253 .823 9.024 5.082 10.576c4.778 1.74 10.118 -.941 11.833 -5.59a9.354 9.354 0 0 0 .577 -2.813" /></svg>
            <span>Varios</span>
          </router-link>
        </li>

        <li v-if="isAdmin">
          <router-link
            to="/admin/pmp"
            class="flex items-center px-3 py-2 rounded-md text-gray-300
                   hover:text-white hover:bg-orange-500 hover:scale-105
                   transition-all duration-300"
          >
<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="19"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-brand-speedtest"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5.636 19.364a9 9 0 1 1 12.728 0" /><path d="M16 9l-4 4" /></svg>
            <span>Rendimiento</span>
          </router-link>
        </li>

        <!-- Encargado de Ventas -->
        <li v-if="isAdmin || permissions.includes('encargado-ventas')">
          <router-link
            to="/ventas"
            class="flex items-center px-3 py-2 rounded-md text-gray-300
                   hover:text-white hover:bg-orange-500 hover:scale-105
                   transition-all duration-300"
          >
            <icon-shopping-cart class="h-5 w-5 mr-3" />
            <span>Ventas</span>
          </router-link>
        </li>

        <!-- Encargado de Productos -->
        <li v-if="isAdmin || permissions.includes('encargado-productos')">
          <router-link
            to="/proveedores"
            class="flex items-center px-3 py-2 rounded-md text-gray-300
                   hover:text-white hover:bg-orange-500 hover:scale-105
                   transition-all duration-300"
          >
            <icon-users class="h-5 w-5 mr-3" />
            <span>Proveedores</span>
          </router-link>
        </li>

        <li v-if="isAdmin || permissions.includes('encargado-productos')">
          <router-link
            to="/productos"
            class="flex items-center px-3 py-2 rounded-md text-gray-300
                   hover:text-white hover:bg-orange-500 hover:scale-105
                   transition-all duration-300"
          >
            <icon-package class="h-5 w-5 mr-3" />
            <span>Productos</span>
          </router-link>
        </li>

        <li v-if="isAdmin || permissions.includes('encargado-trabajos')">
          <router-link
            to="/trabajos"
            class="flex items-center px-3 py-2 rounded-md text-gray-300
                   hover:text-white hover:bg-orange-500 hover:scale-105
                   transition-all duration-300"
          >
            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="19"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-briefcase"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 7m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" /><path d="M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2" /><path d="M12 12l0 .01" /><path d="M3 13a20 20 0 0 0 18 0" /></svg>
            <span>Trabajos</span>
          </router-link>
        </li>
      </ul>

      <!-- Footer -->
      <div v-if="sidebarOpen" class="p-4 bg-[#252525] text-gray-400 text-sm border-t border-gray-600">
        <p>© 2025 OptalVision</p>
      </div>
    </aside>

    <!-- CONTENIDO PRINCIPAL -->
    <div :class="`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`">
      <!-- Navbar -->
      <nav class="flex items-center justify-between bg-orange-500 px-5 py-4 text-white shadow-md">
        <!-- Botón para alternar el Sidebar -->
        <button
          @click="toggleSidebar"
          class="text-white p-2 rounded hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-white transition"
        >
          <icon-menu-2 class="h-6 w-6" />
        </button>

        <div class="flex items-center space-x-6">
          <div v-if="username" class="hidden lg:block text-sm font-medium">
            Hola, <span class="font-semibold">{{ username }}</span>
          </div>
          <button
            @click="logOut"
            class="px-4 py-2 font-semibold rounded-md bg-gray-700 hover:bg-white focus:outline-none focus:ring-2 focus:ring-red-300 hover:text-gray-700 transition-all "
          >
            Cerrar Sesión
          </button>
        </div>
      </nav>

      <!-- Contenido dinámico -->
      <main class="mb-20 bg-[#f5f6fa] h-screen overflow-y-auto">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAuthStore } from '@/modules/auth/stores/auth.store';

// Importación de íconos de Tabler Icons
import {
  IconFileInvoice,
  IconShoppingCart,
  IconUsers,
  IconPackage,
  IconMenu2,
} from "@tabler/icons-vue";

const sidebarOpen = ref(true);

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};

const authStore = useAuthStore();
const username = authStore.user?.nombre_usuario || 'Usuario';

// Obtener permisos desde el JWT o store
const permissions = computed(() => authStore.user?.role.nombre_rol || []);

// Verificar si el usuario es admin
const isAdmin = computed(() => authStore.user?.role.nombre_rol === 'admin');

// Logout
const logOut = () => {
  authStore.logOut();
};
</script>
