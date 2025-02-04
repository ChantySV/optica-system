<template>
  <div class="container mx-auto mt-8 bg-white p-6 rounded-lg">
    <!-- Título -->
    <h1 class="text-3xl font-semibold text-gray-800 mb-6 text-center">Proveedores</h1>
    <div class="flex flex-col md:flex-row items-center justify-between mb-4 space-y-4 md:space-y-0">
  <div class="flex items-center space-x-2">
    <input type="text" v-model="searchQuery" placeholder="Buscar por Nombre"
      class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300" />
    <button @click="loadProveedores"
      class="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-500">
      Buscar
    </button>
  </div>
</div>
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
              <a :href="`https://${proveedor.direccion_web}`" target="_blank" class="text-orange-500 hover:underline">
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
      @close="closeUpdateModal" @refreshList="loadProveedores" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { getProveedoresAction, deleteProveedorAction } from '../actions/proveedores.action';
import UpdateProveedor from './UpdateProveedores.vue';
import type { ProveedoresResponseInterface } from '../interfaces/proveedoresResponse.interface';
import { useToast } from 'vue-toastification';

const toast = useToast();

const proveedores = ref<ProveedoresResponseInterface[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const totalItems = ref(0);
const itemsPerPage = 10;
const currentPage = ref(1);
const searchQuery = ref('');

const sortField = ref('nombre');
const sortOrder = ref<'ASC' | 'DESC'>('ASC');

const showUpdateModal = ref(false);
const selectedProveedor = ref<ProveedoresResponseInterface | null>(null);

const hasNextPage = computed(() => totalItems.value > currentPage.value * itemsPerPage);

const loadProveedores = async () => {
  loading.value = true;
  error.value = null;

  const offset = (currentPage.value - 1) * itemsPerPage;

  const response = await getProveedoresAction(itemsPerPage, offset, sortField.value, sortOrder.value, searchQuery.value);
  if (response.ok && response.data) {
    proveedores.value = response.data;
    totalItems.value = response.total || 0;
  }

  loading.value = false;
};

const sortBy = (field: string) => {
  if (sortField.value === field) {
    sortOrder.value = sortOrder.value === 'ASC' ? 'DESC' : 'ASC';
  } else {
    sortField.value = field;
    sortOrder.value = 'ASC';
  }
  loadProveedores();
};

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

const openUpdateModal = (proveedor: ProveedoresResponseInterface) => {
  selectedProveedor.value = proveedor;
  showUpdateModal.value = true;
};

const closeUpdateModal = () => {
  showUpdateModal.value = false;
};

const onDelete = async (id_proveedor: string) => {
  const confirmDelete = confirm('¿Estás seguro de eliminar este proveedor?');
  if (confirmDelete) {
    const response = await deleteProveedorAction(id_proveedor);
    if (response.ok) {
      toast.success('Proveedor eliminado correctamente.');
      loadProveedores();
    } else {
      toast.error(response.message || 'Error al eliminar el proveedor.');
    }
  }
};

onMounted(() => {
  loadProveedores();
});
</script>
