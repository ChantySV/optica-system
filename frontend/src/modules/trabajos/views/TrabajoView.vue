<template>
  <div class="mb-20 container mx-auto p-6 space-y-6 bg-[#f5f6fa] rounded-lg ">
    <!-- Cabecera con título y botón para crear trabajo -->
    <div class="flex flex-col sm:flex-row justify-between items-center  pb-4 mb-6">
      <h1 class="text-2xl font-bold text-[#515151]">Gestión de Trabajos</h1>
      <button
        @click="showModal = true"
        class="mt-4 sm:mt-0 px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
      >
        + Agregar Trabajo
      </button>
    </div>

    <!-- Modal para Crear Trabajo -->
    <div v-if="showModal">
      <CreateTrabajos
        :isOpen="showModal"
        @close="showModal = false"
        @trabajo-creado="handleTrabajoCreado"
      />
    </div>

    <!-- Lista de Trabajos -->
    <div class="bg-white p-6 rounded-lg shadow-md">
      <ListaTrabajos />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ListaTrabajos from '../components/ListaTrabajos.vue';
import CreateTrabajos from '../components/CreateTrabajo2.vue';

// Estado para controlar la apertura del modal
const showModal = ref(false);

// Método para manejar la creación de un nuevo trabajo
const handleTrabajoCreado = () => {
  showModal.value = false;
};
</script>
