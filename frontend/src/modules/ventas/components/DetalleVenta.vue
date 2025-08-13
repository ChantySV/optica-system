<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div class="bg-white p-6 w-full max-w-4xl rounded-lg shadow-lg overflow-auto">
      <!-- Título -->
      <h2 class="text-2xl font-bold text-gray-800 mb-6">Detalle de Venta</h2>

      <!-- Contenido -->
      <div v-if="detalle">
        <p><strong>ID Venta:</strong> {{ detalle.id_venta }}</p>
        <p><strong>Fecha Venta:</strong> {{ formatDate(detalle.fecha_venta) }}</p>
        <p><strong>Monto Total:</strong> {{ detalle.monto_total }}</p>

        <h3 class="text-lg font-semibold mt-4 mb-2">Detalles de Trabajos</h3>
        <table class="w-full border border-gray-300 text-left">
          <thead class="bg-gray-100 text-gray-800">
            <tr>
              <th class="border px-4 py-2">Número de Trabajo</th>
              <th class="border px-4 py-2">Estado</th>
              <th class="border px-4 py-2">Producto</th>
              <th class="border px-4 py-2">Precio de Venta</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in detalle.detalleVentas"
              :key="item.numero_trabajo"
              class="hover:bg-gray-50"
            >
              <td class="border px-4 py-2">{{ item.numero_trabajo }}</td>
              <td class="border px-4 py-2">{{ item.estado }}</td>
              <td class="border px-4 py-2">{{ item.producto.nombre_producto }}</td>
              <td class="border px-4 py-2">{{ item.producto.precio_venta }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-else class="text-gray-500">
        <p>Cargando datos...</p>
      </div>

      <!-- Botón Cerrar -->
      <div class="mt-6 flex justify-end">
        <button
          @click="closeModal"
          class="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 focus:outline-none"
        >
          Cerrar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { findDetalleVenta } from '../actions/venta.action';
import type { DetalleResponseInterfaceTs } from '../interfaces/DetalleResponse.interface';

// Props para el Modal
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  idVenta: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['close']);

// Datos del Detalle de Venta
const detalle = ref<DetalleResponseInterfaceTs | null>(null);

// Función para cerrar el modal
const closeModal = () => {
  emit('close');
  detalle.value = null;
};

// Formatear Fecha
const formatDate = (date: Date | string): string => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString('es-ES', options);
};

// Cargar Detalle de Venta
const loadDetalle = async () => {
  try {
    const response = await findDetalleVenta(props.idVenta);
    if (response.ok && response.data) {
      detalle.value = response.data;
    } else {
      console.error('Error al cargar el detalle de la venta:', response.message);
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);
  }
};

// Cargar datos cuando el modal se abre
if (props.isOpen) {
  loadDetalle();
}
</script>
