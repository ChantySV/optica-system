<template>
  <div v-if="trabajo" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div class="bg-white rounded-lg w-11/12 md:w-3/4 lg:w-1/2 p-6 max-h-screen overflow-auto shadow-lg">

      <!-- Encabezado -->
      <div class="flex justify-between items-center mb-6 border-b pb-3">
        <h2 class="text-2xl font-semibold text-gray-800">Detalles del Trabajo</h2>
        <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
      </div>

      <!-- Información Principal -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p><strong>Número de Trabajo:</strong> {{ trabajo.numero_trabajo }}</p>
          <p><strong>Fecha de Entrada:</strong> {{ formatDate(trabajo.fecha_entrada) }}</p>
          <p><strong>Estado:</strong> {{ trabajo.estado }}</p>
          <p><strong>Personal Encargado:</strong> {{ trabajo.personal?.nombres || 'N/A' }}</p>
        </div>
        <div>
          <p><strong>Producto:</strong> {{ trabajo.detalleTrabajo?.producto?.nombre || 'N/A' }}</p>
          <p><strong>Color:</strong> {{ trabajo.detalleTrabajo?.color?.nombre || 'N/A' }}</p>
          <p><strong>Tratamiento:</strong> {{ trabajo.detalleTrabajo?.tratamiento?.nombre || 'N/A' }}</p>
          <p><strong>Distancia:</strong> {{ trabajo.detalleTrabajo?.distancia ? 'Sí' : 'No' }}</p>
        </div>
      </div>

      <!-- Detalles Técnicos -->
      <div class="mt-4 bg-gray-100 p-4 rounded-lg">
        <h3 class="text-lg font-semibold text-gray-700 mb-2">Detalles Técnicos</h3>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
          <p><strong>Adición:</strong> {{ trabajo.detalleTrabajo?.adicion || 'N/A' }}</p>
          <p><strong>Base:</strong> {{ trabajo.detalleTrabajo?.base || 'N/A' }}</p>
          <p><strong>Esférico Derecho:</strong> {{ trabajo.detalleTrabajo?.esferico_derecho || 'N/A' }}</p>
          <p><strong>Esférico Izquierdo:</strong> {{ trabajo.detalleTrabajo?.esferico_izquierdo || 'N/A' }}</p>
          <p><strong>Cilindro Derecho:</strong> {{ trabajo.detalleTrabajo?.cilindro_derecho || 'N/A' }}</p>
          <p><strong>Cilindro Izquierdo:</strong> {{ trabajo.detalleTrabajo?.cilindro_izquierdo || 'N/A' }}</p>
          <p><strong>Eje Derecho:</strong> {{ trabajo.detalleTrabajo?.eje_derecho || 'N/A' }}</p>
          <p><strong>Eje Izquierdo:</strong> {{ trabajo.detalleTrabajo?.eje_izquierdo || 'N/A' }}</p>
        </div>
      </div>

      <!-- Botón de Cierre -->
      <div class="flex justify-end mt-6">
        <button @click="$emit('close')" class="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
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
