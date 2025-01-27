<template>
  <div class="container mx-auto mt-8 bg-gray-50 p-6 rounded-lg shadow-md">
    <!-- Título -->
    <h1 class="text-3xl font-bold text-gray-700 mb-6 text-center">Lista de Ventas</h1>

    <!-- Barra de búsqueda -->
    <div class="flex flex-wrap items-center gap-4 mb-6">
      <input type="text" v-model="searchQuery" placeholder="Buscar por nombres del personal"
        class="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none" />
      <button @click="onSearch"
        class="px-6 py-2 bg-orange-500 text-white font-medium rounded-lg shadow hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400">
        Buscar
      </button>
      <button v-if="searchQuery" @click="resetSearch"
        class="px-6 py-2 bg-gray-300 text-gray-700 font-medium rounded-lg shadow hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400">
        Limpiar
      </button>
    </div>

    <!-- Mensajes de carga y error -->
    <div v-if="loading" class="text-center text-gray-500 text-lg">Cargando ventas...</div>
    <div v-else-if="error" class="text-center text-red-500 text-lg">{{ error }}</div>

    <!-- Tabla de ventas -->
    <div v-else class="overflow-x-auto">
      <table class="w-full table-auto bg-white rounded-lg shadow-md">
        <thead class="bg-gray-100 text-gray-700 uppercase text-sm">
          <tr>
            <th class="px-6 py-3 text-left cursor-pointer hover:underline" @click="sortBy('fecha_venta')">
              Fecha Venta
              <span v-if="sortField === 'fecha_venta'">
                <span v-if="sortOrder === 'ASC'">▲</span>
                <span v-else>▼</span>
              </span>
            </th>
            <th class="px-6 py-3 text-left cursor-pointer hover:underline" @click="sortBy('monto_total')">
              Monto Total
              <span v-if="sortField === 'monto_total'">
                <span v-if="sortOrder === 'ASC'">▲</span>
                <span v-else>▼</span>
              </span>
            </th>
            <th class="px-6 py-3 text-left">Usuario</th>
            <th class="px-6 py-3 text-left">Comprador</th>
            <th class="px-6 py-3 text-center">Detalle</th>
            <th class="px-6 py-3 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="venta in ventas" :key="venta.id_venta"
            class="border-b last:border-none hover:bg-gray-100 transition-colors">
            <td class="px-6 py-3 text-gray-700">{{ formatDate(venta.fecha_venta) }}</td>
            <td class="px-6 py-3 text-gray-700 font-semibold">${{ venta.monto_total }}</td>
            <td class="px-6 py-3 text-gray-700">{{ venta.usuario }}</td>
            <td class="px-6 py-3 text-gray-700">{{ venta.personal }}</td>
            <td class="px-6 py-3 text-center">
              <button @click="openDetalleModal(venta.id_venta)"
                class="px-4 py-2 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 ">
                Ver Detalle
              </button>
            </td>
            <td class="px-6 py-3 text-center">
              <button @click="openUpdateModal(venta)"
                class="px-4 py-2 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500">
                Actualizar
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Paginación -->
      <div class="flex justify-between items-center mt-6">
        <button :disabled="currentPage === 1" @click="goToPreviousPage"
          class="px-4 py-2 bg-orange-500 text-white rounded-lg shadow hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-orange-400">
          Anterior
        </button>
        <span class="text-gray-700 font-medium">Página {{ currentPage }}</span>
        <button :disabled="!hasNextPage" @click="goToNextPage"
          class="px-4 py-2 bg-orange-500 text-white rounded-lg shadow hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-orange-400">
          Siguiente
        </button>
      </div>
    </div>

    <!-- Modales -->
    <DetalleVentaModal v-if="showDetalleModal" :isOpen="showDetalleModal" :idVenta="selectedVentaId"
      @close="closeDetalleModal" />
    <UpdateVentaModal v-if="showUpdateModal" :isOpen="showUpdateModal" :venta="selectedVenta"
      @close="closeUpdateModal" />
  </div>
</template>


<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { getVentas, searchVentas } from '../actions/venta.action';
import DetalleVentaModal from './DetalleVenta.vue';
import UpdateVentaModal from './UpdateVenta.vue';
import { useToast } from 'vue-toastification';
import type { Datum } from '../interfaces/VentasResponse.interface';

const ventas = ref<Datum[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const totalItems = ref(0);
const itemsPerPage = 10;
const currentPage = ref(1);
const searchQuery = ref('');
const detalle = ref(null);
const showDetalleModal = ref(false);
const selectedVentaId = ref<string | null>(null);
const showUpdateModal = ref(false);
const selectedVenta = ref<Datum | null>(null);

const toast = useToast();

const sortField = ref('fecha_venta');
const sortOrder = ref<'ASC' | 'DESC'>('ASC');

const hasNextPage = computed(() => totalItems.value > currentPage.value * itemsPerPage);

const loadVentas = async () => {
  loading.value = true;
  error.value = null;

  try {
    const offset = (currentPage.value - 1) * itemsPerPage;
    const response = await getVentas(itemsPerPage, offset, sortField.value, sortOrder.value);
    if (response.ok && response.data) {
      ventas.value = response.data;
      totalItems.value = response.total || 0;
    } else {
      toast.error(response.message || 'Error al cargar las ventas.');
    }
  } catch (e) {
    console.error(e);
    error.value = 'Error al cargar las ventas.';
  } finally {
    loading.value = false;
  }
};

// Método de búsqueda
const onSearch = async () => {
  if (!searchQuery.value.trim()) {
    toast.error('Por favor ingresa un término de búsqueda.');
    return;
  }

  loading.value = true;

  try {
    const offset = (currentPage.value - 1) * itemsPerPage; // Calcular el offset
    const response = await searchVentas(searchQuery.value, itemsPerPage, offset);

    if (response.ok && response.data) {
      ventas.value = response.data;
      totalItems.value = response.total || 0;
    } else {
      toast.error(response.message || 'No se encontraron resultados.');
    }
  } catch (error) {
    toast.error('Error al buscar ventas.');
  } finally {
    loading.value = false;
  }
};

// Restablecer búsqueda y volver a cargar todas las ventas
const resetSearch = async () => {
  searchQuery.value = '';
  currentPage.value = 1;
  await loadVentas(); // Método que carga todas las ventas (sin filtros)
};

const sortBy = (field: string) => {
  if (sortField.value === field) {
    sortOrder.value = sortOrder.value === 'ASC' ? 'DESC' : 'ASC';
  } else {
    sortField.value = field;
    sortOrder.value = 'ASC';
  }
  loadVentas();
};

const goToPreviousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    loadVentas();
  }
};

const goToNextPage = () => {
  if (hasNextPage.value) {
    currentPage.value++;
    loadVentas();
  }
};

const openDetalleModal = (idVenta: string) => {
  selectedVentaId.value = idVenta;
  showDetalleModal.value = true;
};

const closeDetalleModal = () => {
  showDetalleModal.value = false;
  selectedVentaId.value = null;
};

const openUpdateModal = (venta: Datum) => {
  selectedVenta.value = venta;
  showUpdateModal.value = true;
};

const closeUpdateModal = () => {
  showUpdateModal.value = false;
  selectedVenta.value = null;
};

onMounted(() => {
  loadVentas();
});

const formatDate = (date: Date | string): string => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString('es-ES', options);
};
</script>
