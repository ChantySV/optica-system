<template>
  <div class="container mx-auto mt-8 bg-white p-6 rounded-lg shadow-md">
    <!-- Título -->
    <h1 class="text-3xl font-semibold text-gray-800 mb-6 text-center">Productos</h1>


    <!-- Mensajes de carga y error -->
    <div v-if="loading" class="text-center text-gray-500">Cargando productos...</div>
    <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>

    <!-- Tabla de productos -->
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
            <th class="px-6 py-3 text-left cursor-pointer hover:underline" @click="sortBy('precio_compra')">
              Precio Compra
              <span v-if="sortField === 'precio_compra'">
                <span v-if="sortOrder === 'ASC'">▲</span>
                <span v-else>▼</span>
              </span>
            </th>
            <th class="px-6 py-3 text-left cursor-pointer hover:underline" @click="sortBy('precio_venta')">
              Precio Venta
              <span v-if="sortField === 'precio_venta'">
                <span v-if="sortOrder === 'ASC'">▲</span>
                <span v-else>▼</span>
              </span>
            </th>
            <th class="px-6 py-3 text-left cursor-pointer hover:underline" @click="sortBy('stock')">
              Stock
              <span v-if="sortField === 'stock'">
                <span v-if="sortOrder === 'ASC'">▲</span>
                <span v-else>▼</span>
              </span>
            </th>
            <th class="px-6 py-3 text-left">Proveedores</th>
            <th class="px-6 py-3 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="producto in productos"
            :key="producto.id_producto"
            class="border-b last:border-none hover:bg-gray-100 transition-colors"
          >
            <td class="px-6 py-3 text-gray-800">{{ producto.nombre }}</td>
            <td class="px-6 py-3 text-gray-800">${{ producto.precio_compra }}</td>
            <td class="px-6 py-3 text-gray-800">${{ producto.precio_venta }}</td>
            <td class="px-6 py-3 text-gray-800">{{ producto.stock }}</td>
            <td class="px-6 py-3 text-gray-800">
              <ul>
                <li v-for="proveedor in producto.proveedores" :key="proveedor.id_proveedor">
                  {{ proveedor.nombre }}
                </li>
              </ul>
            </td>
            <td class="px-6 py-3 text-center">
              <button
                @click="openUpdateModal(producto)"
                class="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 focus:outline-none"
              >
                Actualizar
              </button>
              <button
                @click="onDelete(producto.id_producto)"
                class="ml-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-500 focus:outline-none"
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
          class="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Anterior
        </button>
        <span class="text-gray-700 font-medium">Página {{ currentPage }}</span>
        <button
          :disabled="!hasNextPage"
          @click="goToNextPage"
          class="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Siguiente
        </button>
      </div>
    </div>

    <!-- Modal para actualizar producto -->
    <UpdateProducto
      v-if="showUpdateModal"
      :isOpen="showUpdateModal"
      :producto="selectedProducto"
      @close="closeUpdateModal"
      @refresh="loadProductos"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { getProductosAction, deleteProductoAction } from '../actions/productos.action';
import UpdateProducto from './UpdateProductos.vue';
import type { Result } from '../interfaces/productosResponse.interface';

const productos = ref<Result[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const totalItems = ref(0);
const itemsPerPage = 10;
const currentPage = ref(1);

const sortField = ref('nombre');
const sortOrder = ref<'ASC' | 'DESC'>('ASC');

// Estado del modal de actualización
const showUpdateModal = ref(false);
const selectedProducto = ref<Result | null>(null);

// Calcular si hay una siguiente página
const hasNextPage = computed(() => totalItems.value > currentPage.value * itemsPerPage);

// Cargar productos
const loadProductos = async () => {
  loading.value = true;
  error.value = null;

  const offset = (currentPage.value - 1) * itemsPerPage;

  const response = await getProductosAction(itemsPerPage, offset, sortField.value, sortOrder.value);
  if (response.ok && response.data) {
    productos.value = response.data;
    totalItems.value = response.total || 0;
  } else {
    error.value = response.message || 'Error al cargar los productos.';
  }

  loading.value = false;
};

// Ordenar productos
const sortBy = (field: string) => {
  if (sortField.value === field) {
    sortOrder.value = sortOrder.value === 'ASC' ? 'DESC' : 'ASC';
  } else {
    sortField.value = field;
    sortOrder.value = 'ASC';
  }
  loadProductos();
};

// Manejar cambio a la página anterior
const goToPreviousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    loadProductos();
  }
};

// Manejar cambio a la página siguiente
const goToNextPage = () => {
  if (hasNextPage.value) {
    currentPage.value++;
    loadProductos();
  }
};

// Abrir el modal de actualización
const openUpdateModal = (producto: Result) => {
  selectedProducto.value = producto;
  showUpdateModal.value = true;
};

// Cerrar el modal de actualización
const closeUpdateModal = () => {
  showUpdateModal.value = false;
};

// Manejar eliminación de un producto
const onDelete = async (id_producto: string) => {
  const confirmDelete = confirm('¿Estás seguro de eliminar este producto?');
  if (confirmDelete) {
    const response = await deleteProductoAction(id_producto);
    if (response.ok) {
      alert('Producto eliminado correctamente.');
      loadProductos();
    } else {
      alert(response.message || 'Error al eliminar el producto.');
    }
  }
};

// Cargar productos al montar el componente
onMounted(() => {
  loadProductos();
});
</script>
