<template>
  <!-- Fondo principal -->
  <div class="container mx-auto mt-8 bg-white p-6 rounded-lg shadow-md">
    <!-- Título -->
    <h1 class="text-3xl font-semibold text-gray-800 mb-6 text-center">
      Proveedores
    </h1>

    <!-- Mensajes de carga y error -->
    <div v-if="loading" class="text-center text-gray-500">
      Cargando proveedores...
    </div>
    <div v-else-if="error" class="text-center text-red-500">
      {{ error }}
    </div>

    <!-- Tabla de proveedores -->
    <div v-else class="overflow-x-auto">
      <table
        class="w-full table-auto bg-white rounded-lg shadow-lg overflow-hidden"
      >
        <thead class="bg-gray-200 text-gray-700 uppercase text-sm">
          <tr>
            <th class="px-6 py-3 text-left">Nombre</th>
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
            <td class="px-6 py-3 text-gray-800">
              {{ proveedor.nombre }}
            </td>
            <td class="px-6 py-3 text-gray-800">
              {{ proveedor.numero || 'No disponible' }}
            </td>
            <td class="px-6 py-3 text-gray-800">
              {{ proveedor.direccion_web }}
            </td>
            <td class="px-6 py-3 text-center">
              <!-- Botón Actualizar -->
              <button
                @click="onUpdate(proveedor)"
                class="px-4 py-2 font-semibold text-white bg-gray-800 rounded-lg shadow hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-700 transition"
              >
                Actualizar
              </button>

              <!-- Botón Eliminar -->
              <button
                @click="onDelete(proveedor.id_proveedor)"
                class="ml-2 px-4 py-2 font-semibold text-white bg-orange-600 rounded-lg shadow hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
              >
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Paginación -->
      <div class="flex justify-between items-center mt-6">
        <button
          :disabled="currentPage === 1"
          @click="goToPreviousPage"
          class="px-4 py-2 font-semibold text-white bg-orange-600 rounded-lg shadow hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Anterior
        </button>

        <span class="text-gray-700 font-medium">
          Página {{ currentPage }}
        </span>

        <button
          :disabled="!hasNextPage"
          @click="goToNextPage"
          class="px-4 py-2 font-semibold text-white bg-orange-600 rounded-lg shadow hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Siguiente
        </button>
      </div>
    </div>

    <!-- Modal de actualización -->
    <UpdateProveedorModal
      v-if="showUpdateModal"
      :is-open="showUpdateModal"
      :proveedor="selectedProveedor"
      @close="closeUpdateModal"
      @refresh="loadProveedores"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { getProveedoresAction, deleteProveedorAction } from '../actions/proveedores.action';
import type { ProveedoresResponseInterface } from '../interfaces/proveedoresResponse.interface';
import UpdateProveedorModal from './UpdateProveedores.vue';

const proveedores = ref<ProveedoresResponseInterface[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const totalItems = ref(0); // Total de registros (esto debería venir del backend)
const itemsPerPage = 10; // Registros por página
const currentPage = ref(1); // Página actual

const showUpdateModal = ref(false);
const selectedProveedor = ref<ProveedoresResponseInterface | null>(null);

// Calcular si hay una siguiente página
const hasNextPage = computed(() => totalItems.value > currentPage.value * itemsPerPage);

// Cargar proveedores según la página
const loadProveedores = async () => {
  loading.value = true;
  error.value = null;

  const offset = (currentPage.value - 1) * itemsPerPage;
  const response = await getProveedoresAction(itemsPerPage, offset);

  if (response.ok && response.data) {
    proveedores.value = response.data;
    totalItems.value = response.total || 0; // Ajusta para usar el total del backend
  } else {
    error.value = response.message || 'Error al cargar los proveedores.';
  }

  loading.value = false;
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

// Manejar eliminación de un proveedor
const onDelete = async (id_proveedor: string) => {
  const confirmDelete = confirm('¿Estás seguro de eliminar este proveedor?');
  if (!confirmDelete) return;

  const response = await deleteProveedorAction(id_proveedor);
  if (response.ok) {
    proveedores.value = proveedores.value.filter(
      (proveedor) => proveedor.id_proveedor !== id_proveedor
    );
    alert('Proveedor eliminado correctamente.');
    loadProveedores();
  } else {
    alert(response.message || 'Error al eliminar el proveedor.');
  }
};

// Manejar actualización de un proveedor
const onUpdate = (proveedor: ProveedoresResponseInterface) => {
  selectedProveedor.value = proveedor;
  showUpdateModal.value = true;
};

// Cerrar modal de actualización
const closeUpdateModal = () => {
  showUpdateModal.value = false;
};

onMounted(() => {
  loadProveedores();
});
</script>

<style scoped>
button:disabled {
  cursor: not-allowed;
}
</style>
