<script setup lang="ts">
import ListaProductos from '../components/ListaProductos.vue';
import AddProductModal from '../components/CreateProductos.vue';
import { ref } from 'vue';

const isModalOpen = ref(false);

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const refreshList = () => {

};
</script>

<template>
  <div class="mb-20 container mx-auto p-6 space-y-6 bg-[#f5f6fa] rounded-lg ">
    <div class="flex flex-col sm:flex-row justify-between items-center">
      <h1 class="text-2xl font-semibold text-[#515151]">Productos</h1>
      <button
        @click="openModal"
        class="mt-4 sm:mt-0 px-6 py-2 bg-orange-500 text-white rounded-lg shadow-lg hover:bg-orange-600
               focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
      >
        Agregar Producto
      </button>
    </div>

    <div class="bg-white p-4 rounded-lg shadow-sm">
      <ListaProductos />
    </div>

    <AddProductModal
      v-if="isModalOpen"
      :is-open="isModalOpen"
      @close="closeModal"
      @refresh="refreshList"
    />
  </div>
</template>
