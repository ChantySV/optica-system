<template>
  <div class="container mx-auto mt-8 bg-white p-6 rounded-lg shadow-md">
    <!-- Título -->
    <h1 class="text-3xl font-semibold text-gray-800 mb-6 text-center">Proveedores</h1>

    <!-- Barra de búsqueda -->
    <div class="mb-4 flex justify-between items-center">
      <div class="flex space-x-2">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Buscar proveedores..."
          class="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
        />
        <button
          @click="onSearch"
          class="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          Buscar
        </button>
      </div>
      <button
        v-if="isSearching"
        @click="clearSearch"
        class="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
      >
        Limpiar Búsqueda
      </button>
      <span class="text-gray-600">Total: {{ totalItems }}</span>
    </div>

    <!-- Mensajes de carga y error -->
    <div v-if="loading" class="text-center text-gray-500">Cargando proveedores...</div>
    <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>

    <!-- Tabla de proveedores -->
    <div v-else class="overflow-x-auto">
      <table class="w-full table-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <thead class="bg-gray-200 text-gray-700 uppercase text-sm">
          <tr>
            <th
              class="px-6 py-3 text-left cursor-pointer hover:underline"
              @click="toggleSortOrder"
            >
              Nombre
              <span class="ml-2">
                <svg
                  v-if="sortField === 'nombre' && sortOrder === 'asc'"
                  xmlns="http://www.w3.org/2000/svg"
                  class="inline h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 15l7-7 7 7"
                  />
                </svg>
                <svg
                  v-if="sortField === 'nombre' && sortOrder === 'desc'"
                  xmlns="http://www.w3.org/2000/svg"
                  class="inline h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
            </th>
            <th class="px-6 py-3 text-left">Número</th>
            <th class="px-6 py-3 text-left">Dirección Web</th>
            <th class="px-6 py-3 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="proveedor in proveedores"
            :key="proveedor.id_proveedor"
            class="border-b last:border-none hover:bg-gray-100 transition-colors"
          >
            <td class="px-6 py-3 text-gray-800">{{ proveedor.nombre }}</td>
            <td class="px-6 py-3 text-gray-800">{{ proveedor.numero || 'No disponible' }}</td>
            <td class="px-6 py-3 text-gray-800">
              <a :href="proveedor.direccion_web" target="_blank" class="text-orange-500 hover:underline">
                {{ proveedor.direccion_web }}
              </a>
            </td>
            <td class="px-6 py-3 text-center">
              <button @click="onUpdate(proveedor)" class="px-4 py-2 bg-gray-800 text-white rounded-lg">
                Actualizar
              </button>
              <button @click="onDelete(proveedor.id_proveedor)" class="ml-2 px-4 py-2 bg-orange-600 text-white rounded-lg">
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Paginación -->
      <div class="flex justify-between items-center mt-6">
        <button
          @click="goToPreviousPage"
          :disabled="currentPage === 1"
          class="px-4 py-2 bg-orange-600 text-white rounded-lg"
        >
          Anterior
        </button>
        <span class="text-gray-700 font-medium">Página {{ currentPage }}</span>
        <button
          @click="goToNextPage"
          :disabled="!hasNextPage"
          class="px-4 py-2 bg-orange-600 text-white rounded-lg"
        >
          Siguiente
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { getProveedoresAction, deleteProveedorAction, searchProveedoresAction } from '../actions/proveedores.action';

const proveedores = ref([]);
const loading = ref(true);
const error = ref<string | null>(null);
const totalItems = ref(0);
const itemsPerPage = 10;
const currentPage = ref(1);

const searchQuery = ref('');
const isSearching = ref(false);
const sortField = ref('nombre');
const sortOrder = ref<'asc' | 'desc'>('asc');

// Calcular si hay una siguiente página
const hasNextPage = computed(() => totalItems.value > currentPage.value * itemsPerPage);

// Cargar proveedores
const loadProveedores = async () => {
  loading.value = true;
  error.value = null;

  const offset = (currentPage.value - 1) * itemsPerPage;

  const response = await getProveedoresAction(itemsPerPage, offset, sortField.value, sortOrder.value.toUpperCase());

  if (response.ok && response.data) {
    proveedores.value = response.data;
    totalItems.value = response.total || 0;
  } else {
    error.value = 'Error al cargar los proveedores.';
  }

  loading.value = false;
};

// Manejar cambio de orden
const toggleSortOrder = () => {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  loadProveedores();
};

// Manejar búsqueda
const onSearch = async () => {
  if (!searchQuery.value.trim()) {
    alert('Por favor, ingresa un término de búsqueda válido.');
    return;
  }

  loading.value = true;
  error.value = null;

  const response = await searchProveedoresAction(searchQuery.value, itemsPerPage, 0);

  if (response.ok && response.data) {
    proveedores.value = response.data;
    totalItems.value = response.total || 0;
    isSearching.value = true;
    currentPage.value = 1;
  } else {
    error.value = response.message || 'No se encontraron proveedores.';
  }

  loading.value = false;
};

// Limpiar búsqueda
const clearSearch = () => {
  searchQuery.value = '';
  isSearching.value = false;
  loadProveedores();
};

// Paginación
const goToPreviousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    loadProveedores();
  }
};

const goToNextPage = () => {
  if (hasNextPage.value) {
    currentPage.value++;
    loadProveedores();
  }
};

// Manejar eliminación
const onDelete = async (id_proveedor: string) => {
  const confirmDelete = confirm('¿Estás seguro de eliminar este proveedor?');
  if (confirmDelete) {
    const response = await deleteProveedorAction(id_proveedor);
    if (response.ok) {
      alert('Proveedor eliminado correctamente.');
      loadProveedores();
    } else {
      alert(response.message || 'Error al eliminar el proveedor.');
    }
  }
};

// Inicializar
onMounted(() => {
  loadProveedores();
});
</script>
