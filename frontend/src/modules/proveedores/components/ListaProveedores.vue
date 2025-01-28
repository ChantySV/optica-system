<template>
  <div class="container mx-auto mt-8 bg-white p-6 rounded-lg">
    <!-- Título -->
    <h1 class="text-3xl font-semibold text-gray-800 mb-6 text-center">Proveedores</h1>

    <!-- Mensajes de carga y error -->
    <div v-if="loading" class="text-center text-gray-500">Cargando proveedores...</div>
    <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>

    <!-- Tabla de proveedores -->
    <div v-else class="overflow-x-auto">
      <table class="w-full table-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <thead class="bg-gray-200 text-gray-700 uppercase text-sm">
          <tr>
            <th class="px-6 py-3 text-left cursor-pointer hover:underline" @click="sortBy('nombre')">
              Nombre
              <span v-if="sortField === 'nombre'">
                <span v-if="sortOrder === 'ASC'">▲</span>
                <span v-else>▼</span>
              </span>
            </th>
            <th class="px-6 py-3 text-left cursor-pointer hover:underline" @click="sortBy('numero')">
              Número
              <span v-if="sortField === 'numero'">
                <span v-if="sortOrder === 'ASC'">▲</span>
                <span v-else>▼</span>
              </span>
            </th>
            <th class="px-6 py-3 text-left cursor-pointer hover:underline" @click="sortBy('direccion_web')">
              Dirección Web
              <span v-if="sortField === 'direccion_web'">
                <span v-if="sortOrder === 'ASC'">▲</span>
                <span v-else>▼</span>
              </span>
            </th>
            <th class="px-6 py-3 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="proveedor in proveedores" :key="proveedor.id_proveedor"
            class="border-b last:border-none hover:bg-gray-100 transition-colors">
            <td class="px-6 py-3 text-gray-800">{{ proveedor.nombre }}</td>
            <td class="px-6 py-3 text-gray-800">{{ proveedor.numero || 'No disponible' }}</td>
            <td class="px-6 py-3 text-gray-800">
              <a :href="proveedor.direccion_web" target="_blank" class="text-orange-500 hover:underline">
                {{ proveedor.direccion_web.length > 20 ? proveedor.direccion_web.slice(0, 20) + '...' : proveedor.direccion_web }}
              </a>
            </td>
            <td class="px-6 py-3 text-center">
              <button @click="openUpdateModal(proveedor)"
                class="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 focus:outline-none">
                Actualizar
              </button>
              <button @click="onDelete(proveedor.id_proveedor)"
                class="ml-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-500 focus:outline-none">
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Paginación -->
      <div class="flex justify-between items-center mt-6">
        <button :disabled="currentPage === 1" @click="goToPreviousPage"
          class="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-500 disabled:bg-gray-400 disabled:cursor-not-allowed">
          Anterior
        </button>
        <span class="text-gray-700 font-medium">Página {{ currentPage }}</span>
        <button :disabled="!hasNextPage" @click="goToNextPage"
          class="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-500 disabled:bg-gray-400 disabled:cursor-not-allowed">
          Siguiente
        </button>
      </div>
    </div>

    <!-- Modal para actualizar proveedor -->
    <UpdateProveedor v-if="showUpdateModal" :isOpen="showUpdateModal" :proveedor="selectedProveedor"
      @close="closeUpdateModal" @refresh="loadProveedores" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { getProveedoresAction, deleteProveedorAction } from '../actions/proveedores.action';
import UpdateProveedor from './UpdateProveedores.vue';
import ProveedoresResponseInterface from '../interfaces/proveedoresResponse.interface';

const proveedores = ref<ProveedoresResponseInterface[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const totalItems = ref(0);
const itemsPerPage = 10;
const currentPage = ref(1);

const sortField = ref('nombre');
const sortOrder = ref<'ASC' | 'DESC'>('ASC');

// Estado del modal de actualización
const showUpdateModal = ref(false);
const selectedProveedor = ref<ProveedoresResponseInterface | null>(null);

// Calcular si hay una siguiente página
const hasNextPage = computed(() => totalItems.value > currentPage.value * itemsPerPage);

// Cargar proveedores
const loadProveedores = async () => {
  loading.value = true;
  error.value = null;

  const offset = (currentPage.value - 1) * itemsPerPage;

  const response = await getProveedoresAction(itemsPerPage, offset, sortField.value, sortOrder.value);
  if (response.ok && response.data) {
    proveedores.value = response.data;
    totalItems.value = response.total || 0;
  }

  loading.value = false;
};

// Ordenar proveedores
const sortBy = (field: string) => {
  if (sortField.value === field) {
    sortOrder.value = sortOrder.value === 'ASC' ? 'DESC' : 'ASC';
  } else {
    sortField.value = field;
    sortOrder.value = 'ASC';
  }
  loadProveedores();
};

// Manejar cambio a la página anterior
const goToPreviousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    loadProveedores();
  }
};

// Manejar cambio a la página siguiente
const goToNextPage = () => {
  if (hasNextPage.value) {
    currentPage.value++;
    loadProveedores();
  }
};

// Abrir el modal de actualización
const openUpdateModal = (proveedor: ProveedoresResponseInterface) => {
  selectedProveedor.value = proveedor;
  showUpdateModal.value = true;
};

// Cerrar el modal de actualización
const closeUpdateModal = () => {
  showUpdateModal.value = false;
};

// Manejar eliminación de un proveedor
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

// Cargar proveedores al montar el componente
onMounted(() => {
  loadProveedores();
});
</script>
