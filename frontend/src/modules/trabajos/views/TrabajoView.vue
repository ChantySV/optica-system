<script setup lang="ts">
import ListaTrabajos from '../components/ListaTrabajos.vue';
import AgregarTrabajoModal from '../components/CreateTrabajo.vue';
import { ref } from 'vue';

const showModal = ref(false);

const handleTrabajoCreado = () => {
  showModal.value = false;
};
</script>

<template>
  <div class="container mx-auto p-6 space-y-6 bg-gray-100 rounded-lg shadow-lg">
    <!-- Título y Botón -->
    <div class="flex flex-col sm:flex-row justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-800">Gestión de Trabajos</h1>
      <button
        @click="showModal = true"
        class="mt-4 sm:mt-0 px-6 py-2 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
      >
        Agregar Nuevo Trabajo
      </button>
    </div>

    <!-- Lista de Trabajos -->
    <div class="bg-white p-4 rounded-lg shadow">
      <ListaTrabajos />
    </div>

    <!-- Modal para Agregar Trabajo -->
    <AgregarTrabajoModal
      v-if="showModal"
      :isOpen="showModal"
      @close="showModal = false"
      @trabajo-creado="handleTrabajoCreado"
    />
  </div>
</template>
