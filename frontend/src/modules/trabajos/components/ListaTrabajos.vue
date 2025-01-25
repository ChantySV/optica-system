<template>
  <div class="container mx-auto mt-8 bg-white p-6 rounded-lg">
    <!-- Título -->
    <h1 class="text-3xl font-semibold text-gray-800 mb-6 text-center">Trabajos</h1>

    <!-- Mensajes de carga y error -->
    <div v-if="loading" class="text-center text-gray-500 text-lg">
      Cargando trabajos...
    </div>
    <div v-else-if="error" class="text-center text-red-500 text-lg">
      {{ error }}
    </div>

    <!-- Tabla de trabajos -->
    <div v-else class="overflow-x-auto">
      <table class="w-full table-auto bg-white rounded-lg shadow-lg">
        <thead class="bg-gray-200 text-gray-700 uppercase text-sm">
          <tr>
            <!-- Encabezados con funcionalidad de ordenamiento -->
            <th class="px-6 py-3 text-left cursor-pointer hover:underline" @click="sortBy('numero_trabajo')">
              Número de Trabajo
              <span v-if="sortField === 'numero_trabajo'">
                <span v-if="sortOrder === 'ASC'">▲</span>
                <span v-else>▼</span>
              </span>
            </th>
            <th class="px-6 py-3 text-left cursor-pointer hover:underline" @click="sortBy('fecha_entrada')">
              Fecha de Entrada
              <span v-if="sortField === 'fecha_entrada'">
                <span v-if="sortOrder === 'ASC'">▲</span>
                <span v-else>▼</span>
              </span>
            </th>
            <th class="px-6 py-3 text-left cursor-pointer hover:underline" @click="sortBy('estado')">
              Estado
              <span v-if="sortField === 'estado'">
                <span v-if="sortOrder === 'ASC'">▲</span>
                <span v-else>▼</span>
              </span>
            </th>
            <th class="px-6 py-3 text-left cursor-pointer hover:underline" @click="sortBy('fecha_salida')">
              Fecha de Salida
              <span v-if="sortField === 'fecha_salida'">
                <span v-if="sortOrder === 'ASC'">▲</span>
                <span v-else>▼</span>
              </span>
            </th>
            <th class="px-6 py-3 text-left">Personal</th>
            <th class="px-6 py-3 text-center">Detalle</th>
            <th class="px-6 py-3 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="trabajo in trabajos" :key="trabajo.id_trabajo"
            class="border-b last:border-none hover:bg-gray-100 transition-colors">
            <td class="px-6 py-3 text-gray-800">{{ trabajo.numero_trabajo }}</td>
            <td class="px-6 py-3 text-gray-800">{{ formatDate(trabajo.fecha_entrada) }}</td>
            <td class="px-6 py-3 text-gray-800">{{ capitalize(trabajo.estado) }}</td>
            <td class="px-6 py-3 text-gray-800">
              {{ trabajo.fecha_salida ? formatDate(trabajo.fecha_salida) : 'No disponible' }}
            </td>
            <td class="px-6 py-3 text-gray-800">
              {{ formatPersonal(trabajo.personal) }}
            </td>
            <td class="px-6 py-3 text-center">
              <button @click="openDetalleModal(trabajo)"
                class="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 focus:outline-none">
                Detalle
              </button>
            </td>
            <td class="px-6 py-3 text-center">
              <button @click="openUpdateModal(trabajo)"
                class="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 focus:outline-none">
                Actualizar
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Paginación -->
      <div class="flex justify-between items-center mt-6">
        <button
          :disabled="currentPage === 1 || loading"
          @click="goToPreviousPage"
          class="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Anterior
        </button>
        <span class="text-gray-700 font-medium">Página {{ currentPage }}</span>
        <button
          :disabled="!hasNextPage || loading"
          @click="goToNextPage"
          class="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Siguiente
        </button>
      </div>
    </div>

    <!-- Modal para mostrar detalle del trabajo -->
    <DetalleTrabajoModal v-if="showDetalleModal" :isOpen="showDetalleModal" :trabajo="selectedTrabajo"
      @close="closeDetalleModal" />

    <!-- Modal de Actualización -->
    <UpdateTrabajoModal
      v-if="showUpdateModal"
      :isOpen="showUpdateModal"
      :trabajo="selectedTrabajo"
      @close="closeUpdateModal"
      @trabajo-actualizado="actualizarListaTrabajos"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { getTrabajos } from '../actions/trabajos.action'; // Verifica la ruta
import DetalleTrabajoModal from './DetalleTrabajos.vue';
import UpdateTrabajoModal from './UpdateTrabajo.vue'; // Asegúrate de que el nombre coincide
import { useToast } from 'vue-toastification';
import type { Trabajo } from '../interfaces/TrabajosResponse.interface'; // Asegúrate de ajustar la ruta y los nombres

// Variables reactivas
const trabajos = ref<Trabajo[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const totalItems = ref(0);
const itemsPerPage = 10;
const currentPage = ref(1);
const showDetalleModal = ref(false);

const showUpdateModal = ref(false);
const selectedTrabajo = ref<Trabajo | null>(null);

const toast = useToast();

// Variables para ordenamiento
const sortField = ref<keyof Trabajo>('numero_trabajo');
const sortOrder = ref<'ASC' | 'DESC'>('ASC');

// Función para ordenar por un campo específico
const sortBy = (field: keyof Trabajo) => {
  if (sortField.value === field) {
    // Si ya está ordenado por esta columna, alterna el orden
    sortOrder.value = sortOrder.value === 'ASC' ? 'DESC' : 'ASC';
  } else {
    // Cambia la columna de orden y establece orden ascendente por defecto
    sortField.value = field;
    sortOrder.value = 'ASC';
  }
  // Resetear a la primera página al cambiar el ordenamiento
  currentPage.value = 1;
  // Recarga los trabajos con los nuevos parámetros de orden
  loadTrabajos();
};

// Computed para verificar si hay una siguiente página
const hasNextPage = computed(() => totalItems.value > currentPage.value * itemsPerPage);

// Función para cargar trabajos desde el backend
const loadTrabajos = async () => {
  loading.value = true;
  error.value = null;

  const offset = (currentPage.value - 1) * itemsPerPage;

  const response = await getTrabajos(itemsPerPage, offset, sortField.value, sortOrder.value);
  if (response.ok && response.data) {
    trabajos.value = response.data.trabajos;
    totalItems.value = response.data.total;
  } else {
    error.value = response.message || 'Error al cargar los trabajos.';
    toast.error('Error al cargar los trabajos.');
  }
  loading.value = false;
};

// Función para navegar a la página anterior
const goToPreviousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1;
    loadTrabajos();
  }
};

// Función para navegar a la página siguiente
const goToNextPage = () => {
  if (hasNextPage.value) {
    currentPage.value += 1;
    loadTrabajos();
  }
};

// Función para abrir el modal de detalles
const openDetalleModal = (trabajo: Trabajo) => {
  selectedTrabajo.value = trabajo;
  showDetalleModal.value = true;
};

// Función para cerrar el modal de detalles
const closeDetalleModal = () => {
  showDetalleModal.value = false;
  selectedTrabajo.value = null;
};

// Función para abrir el modal de actualización
const openUpdateModal = (trabajo: Trabajo) => {
  selectedTrabajo.value = trabajo;
  showUpdateModal.value = true;
};

// Función para cerrar el modal de actualización
const closeUpdateModal = () => {
  showUpdateModal.value = false;
  selectedTrabajo.value = null;
};

// Función para actualizar la lista después de una actualización exitosa
const actualizarListaTrabajos = () => {
  loadTrabajos();
};

// Cargar trabajos al montar el componente
onMounted(() => {
  loadTrabajos();
});

// Función para formatear fechas
const formatDate = (date: Date | string): string => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString('es-ES', options);
};

// Función para formatear la información del personal
const formatPersonal = (personal: Trabajo['personal']): string => {
  const apellidoMaterno = personal.apellido_materno ? ` ${personal.apellido_materno}` : '';
  return `${personal.nombres} ${personal.apellido_paterno}${apellidoMaterno}`;
};

// Función para capitalizar el estado
const capitalize = (word: string): string => {
  if (!word) return '';
  return word.charAt(0).toUpperCase() + word.slice(1);
};
</script>

<style scoped>
/* Estilos para los inputs con errores */
.border-red-500 {
  border-color: #f87171; /* Tailwind red-400 */
}
</style>
