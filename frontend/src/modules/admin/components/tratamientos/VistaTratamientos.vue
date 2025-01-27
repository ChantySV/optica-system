<template>
  <div class="container mx-auto mt-8 bg-white p-6 rounded-lg shadow">
    <h1 class="text-3xl font-bold text-gray-700 mb-6 text-center">Lista de Tratamientos</h1>

    <div class="flex justify-end mb-4">
      <button
        @click="openCreateModal"
        class="px-6 py-2 bg-blue-500 text-white font-medium rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Crear Tratamiento
      </button>
    </div>

    <div class="flex flex-wrap items-center gap-4 mb-6">
      <input
        type="text"
        v-model="filters.nombre"
        placeholder="Buscar por nombre"
        class="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      <button
        @click="onSearch"
        class="px-6 py-2 bg-blue-500 text-white font-medium rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Buscar
      </button>
      <button
        v-if="hasFilters"
        @click="resetSearch"
        class="px-6 py-2 bg-gray-300 text-gray-700 font-medium rounded-lg shadow hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
      >
        Limpiar
      </button>
    </div>

    <div v-if="loading" class="text-center text-gray-500 text-lg">Cargando datos...</div>
    <div v-else-if="error" class="text-center text-red-500 text-lg">{{ error }}</div>

    <div v-else class="overflow-x-auto">
      <table class="w-full table-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <thead class="bg-gray-200 text-gray-700 uppercase text-sm border">
          <tr>
            <th
              class="px-6 py-3 text-left cursor-pointer hover:underline"
              @click="sortBy('nombre')"
            >
              Nombre
              <span v-if="sortField === 'nombre'">
                <span v-if="sortOrder === 'ASC'">▲</span>
                <span v-else>▼</span>
              </span>
            </th>
            <th
              class="px-6 py-3 text-left cursor-pointer hover:underline"
              @click="sortBy('descripcion')"
            >
              Descripción
              <span v-if="sortField === 'descripcion'">
                <span v-if="sortOrder === 'ASC'">▲</span>
                <span v-else>▼</span>
              </span>
            </th>
            <th
              class="px-6 py-3 text-left cursor-pointer hover:underline"
              @click="sortBy('activo')"
            >
              Activo
              <span v-if="sortField === 'activo'">
                <span v-if="sortOrder === 'ASC'">▲</span>
                <span v-else>▼</span>
              </span>
            </th>
            <th class="px-6 py-3 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="tratamiento in tratamientos"
            :key="tratamiento.id_tratamiento"
            class="border-b last:border-none hover:bg-gray-100 transition-colors"
          >
            <td class="px-6 py-3 text-gray-700">{{ tratamiento.nombre }}</td>
            <td class="px-6 py-3 text-gray-700">{{ tratamiento.descripcion }}</td>
            <td class="px-6 py-3 text-center">
              <span
                :class="tratamiento.activo ? 'bg-green-500' : 'bg-red-500'"
                class="px-3 py-1 rounded-full text-white"
              >
                {{ tratamiento.activo ? 'Sí' : 'No' }}
              </span>
            </td>
            <td class="px-6 py-3 text-center">
              <button
                @click="openUpdateModal(tratamiento)"
                class="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 focus:outline-none"
              >
                Actualizar
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="flex justify-between items-center mt-6">
        <button
          :disabled="currentPage === 1 || loading"
          @click="goToPreviousPage"
          class="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Anterior
        </button>
        <span class="text-gray-700 font-medium">Página {{ currentPage }}</span>
        <button
          :disabled="!hasNextPage || loading"
          @click="goToNextPage"
          class="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Siguiente
        </button>
      </div>
    </div>

    <UpdateTratamientoModal
      v-if="isUpdateModalOpen"
      :tratamiento="selectedTratamiento"
      @close="isUpdateModalOpen = false"
      @updated="handleUpdate"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { findAllTratamientos, updateTratamiento } from '../actions/tratamientos.actions';
import { useToast } from 'vue-toastification';
import type { Tratamiento } from '../interfaces/tratamiento.interface';
import UpdateTratamientoModal from './UpdateTratamientoModal.vue';

const tratamientos = ref<Tratamiento[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const totalItems = ref(0);
const itemsPerPage = 10;
const currentPage = ref(1);
const filters = ref({
  nombre: '',
});
const sortField = ref('nombre');
const sortOrder = ref<'ASC' | 'DESC'>('ASC');
const toast = useToast();
const isUpdateModalOpen = ref(false);
const selectedTratamiento = ref<Tratamiento | null>(null);

const hasFilters = computed(() => {
  return filters.value.nombre.trim() !== '';
});

const hasNextPage = computed(() => totalItems.value > currentPage.value * itemsPerPage);

const loadTratamientos = async () => {
  loading.value = true;
  error.value = null;

  try {
    const response = await findAllTratamientos({
      page: currentPage.value,
      limit: itemsPerPage,
      sortBy: sortField.value,
      order: sortOrder.value,
      filters: {
        nombre: filters.value.nombre,
      },
    });

    if (response.ok) {
      tratamientos.value = response.data;
      totalItems.value = response.total;
    } else {
      toast.error(response.message || 'Error al cargar los tratamientos.');
    }
  } catch (err) {
    console.error(err);
    error.value = 'Error al cargar los tratamientos.';
  } finally {
    loading.value = false;
  }
};

const onSearch = async () => {
  currentPage.value = 1;
  await loadTratamientos();
};

const resetSearch = () => {
  filters.value.nombre = '';
  currentPage.value = 1;
  loadTratamientos();
};

const sortBy = (field: string) => {
  if (sortField.value === field) {
    sortOrder.value = sortOrder.value === 'ASC' ? 'DESC' : 'ASC';
  } else {
    sortField.value = field;
    sortOrder.value = 'ASC';
  }
  loadTratamientos();
};

const goToPreviousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    loadTratamientos();
  }
};

const goToNextPage = () => {
  if (hasNextPage.value) {
    currentPage.value++;
    loadTratamientos();
  }
};

const toggleActivo = async (id_tratamiento: string, activo: boolean) => {
  const result = await updateTratamiento(id_tratamiento, { activo: !activo });
  if (result.ok) {
    const action = result.data.activo ? 'activado' : 'desactivado';
    toast.success(`Tratamiento ${action} exitosamente.`);
    loadTratamientos();
  } else {
    toast.error(result.message || 'Error al actualizar el estado del tratamiento.');
  }
};

const openUpdateModal = (tratamiento: Tratamiento) => {
  selectedTratamiento.value = tratamiento;
  isUpdateModalOpen.value = true;
};

const handleUpdate = () => {
  loadTratamientos();
};

onMounted(() => {
  loadTratamientos();
});
</script>

<style scoped>
</style>
