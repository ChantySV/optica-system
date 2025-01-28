<!-- src/components/TrabajoList.vue -->

<template>
  <div class="container mx-auto p-6 bg-white rounded-lg ">
    <!-- Título -->
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Listado de Trabajos</h1>

    <!-- Barra de Búsqueda -->
    <div class="flex flex-col md:flex-row items-center justify-between mb-4 space-y-4 md:space-y-0">
      <!-- Búsqueda por Número de Trabajo -->
      <div class="flex items-center space-x-2">
        <input
          type="number"
          v-model="searchQuery"
          placeholder="Buscar por Número de Trabajo"
          class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <button
          @click="fetchTrabajos"
          class="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 "
        >
          Buscar
        </button>
      </div>
    </div>

    <!-- Tabla de Trabajos -->
    <div class="overflow-x-auto">
      <table class="w-full table-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <thead class="bg-gray-200 text-gray-700 uppercase text-sm border">
          <tr>
            <!-- Número de Trabajo -->
            <th
              class="px-6 py-3 text-left cursor-pointer hover:underline"
              @click="changeSort('numero_trabajo')"
            >
              Número de Trabajo
              <span v-if="sortField === 'numero_trabajo'">
                <span v-if="sortOrder === 'ASC'">▲</span>
                <span v-else>▼</span>
              </span>
            </th>

            <!-- Fecha de Entrada -->
            <th
              class="px-6 py-3 text-left cursor-pointer hover:underline"
              @click="changeSort('fecha_entrada')"
            >
              Fecha de Entrada
              <span v-if="sortField === 'fecha_entrada'">
                <span v-if="sortOrder === 'ASC'">▲</span>
                <span v-else>▼</span>
              </span>
            </th>

            <!-- Estado -->
            <th
              class="px-6 py-3 text-left cursor-pointer hover:underline"
              @click="changeSort('estado')"
            >
              Estado
              <span v-if="sortField === 'estado'">
                <span v-if="sortOrder === 'ASC'">▲</span>
                <span v-else>▼</span>
              </span>
            </th>

            <!-- Acciones -->
            <th class="px-6 py-3 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="trabajo in trabajos"
            :key="trabajo.id_trabajo"
            class="border-b last:border-none hover:bg-gray-100 transition-colors"
          >
            <td class="px-6 py-3 text-gray-700">{{ trabajo.numero_trabajo }}</td>
            <td class="px-6 py-3 text-gray-700">{{ formatDate(trabajo.fecha_entrada) }}</td>
            <td class="px-6 py-3 text-gray-700">{{ trabajo.estado }}</td>
            <td class="px-6 py-3 text-center">
              <button
                @click="openDetailModal(trabajo)"
                class="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 focus:outline-none"
              >
                Detalle
              </button>
              <!-- <button
                @click="openUpdateModal(trabajo)"
                class="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 focus:outline-none ml-2"
              >
                Actualizar
              </button> -->
              <!-- <button
                @click="confirmDelete(trabajo)"
                :class="[
                  'px-4 py-2 text-white rounded-lg hover:opacity-80 focus:outline-none ml-2',
                  trabajo.activo ? 'bg-gray-700' : 'bg-green-700'
                ]"
              >
                {{ trabajo.activo ? 'Eliminar' : 'Restaurar' }}
              </button> -->
            </td>
          </tr>
          <tr v-if="trabajos.length === 0">
            <td colspan="4" class="px-6 py-4 text-center text-gray-500">No se encontraron trabajos.</td>
          </tr>
        </tbody>
      </table>

      <!-- Paginación -->
      <div class="flex justify-between items-center mt-6">
        <button
          :disabled="currentPage === 1 || loading"
          @click="goToPreviousPage"
          class="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Anterior
        </button>
        <span class="text-gray-700 font-medium">Página {{ currentPage }} de {{ totalPages }}</span>
        <button
          :disabled="currentPage === totalPages "
          @click="goToNextPage"
          class="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Siguiente
        </button>
      </div>
    </div>

    <!-- Modales -->
    <TrabajoDetailModal
      v-if="isDetailModalOpen"
      :trabajo="selectedTrabajo"
      @close="isDetailModalOpen = false"
    />
    <TrabajoUpdateModal
      v-if="isUpdateModalOpen"
      :trabajo="selectedTrabajo"
      @close="isUpdateModalOpen = false"
      @updated="fetchTrabajos"
    />
    <ConfirmDeleteModal
      v-if="isDeleteModalOpen"
      :trabajo="selectedTrabajo"
      @close="isDeleteModalOpen = false"
      @deleted="fetchTrabajos"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { getTrabajos } from '../actions/trabajos.action';
import type { Trabajo, FindAllTrabajoResponse } from '../interfaces/TrabajosResponse.interface';
import TrabajoDetailModal from './DetalleTrabajos.vue';
import TrabajoUpdateModal from './UpdateTrabajo.vue';
import ConfirmDeleteModal from './ConfirmDelete.vue';
import { useToast } from 'vue-toastification';

const toast = useToast();

// Estados
const trabajos = ref<Trabajo[]>([]);
const totalTrabajos = ref(0);
const currentPage = ref(1);
const limit = ref(10);
const totalPages = computed(() => Math.ceil(totalTrabajos.value / limit.value));

const searchQuery = ref('');
const sortField = ref('fecha_entrada');
const sortOrder = ref<'ASC' | 'DESC'>('ASC');

// Modales
const isDetailModalOpen = ref(false);
const isUpdateModalOpen = ref(false);
const isDeleteModalOpen = ref(false);
const selectedTrabajo = ref<Trabajo | null>(null);

// Función para formatear fechas
const formatDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString('es-ES', options);
};

// Fetch Trabajos
const fetchTrabajos = async () => {
  try {
    const response: FindAllTrabajoResponse = await getTrabajos(
      searchQuery.value,
      currentPage.value,
      limit.value,
      sortField.value,
      sortOrder.value
    );
    if (response.ok) {
      trabajos.value = response.data;
      totalTrabajos.value = response.total;
    } else {
      toast.error(response.message || 'Error al cargar los trabajos.');
    }
  } catch (error: any) {
    toast.error(error.message || 'Error al cargar los trabajos.');
  }
};

// Cambiar de Página
const goToPreviousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1;
    fetchTrabajos();
  }
};

const goToNextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value += 1;
    fetchTrabajos();
  }
};

// Cambiar Ordenamiento al hacer clic en la cabecera
const changeSort = (field: string) => {
  if (sortField.value === field) {
    // Si ya está ordenado por este campo, alternar el orden
    sortOrder.value = sortOrder.value === 'ASC' ? 'DESC' : 'ASC';
  } else {
    // Cambiar a un nuevo campo de ordenamiento
    sortField.value = field;
    sortOrder.value = 'ASC'; // Orden ascendente por defecto
  }
  fetchTrabajos();
};

// Abrir Modal de Detalles
const openDetailModal = (trabajo: Trabajo) => {
  selectedTrabajo.value = trabajo;
  isDetailModalOpen.value = true;
};

// Abrir Modal de Actualización
const openUpdateModal = (trabajo: Trabajo) => {
  selectedTrabajo.value = trabajo;
  isUpdateModalOpen.value = true;
};

// Confirmar Eliminación
const confirmDelete = (trabajo: Trabajo) => {
  selectedTrabajo.value = trabajo;
  isDeleteModalOpen.value = true;
};

// Cargar datos al montar el componente
onMounted(() => {
  fetchTrabajos();
});
</script>

<style scoped>
/* Agrega estilos personalizados si es necesario */

/* Estilos para los indicadores de ordenamiento */
th span {
  margin-left: 5px;
  font-size: 0.8rem;
}
</style>
