<script setup lang="ts">
import { ref } from 'vue';
import ListaVentas from '../components/ListaVentas.vue';
import AddVentaModal from '../components/CreateVenta.vue';

// Control del estado del modal
const showAddVentaModal = ref(false);
const listaVentasRef = ref<InstanceType<typeof ListaVentas> | null>(null);

// Función para abrir/cerrar el modal
const openAddVentaModal = () => showAddVentaModal.value = true;
const closeAddVentaModal = () => showAddVentaModal.value = false;
</script>

<template>
  <div class="container mx-auto mt-8 p-6 bg-gray-50 rounded-lg shadow-md">
    <!-- Cabecera -->
    <div class="flex flex-col sm:flex-row justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Gestión de Ventas</h1>
      <button @click="openAddVentaModal"
        class="mt-4 sm:mt-0 px-6 py-2 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 focus:outline-none ">
        Crear Venta
      </button>
    </div>

    <!-- Lista de Ventas -->
    <div class="bg-white p-4 rounded-lg shadow-sm">
      <ListaVentas ref="listaVentasRef" />
    </div>

    <!-- Modal para Crear Venta -->
<AddVentaModal
  v-if="showAddVentaModal"
  :isOpen="showAddVentaModal"
  @close="closeAddVentaModal"
  @ventaCreada="listaVentasRef?.value?.loadVentas()"
/>
  </div>
</template>
