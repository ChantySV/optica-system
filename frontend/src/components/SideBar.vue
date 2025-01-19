<template>
  <aside class="h-screen w-64 bg-[#515151] shadow-md flex flex-col">
    <!-- Encabezado con branding -->
    <div class="p-4 bg-orange-500 flex items-center space-x-3">
      <div class="w-10 h-10 bg-white rounded-full flex items-center justify-center">
        <span class="text-orange-500 font-bold text-lg">V</span>
      </div>
      <h1 class="text-lg font-bold text-white">Optica Visión</h1>
    </div>

    <!-- Menú de navegación -->
    <ul class="menu flex-1 p-4 space-y-3">
      <!-- Admin -->
      <li v-if="role === 'admin'">
        <router-link
          to="/admin"
          class="flex items-center px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-orange-500 hover:scale-105 transition-all duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 10h11m-2-7h7v7M8 21h8m-4-4v4" />
          </svg>
          <span>Admin</span>
        </router-link>
      </li>

      <!-- Encargado de Ventas -->
      <li v-if="role === 'admin' || role === 'encargado-ventas'">
        <router-link
          to="/ventas"
          class="flex items-center px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-orange-500 hover:scale-105 transition-all duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 14l6-6m0 0l-6-6m6 6H3" />
          </svg>
          <span>Ventas</span>
        </router-link>
      </li>

      <!-- Encargado de Trabajos -->
      <li v-if="role === 'admin' || role === 'encargado-trabajos'">
        <router-link
          to="/trabajos"
          class="flex items-center px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-orange-500 hover:scale-105 transition-all duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 8v8m-4-4h8" />
          </svg>
          <span>Trabajos</span>
        </router-link>
      </li>

      <!-- Encargado de Productos -->
      <li v-if="role === 'admin' || role === 'encargado-productos'">
        <router-link
          to="/productos"
          class="flex items-center px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-orange-500 hover:scale-105 transition-all duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 10h11M9 3h7v7m-4 10h8m-4-4v4" />
          </svg>
          <span>Productos</span>
        </router-link>
      </li>
    </ul>

    <!-- Footer con detalles adicionales -->
    <div class="p-4 bg-[#414141] text-gray-400 text-sm border-t border-gray-600">
      <p>© 2025 V-Dashboard</p>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '@/modules/auth/stores/auth.store'

// Accede al rol del usuario desde el auth store
const authStore = useAuthStore()
const role = computed(() => authStore.user?.role.nombre_rol || 'guest')
</script>
