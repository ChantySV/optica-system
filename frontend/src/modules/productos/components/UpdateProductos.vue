<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div class="bg-white p-6 w-full max-w-md rounded-lg shadow-md">
      <h2 class="text-2xl font-semibold text-gray-800 mb-4 text-center">Actualizar Producto</h2>

 <!--  FORM  -->
 <form @submit.prevent="onSubmit" class="space-y-4">
        <div>
          <label for="nombre" class="block text-sm font-medium text-gray-700">
            Nombre del Producto
          </label>
          <input v-model="form.nombre" type="text" id="nombre"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            placeholder="Nombre del producto" />
          <p v-if="v$.nombre.$error" class="text-red-500 text-sm">
            {{ v$.nombre.$errors[0].$message }}
          </p>
        </div>

        <!-- Stock -->
        <div>
          <label for="stock" class="block text-sm font-medium text-gray-700">
            Stock
          </label>
          <input v-model.number="form.stock" type="number" id="stock"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            placeholder="Cantidad en stock" />
          <p v-if="v$.stock.$error" class="text-red-500 text-sm">
            {{ v$.stock.$errors[0].$message }}
          </p>
        </div>


        <!-- Precio Compra -->
        <div>
          <label for="precio_compra" class="block text-sm font-medium text-gray-700">
            Precio de Compra
          </label>
          <input v-model.number="form.precio_compra" type="number" id="precio_compra"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            placeholder="Precio de compra" required step="0.01" />
          <p v-if="v$.precio_compra.$error" class="text-red-500 text-sm">
            {{ v$.precio_compra.$errors[0].$message }}
          </p>
        </div>

        <!-- Precio Venta -->
        <div>
          <label for="precio_venta" class="block text-sm font-medium text-gray-700">
            Precio de Venta
          </label>
          <input v-model.number="form.precio_venta" type="number" id="precio_venta"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            placeholder="Precio de venta" step="0.01" />
          <p v-if="v$.precio_venta.$error" class="text-red-500 text-sm">
            {{ v$.precio_venta.$errors[0].$message }}
          </p>
        </div>

        <!-- Proveedor -->
        <div>
          <label for="id_proveedor" class="block text-sm font-medium text-gray-700">
            Proveedor
          </label>
          <select v-model="form.id_proveedor" id="id_proveedor"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
            <option value="" disabled>Selecciona un proveedor</option>
            <option v-for="proveedor in proveedores" :key="proveedor.id_proveedor" :value="proveedor.id_proveedor">
              {{ proveedor.nombre }}
            </option>
          </select>
        </div>

        <div class="flex justify-end space-x-4">
          <button type="button" @click="closeModal"
            class="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg shadow-sm hover:bg-gray-400">
            Cancelar
          </button>
          <button type="submit" class="px-4 py-2 bg-orange-500 text-white rounded-lg shadow-sm hover:bg-orange-600">
            Agregar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, watch, computed } from 'vue';
import { updateProductoAction, getProveedoresNamesAction } from '../actions/productos.action';
import useVuelidate from '@vuelidate/core';
import { getValidationRules } from '../validators/createProductos.validator';
import { useToast } from 'vue-toastification'

const toast = useToast()

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



const form = reactive({
  nombre: '',
  stock: 1,
  precio_compra: 0.0,
  precio_venta: 0.0,
  id_proveedor: '',
});

const rules = computed(() => getValidationRules(form));

const v$ = useVuelidate(rules, form);

const proveedores = ref<{ id_proveedor: string; nombre: string }[]>([]);

const loadProveedores = async () => {
  const response = await getProveedoresNamesAction();
  if (response.ok && response.data) {
    proveedores.value = response.data;
  } else {
    console.error('Error al cargar proveedores:');
  }
};

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

const closeModal = () => {
  emit('close');
};

const onSubmit = async () => {
  const isValid = await v$.value.$validate();
  if (!isValid) {
    toast.error("Corrige los errores antes de enviar el formulario.");
    return;
  }
  const response = await updateProductoAction(props.producto.id_producto, { ...form });
  if (response.ok) {
    toast.success('Producto actualizado exitosamente.');
    emit('refresh');
    closeModal();
  } else {
    toast.error('Error al actualizar producto.');
  }
};

onMounted(() => {
  loadProveedores();
});
</script>
