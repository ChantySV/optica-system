<!-- src/components/CompraPmpTable.vue -->

<template>
  <div class="bg-white p-6 rounded-lg shadow overflow-x-auto">
    <h2 class="text-2xl font-semibold text-gray-700 mb-4">Compras</h2>
    <div v-if="loading" class="text-center text-gray-500">Cargando datos de compras...</div>
    <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>
    <div v-else>
      <table class="min-w-full bg-white">
        <thead>
          <tr>
            <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
              Producto
            </th>
            <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
              Mes-Año
            </th>
            <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
              Fecha
            </th>
            <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
              Concepto
            </th>
            <th class="px-6 py-3 border-b-2 border-gray-300 text-right text-sm font-semibold text-gray-700 uppercase tracking-wider">
              Cantidad
            </th>
            <th class="px-6 py-3 border-b-2 border-gray-300 text-right text-sm font-semibold text-gray-700 uppercase tracking-wider">
              Valor Unidad
            </th>
            <th class="px-6 py-3 border-b-2 border-gray-300 text-right text-sm font-semibold text-gray-700 uppercase tracking-wider">
              Valor Total
            </th>
          </tr>
        </thead>
        <tbody>
          <template v-for="item in pmpData" :key="item.producto">
            <!-- Fila de Producto -->
            <tr>
              <td colspan="7" class="px-6 py-4 bg-gray-100 text-gray-800 font-bold">
                {{ item.producto }}
              </td>
            </tr>
            <!-- Fila de Mes-Año y Entradas -->
            <tr v-for="mes in item.meses" :key="mes.fecha">
              <td class="px-6 py-3 border-b border-gray-200"></td>
              <td class="px-6 py-3 border-b border-gray-200 font-semibold">
                {{ mes.fecha }}
              </td>
              <td colspan="5" class="px-6 py-3 border-b border-gray-200">
                <table class="min-w-full">
                  <thead>
                    <tr>

                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="entrada in mes.entradas" :key="entrada.fecha">
                      <td class="px-4 py-2 text-sm text-gray-700">{{ entrada.fecha }}</td>
                      <td class="px-4 py-2 text-sm text-gray-700">{{ entrada.concepto }}</td>
                      <td class="px-4 py-2 text-sm text-right text-gray-700">{{ entrada.cantidad }}</td>
                      <td class="px-4 py-2 text-sm text-right text-gray-700">{{ formatCurrency(entrada.valor_unidad) }}</td>
                      <td class="px-4 py-2 text-sm text-right text-gray-700">{{ formatCurrency(entrada.valor_total) }}</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </template>
        </tbody>
      </table>

      <!-- Paginación -->
      <div class="flex justify-between items-center mt-4">
        <button
          :disabled="currentPage === 1"
          @click="changePage(currentPage - 1)"
          class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Anterior
        </button>
        <span class="text-gray-700">Página {{ currentPage }} de {{ totalPages }}</span>
        <button
          :disabled="currentPage === totalPages || totalPages === 0"
          @click="changePage(currentPage + 1)"
          class="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 "
        >
          Siguiente
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PmpCompraData } from '../../interfaces/pmpResponse.interface';
import { computed } from 'vue';

const props = defineProps<{
  pmpData: PmpCompraData[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalItems: number;
}>();

const emit = defineEmits<{
  (e: 'page-change', newPage: number): void;
}>();

// Calcula el número total de páginas
const totalPages = computed(() => {
  return Math.ceil(props.totalItems / 10); // Asumiendo itemsPerPageCompra = 10
});

// Función para cambiar de página
const changePage = (newPage: number) => {
  if (newPage >= 1 && newPage <= totalPages.value) {
    emit('page-change', newPage);
  }
};

// Función para formatear valores monetarios
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(value);
};
</script>

<style scoped>
/* Estilos responsivos adicionales si es necesario */
@media (max-width: 768px) {
  table {
    font-size: 0.875rem;
  }
  th,
  td {
    padding: 0.5rem;
  }
}
</style>
