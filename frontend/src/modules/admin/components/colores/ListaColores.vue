<template>
  <div class="container mx-auto mt-8 bg-white p-6 rounded-lg shadow">
    <h1 class="text-3xl font-bold text-gray-700 mb-6 text-center">Lista de Colores</h1>

    <div class="flex justify-end mb-4">
      <button
        @click="openCreateModal"
        class="px-6 py-2 bg-orange-500 text-white font-medium rounded-lg shadow hover:bg-orange-600 "
      >
        Crear Color
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
        class="px-6 py-2 bg-orange-500 text-white font-medium rounded-lg shadow hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
            v-for="color in colors"
            :key="color.id_color"
            class="border-b last:border-none hover:bg-gray-100 transition-colors"
          >
            <td class="px-6 py-3 text-gray-700">{{ color.nombre }}</td>
            <td class="px-6 py-3 text-center">
              <span
                :class="color.activo ? 'bg-orange-500' : 'bg-gray-700'"
                class="px-3 py-1 rounded-full text-white"
              >
                {{ color.activo ? 'Sí' : 'No' }}
              </span>
            </td>
            <td class="px-6 py-3 text-center space-x-2">
              <button
                @click="openUpdateModal(color)"
                class="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 focus:outline-none"
              >
                Actualizar
              </button>
              <button
                v-if="color.activo"
                @click="confirmToggleActivo(color, false)"
                class="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 focus:outline-none"
              >
                Borrar
              </button>
              <button
                v-else
                @click="confirmToggleActivo(color, true)"
                class="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 focus:outline-none"
              >
                Restaurar
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="flex justify-between items-center mt-6">
        <button
          :disabled="currentPage === 1 || loading"
          @click="goToPreviousPage"
          class="px-4 py-2 bg-orange-500 text-white rounded-lg shadow hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Anterior
        </button>
        <span class="text-gray-700 font-medium">Página {{ currentPage }}</span>
        <button
          :disabled="!hasNextPage || loading"
          @click="goToNextPage"
          class="px-4 py-2 bg-orange-500 text-white rounded-lg shadow hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Siguiente
        </button>
      </div>
    </div>

    <CreateColorModal
      v-if="isCreateModalOpen"
      @close="isCreateModalOpen = false"
      @created="handleCreate"
    />
    <UpdateColorModal
      v-if="isUpdateModalOpen"
      :color="selectedColor"
      @close="isUpdateModalOpen = false"
      @updated="handleUpdate"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { findAllColors, updateColor } from '../../actions/admin-color.action';
import { useToast } from 'vue-toastification';
import type { Color } from '../../interfaces/ColorResponse.interface';
import UpdateColorModal from './UpdateColores.vue';
import CreateColorModal from './CreateColores.vue';

const colors = ref<Color[]>([]);
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
const isCreateModalOpen = ref(false);
const selectedColor = ref<Color | null>(null);

const hasFilters = computed(() => {
  return filters.value.nombre.trim() !== '';
});

const hasNextPage = computed(() => totalItems.value > currentPage.value * itemsPerPage);

const loadColors = async () => {
  loading.value = true;
  error.value = null;

  try {
    const response = await findAllColors({
      page: currentPage.value,
      limit: itemsPerPage,
      sortBy: sortField.value,
      order: sortOrder.value,
      filters: {
        nombre: filters.value.nombre,
      },
    });

    if (response.ok) {
      console.log(response);
      colors.value = response.data;
      totalItems.value = response.total;
    } else {
      toast.error(response.message || 'Error al cargar los colores.');
    }
  } catch (err) {
    console.error(err);
    error.value = 'Error al cargar los colores.';
  } finally {
    loading.value = false;
  }
};

const onSearch = async () => {
  currentPage.value = 1;
  await loadColors();
};

const resetSearch = () => {
  filters.value.nombre = '';
  currentPage.value = 1;
  loadColors();
};

const sortBy = (field: string) => {
  if (sortField.value === field) {
    sortOrder.value = sortOrder.value === 'ASC' ? 'DESC' : 'ASC';
  } else {
    sortField.value = field;
    sortOrder.value = 'ASC';
  }
  loadColors();
};

const goToPreviousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    loadColors();
  }
};

const goToNextPage = () => {
  if (hasNextPage.value) {
    currentPage.value++;
    loadColors();
  }
};

const toggleActivo = async (id_color: string, activo: boolean) => {
  const result = await updateColor(id_color, { activo });
  if (result.ok) {
    const action = activo ? 'restaurado' : 'borrado';
    toast.success(`Color ${action} exitosamente.`);
    loadColors();
  } else {
    toast.error(result.message || `Error al ${activo ? 'restaurar' : 'borrar'} el color.`);
  }
};

const confirmToggleActivo = (color: Color, activo: boolean) => {
  const action = activo ? 'restaurar' : 'borrar';
  if (confirm(`¿Estás seguro de ${action} este color?`)) {
    toggleActivo(color.id_color, activo);
  }
};

const openUpdateModal = (color: Color) => {
  selectedColor.value = color;
  isUpdateModalOpen.value = true;
};

const openCreateModal = () => {
  isCreateModalOpen.value = true;
};

const handleUpdate = () => {
  loadColors();
};

const handleCreate = () => {
  loadColors();
};

onMounted(() => {
  loadColors();
});
</script>

<style scoped>
@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }
  table {
    font-size: 0.875rem;
  }
  th, td {
    padding: 0.5rem;
  }
  button {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  }
}
</style>
