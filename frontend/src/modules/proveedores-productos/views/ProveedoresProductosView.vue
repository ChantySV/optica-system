<template>
  <div class="p-6 bg-[f5f6fa] shadow-xl rounded-lg">
    <!-- Botón Crear Proveedor -->
    <div class="flex justify-end mb-4">
      <button
        @click="showModal = true"
        class="px-6 py-2 font-semibold text-white bg-[#FE5E00] rounded-md shadow-lg hover:bg-[#dc5400] focus:outline-none focus:ring-2 focus:ring-[#FE5E00] transition-all"
      >
        Crear Proveedor
      </button>
    </div>

    <!-- Modal de Crear Proveedor -->
    <CreateProveedores
      :isOpen="showModal"
      @close="showModal = false"
    />

    <!-- Lista de Proveedores -->
     <div class="mb-20">
      <ListaProveedores />
     </div>
     <div>

     </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CreateProveedores from '../components/CreateProveedores.vue';
import ListaProveedores from '../components/ListaProveedores.vue';
import UpdateProveedores from '../components/UpdateProveedores.vue';

const showModal = ref(false);
</script>
