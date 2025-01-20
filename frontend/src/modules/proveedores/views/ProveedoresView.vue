<template>
  <div class="mb-20 container mx-auto p-6 space-y-6 bg-[#f5f6fa] rounded-lg ">
    <!-- Cabecera con título y botón -->
    <div class="flex flex-col sm:flex-row justify-between items-center">
      <h1 class="text-2xl font-semibold text-[#515151]">Proveedores</h1>
      <button
        @click="showModal = true"
        class="mt-4 sm:mt-0 px-6 py-2 bg-orange-500 text-white rounded-lg shadow-lg hover:bg-orange-600
               focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
      >
        Crear Proveedor
      </button>
    </div>

    <!-- Modal para Crear Proveedor -->
    <div v-if="showModal">
      <CreateProveedores
        :isOpen="showModal"
        @close="showModal = false"
      />
    </div>

    <!-- Lista de Proveedores -->
    <div class="bg-white p-4 rounded-lg shadow-sm">
      <ListaProveedores />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CreateProveedores from '../components/CreateProveedores.vue';
import ListaProveedores from '../components/ListaProveedores.vue';

const showModal = ref(false);
</script>
