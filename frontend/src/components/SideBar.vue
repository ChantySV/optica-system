<template>
  <aside class="w-64 h-screen bg-gray-800 text-white">
    <nav class="mt-10">
      <!-- Admin Section -->
      <template v-if="isAdmin">
        <SidebarLink label="Admin Dashboard" route="/admin" icon="home" />
      </template>

      <!-- Encargado Ventas Section -->
      <template v-if="isAdmin || isEncargadoVentas">
        <SidebarLink label="Ventas" route="/ventas" icon="shopping-cart" />
      </template>

      <!-- Encargado Trabajos Section -->
      <template v-if="isAdmin || isEncargadoTrabajos">
        <SidebarLink label="Trabajos" route="/trabajos" icon="tool" />
      </template>

      <!-- Encargado Productos Section -->
      <template v-if="isAdmin || isEncargadoProductos">
        <SidebarLink label="Productos" route="/productos" icon="box" />
      </template>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth.store'
import SidebarLink from './SidebarLink.vue'

const authStore = useAuthStore()

// Roles control
const isAdmin = computed(() => authStore.user?.role === 'admin')
const isEncargadoVentas = computed(() => authStore.user?.role === 'encargado-ventas')
const isEncargadoTrabajos = computed(() => authStore.user?.role === 'encargado-trabajos')
const isEncargadoProductos = computed(() => authStore.user?.role === 'encargado-productos')
</script>
