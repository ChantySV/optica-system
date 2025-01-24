<template>
  <div class="mb-20 container mx-auto p-6 space-y-6 bg-[#f5f6fa] rounded-lg">
    <!-- Cabecera con título y botón para crear trabajo -->
    <div class="flex flex-col sm:flex-row justify-between items-center">
      <h1 class="text-2xl font-semibold text-[#515151]">Trabajos</h1>
      <button
        @click="showModal = true"
        class="mt-4 sm:mt-0 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Agregar Trabajo
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
    <div class="bg-white p-4 rounded-lg shadow-sm">
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
  // Opcional: Puedes agregar lógica para actualizar la lista de trabajos si no se hace automáticamente
};
</script>

<style scoped>
/* Puedes agregar estilos adicionales aquí si es necesario */
</style>
