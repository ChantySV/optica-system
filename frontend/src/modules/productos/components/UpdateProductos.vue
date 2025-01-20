<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div class="bg-white p-6 w-full max-w-md rounded-lg shadow-md">
      <h2 class="text-2xl font-semibold text-gray-800 mb-4 text-center">Actualizar Producto</h2>

      <form @submit.prevent="onSubmit" class="space-y-4">
        <!-- Campo: Nombre -->
        <div>
          <label for="nombre" class="block text-sm font-medium text-gray-700">Nombre del Producto</label>
          <input
            v-model="form.nombre"
            type="text"
            id="nombre"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            placeholder="Nombre del producto"
            required
          />
        </div>

        <!-- Campo: Stock -->
        <div>
          <label for="stock" class="block text-sm font-medium text-gray-700">Stock</label>
          <input
            v-model.number="form.stock"
            type="number"
            id="stock"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            placeholder="Cantidad en stock"
            required
            min="1"
          />
        </div>

        <!-- Campo: Precio de Compra -->
        <div>
          <label for="precio_compra" class="block text-sm font-medium text-gray-700">Precio de Compra</label>
          <input
            v-model.number="form.precio_compra"
            type="number"
            id="precio_compra"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            placeholder="Precio de compra"
            required
            step="0.01"
          />
        </div>

        <!-- Campo: Precio de Venta -->
        <div>
          <label for="precio_venta" class="block text-sm font-medium text-gray-700">Precio de Venta</label>
          <input
            v-model.number="form.precio_venta"
            type="number"
            id="precio_venta"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            placeholder="Precio de venta"
            required
            step="0.01"
          />
        </div>

        <!-- Campo: Proveedor -->
        <div>
          <label for="id_proveedor" class="block text-sm font-medium text-gray-700">Proveedor</label>
          <select
            v-model="form.id_proveedor"
            id="id_proveedor"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            required
          >
            <option v-for="proveedor in proveedores" :key="proveedor.id_proveedor" :value="proveedor.id_proveedor">
              {{ proveedor.nombre }}
            </option>
          </select>
        </div>

        <!-- Botones de acción -->
        <div class="flex justify-end space-x-4">
          <button
            type="button"
            @click="closeModal"
            class="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg shadow-sm hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-orange-500 text-white rounded-lg shadow-sm hover:bg-orange-600"
          >
            Actualizar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, watch } from 'vue';
import { updateProductoAction, getProveedoresNamesAction } from '../actions/productos.action';

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  producto: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['close', 'refresh']);

// Formulario reactivo basado en el producto seleccionado
const form = reactive({
  nombre: '',
  stock: 1,
  precio_compra: 0.0,
  precio_venta: 0.0,
  id_proveedor: '',
});

// Lista de proveedores
const proveedores = ref<{ id_proveedor: string; nombre: string }[]>([]);

// Cargar proveedores al montar el componente
const loadProveedores = async () => {
  const response = await getProveedoresNamesAction();
  if (response.ok && response.data) {
    proveedores.value = response.data;
  } else {
    console.error('Error al cargar proveedores:');
  }
};
// Inicializar formulario con los datos del producto
watch(
  () => props.producto,
  (newProducto) => {
    if (newProducto) {
      Object.assign(form, {
        nombre: newProducto.nombre,
        stock: newProducto.stock,
        precio_compra: newProducto.precio_compra,
        precio_venta: newProducto.precio_venta,
        id_proveedor: newProducto.proveedores?.[0]?.id_proveedor || '',
      });
    }
  },
  { immediate: true }
);

// Cerrar modal
const closeModal = () => {
  emit('close');
};

// Manejar envío del formulario
const onSubmit = async () => {
  const response = await updateProductoAction(props.producto.id_producto, { ...form });
  if (response.ok) {
    alert('Producto actualizado exitosamente.');
    emit('refresh');
    closeModal();
  } else {
    alert(response.message || 'Error al actualizar producto.');
  }
};

// Inicializar
onMounted(() => {
  loadProveedores();
});
</script>
