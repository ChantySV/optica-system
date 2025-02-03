<template>
  <div v-if="trabajo" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div class="bg-white rounded-lg w-11/12 md:w-3/4 lg:w-1/2 p-6 overflow-auto max-h-screen">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold mb-4">Detalles del Trabajo</h2>
        <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700 focus:outline-none">&times;</button>
      </div>
      <div class="space-y-4">
        <div><strong>Número de Trabajo:</strong> {{ trabajo.numero_trabajo }}</div>
        <div><strong>Fecha de Entrada:</strong> {{ formatDate(trabajo.fecha_entrada) }}</div>
        <div><strong>Estado:</strong> {{ trabajo.estado }}</div>
        <div><strong>Personal Encargado:</strong> {{ trabajo.personal?.nombres || 'N/A' }}</div>
        <div><strong>Detalle de Trabajo:</strong>
          <ul class="list-disc list-inside">
            <li><strong>Producto:</strong> {{ trabajo.detalleTrabajo?.producto?.nombre || 'N/A' }}</li>
            <li><strong>Color:</strong> {{ trabajo.detalleTrabajo?.color?.nombre || 'N/A' }}</li>
            <li><strong>Tratamiento:</strong> {{ trabajo.detalleTrabajo?.tratamiento?.nombre || 'N/A' }}</li>
            <li><strong>Distancia:</strong> {{ trabajo.detalleTrabajo?.distancia ? 'Sí' : 'No' }}</li>
            <li><strong>Adición:</strong> {{ trabajo.detalleTrabajo?.adicion || 'N/A' }}</li>
            <li><strong>Base:</strong> {{ trabajo.detalleTrabajo?.base || 'N/A' }}</li>
            <li><strong>Esférico Derecho:</strong> {{ trabajo.detalleTrabajo?.esferico_derecho || 'N/A' }}</li>
            <li><strong>Esférico Izquierdo:</strong> {{ trabajo.detalleTrabajo?.esferico_izquierdo || 'N/A' }}</li>
            <li><strong>Cilindro Derecho:</strong> {{ trabajo.detalleTrabajo?.cilindro_derecho || 'N/A' }}</li>
            <li><strong>Cilindro Izquierdo:</strong> {{ trabajo.detalleTrabajo?.cilindro_izquierdo || 'N/A' }}</li>
            <li><strong>Eje Derecho:</strong> {{ trabajo.detalleTrabajo?.eje_derecho || 'N/A' }}</li>
            <li><strong>Eje Izquierdo:</strong> {{ trabajo.detalleTrabajo?.eje_izquierdo || 'N/A' }}</li>
          </ul>
        </div>
        <div v-if="trabajo.detalleVenta">
          <strong>Detalle de Venta:</strong>
          <ul class="list-disc list-inside">
            <li><strong>ID Detalle Venta:</strong> {{ trabajo.detalleVenta.id_detalleVenta }}</li>
          </ul>
        </div>
      </div>
      <div class="flex justify-end mt-6">
        <button @click="$emit('close')" class="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 focus:outline-none">
          Cerrar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Trabajo } from '../interfaces/TrabajosResponse.interface';

const props = defineProps<{
  trabajo: Trabajo | null;
}>();

const formatDate = (date: string) => {
  if (!date) return '';
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString('es-ES', options);
};
</script>
