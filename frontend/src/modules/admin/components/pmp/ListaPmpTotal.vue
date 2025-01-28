<!-- src/components/NetoPmpTable.vue -->

<template>
  <div class="bg-white p-6 rounded-lg shadow overflow-x-auto">
    <h2 class="text-2xl font-semibold text-gray-700 mb-4">Neto PMP</h2>
    <div v-if="loading" class="text-center text-gray-500">Cargando datos netos...</div>
    <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>
    <div v-else>
      <table class="min-w-full bg-white">
        <thead>
          <tr>
            <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
              Mes-Año
            </th>
            <th class="px-6 py-3 border-b-2 border-gray-300 text-right text-sm font-semibold text-gray-700 uppercase tracking-wider">
              Compras
            </th>
            <th class="px-6 py-3 border-b-2 border-gray-300 text-right text-sm font-semibold text-gray-700 uppercase tracking-wider">
              Ventas
            </th>
            <th class="px-6 py-3 border-b-2 border-gray-300 text-right text-sm font-semibold text-gray-700 uppercase tracking-wider">
              Compras Totales
            </th>
            <th class="px-6 py-3 border-b-2 border-gray-300 text-right text-sm font-semibold text-gray-700 uppercase tracking-wider">
              Ventas Totales
            </th>
            <th class="px-6 py-3 border-b-2 border-gray-300 text-right text-sm font-semibold text-gray-700 uppercase tracking-wider">
              Balance Neto
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in pmpData" :key="item.mesAno" class="hover:bg-gray-50">
            <td class="px-6 py-4 text-sm text-gray-700">{{ item.mesAno }}</td>
            <td class="px-6 py-4 text-sm text-right text-gray-700">{{ item.compras }}</td>
            <td class="px-6 py-4 text-sm text-right text-gray-700">{{ item.ventas }}</td>
            <td class="px-6 py-4 text-sm text-right text-gray-700">{{ formatCurrency(item.comprasTotales) }}</td>
            <td class="px-6 py-4 text-sm text-right text-gray-700">{{ formatCurrency(item.ventasTotales) }}</td>
            <td class="px-6 py-4 text-sm text-right text-gray-700">
              <span :class="{'text-green-500': item.balanceNeto >= 0, 'text-red-500': item.balanceNeto < 0}">
                {{ formatCurrency(item.balanceNeto) }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Paginación -->
      <div class="flex justify-between items-center mt-4">
        <button
          :disabled="currentPage === 1"
          @click="changePage(currentPage - 1)"
          class="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:cursor-not-allowed"
        >
          Anterior
        </button>
        <span class="text-gray-700">Página {{ currentPage }} de {{ totalPages }}</span>
        <button
          :disabled="currentPage === totalPages || totalPages === 0"
          @click="changePage(currentPage + 1)"
          class="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:cursor-not-allowed"
        >
          Siguiente
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NetoPmp } from '../../interfaces/pmpResponse.interface';
import { computed } from 'vue';

const props = defineProps<{
  pmpData: NetoPmp[];
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
  return Math.ceil(props.totalItems / 10); // Asumiendo itemsPerPage = 10
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
