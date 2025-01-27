<script setup lang="ts">
import { ref } from 'vue';
import ListaPersonalJuridico from '../components/ListaPersonalJuridico.vue';
import CreatePersonaModal from '../components/CreatePersonal.vue';
import ListaPersonalNatural from '../components/ListaPersonalNatural.vue';

// Estado para controlar la visibilidad del modal de creación
const showCreateModal = ref(false);

// Función para abrir el modal
const openCreateModal = () => {
  showCreateModal.value = true;
};

// Función para cerrar el modal
const closeCreateModal = () => {
  showCreateModal.value = false;
};

// Refs separados para las dos listas
const listaPersonalJuridicoRef = ref<InstanceType<typeof ListaPersonalJuridico> | null>(null);
const listaPersonalNaturalRef = ref<InstanceType<typeof ListaPersonalNatural> | null>(null);

// Función para manejar el evento 'created' emitido por el modal
const handleCreated = () => {
  // Recargar ambas listas
  listaPersonalJuridicoRef.value?.reloadData();
  listaPersonalNaturalRef.value?.reloadData();
  closeCreateModal();
};
</script>

<template>
  <div class="container mx-auto mt-8 p-6 bg-gray-50 rounded-lg shadow-md space-y-6 mb-20">
    <!-- Botón de Crear -->
    <div class="flex justify-end">
      <button
        @click="openCreateModal"
        class="px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 focus:outline-none  transition-all"
      >
        Crear Persona
      </button>
    </div>

    <!-- Lista de Personal Jurídico -->
    <div class="bg-white p-4 rounded-lg shadow-sm">
      <h2 class="text-xl font-bold text-gray-800 mb-4">Lista de Personal Jurídico</h2>
      <ListaPersonalJuridico ref="listaPersonalJuridicoRef" />
    </div>

    <!-- Lista de Personal Natural -->
    <div class="bg-white p-4 rounded-lg">
      <h2 class="text-xl font-bold text-gray-800 mb-4">Lista de Personal Natural</h2>
      <ListaPersonalNatural ref="listaPersonalNaturalRef" />
    </div>

    <!-- Modal de Creación de Personal -->
    <CreatePersonaModal
      v-if="showCreateModal"
      @close="closeCreateModal"
      @created="handleCreated"
    />
  </div>
</template>
