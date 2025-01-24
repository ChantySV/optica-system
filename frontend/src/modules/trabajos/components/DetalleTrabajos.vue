<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div class="bg-white rounded-lg w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 p-8 overflow-auto max-h-screen shadow-lg">
      <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">Detalle del Trabajo</h2>

      <div v-if="trabajo">
        <!-- Información General -->
        <div class="mb-6">
          <h3 class="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">Información General</h3>
          <div class="grid grid-cols-2 gap-4">
            <p><strong>Número de Trabajo:</strong> {{ trabajo.numero_trabajo }}</p>
            <p><strong>Estado:</strong> {{ capitalize(trabajo.estado) }}</p>
            <p><strong>Fecha de Entrada:</strong> {{ formatDate(trabajo.fecha_entrada) }}</p>
            <p><strong>Fecha de Salida:</strong> {{ trabajo.fecha_salida ? formatDate(trabajo.fecha_salida) : 'No disponible' }}</p>
          </div>
        </div>

        <!-- Personal -->
        <div class="mb-6">
          <h3 class="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">Personal</h3>
          <div class="grid grid-cols-2 gap-4">
            <p><strong>Nombre:</strong> {{ formatPersonal(trabajo.personal) }}</p>
          </div>
        </div>

        <!-- Detalle del Trabajo -->
        <div class="mb-6">
          <h3 class="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">Detalle del Trabajo</h3>
          <div class="grid grid-cols-2 gap-4">
            <p><strong>Distancia:</strong> {{ trabajo.detalleTrabajo.distancia ? 'Sí' : 'No' }}</p>
            <p><strong>Esférico Derecho:</strong> {{ trabajo.detalleTrabajo.esferico_derecho || 'N/A' }}</p>
            <p><strong>Esférico Izquierdo:</strong> {{ trabajo.detalleTrabajo.esferico_izquierdo || 'N/A' }}</p>
            <p><strong>Cilindro Derecho:</strong> {{ trabajo.detalleTrabajo.cilindro_derecho || 'N/A' }}</p>
            <p><strong>Cilindro Izquierdo:</strong> {{ trabajo.detalleTrabajo.cilindro_izquierdo || 'N/A' }}</p>
            <p><strong>Eje Derecho:</strong> {{ trabajo.detalleTrabajo.eje_derecho !== null ? trabajo.detalleTrabajo.eje_derecho : 'N/A' }}</p>
            <p><strong>Eje Izquierdo:</strong> {{ trabajo.detalleTrabajo.eje_izquierdo !== null ? trabajo.detalleTrabajo.eje_izquierdo : 'N/A' }}</p>
            <p><strong>Prisma Derecho:</strong> {{ trabajo.detalleTrabajo.prisma_derecho !== null ? trabajo.detalleTrabajo.prisma_derecho : 'N/A' }}</p>
            <p><strong>Prisma Izquierdo:</strong> {{ trabajo.detalleTrabajo.prisma_izquierdo !== null ? trabajo.detalleTrabajo.prisma_izquierdo : 'N/A' }}</p>
            <p><strong>Base Derecho:</strong> {{ trabajo.detalleTrabajo.base_derecho !== null ? trabajo.detalleTrabajo.base_derecho : 'N/A' }}</p>
            <p><strong>Base Izquierdo:</strong> {{ trabajo.detalleTrabajo.base_izquierdo !== null ? trabajo.detalleTrabajo.base_izquierdo : 'N/A' }}</p>
            <p><strong>Adición Derecho:</strong> {{ trabajo.detalleTrabajo.adicion_derecho !== null ? trabajo.detalleTrabajo.adicion_derecho : 'N/A' }}</p>
            <p><strong>Adición Izquierdo:</strong> {{ trabajo.detalleTrabajo.adicion_izquierdo !== null ? trabajo.detalleTrabajo.adicion_izquierdo : 'N/A' }}</p>
            <p><strong>Altura Derecho:</strong> {{ trabajo.detalleTrabajo.altura_derecho !== null ? trabajo.detalleTrabajo.altura_derecho : 'N/A' }}</p>
            <p><strong>Altura Izquierdo:</strong> {{ trabajo.detalleTrabajo.altura_izquierdo !== null ? trabajo.detalleTrabajo.altura_izquierdo : 'N/A' }}</p>
            <p><strong>DIP Derecho:</strong> {{ trabajo.detalleTrabajo.dip_derecho || 'N/A' }}</p>
            <p><strong>DIP Izquierdo:</strong> {{ trabajo.detalleTrabajo.dip_izquierdo || 'N/A' }}</p>
          </div>
        </div>

        <!-- Producto -->
        <div class="mb-6">
          <h3 class="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">Producto</h3>
          <div class="grid grid-cols-2 gap-4">
            <p><strong>Nombre:</strong> {{ trabajo.detalleTrabajo.producto.nombre }}</p>
          </div>
        </div>

        <!-- Tratamiento -->
        <div class="mb-6" v-if="trabajo.detalleTrabajo.tratamiento">
          <h3 class="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">Tratamiento</h3>
          <div class="grid grid-cols-2 gap-4">
            <p><strong>Nombre:</strong> {{ trabajo.detalleTrabajo.tratamiento.nombre }}</p>
            <p><strong>Descripción:</strong> {{ trabajo.detalleTrabajo.tratamiento.descripcion }}</p>
          </div>
        </div>

        <!-- Color -->
        <div class="mb-6" v-if="trabajo.detalleTrabajo.color">
          <h3 class="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">Color</h3>
          <div class="grid grid-cols-2 gap-4">
            <p><strong>Nombre:</strong> {{ trabajo.detalleTrabajo.color.nombre }}</p>
          </div>
        </div>
      </div>

      <!-- Botón Cerrar -->
      <div class="flex justify-end">
        <button
          @click="close"
          class="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 focus:outline-none"
        >
          Cerrar
        </button>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import type { Trabajo } from '../interfaces/TrabajosResponse.interface';

// Definir las props
const props = defineProps<{
  isOpen: boolean;
  trabajo: Trabajo | null;
}>();

// Definir los eventos emitidos
const emit = defineEmits<{
  (e: 'close'): void;
}>();

// Función para cerrar el modal
const close = () => {
  emit('close');
};

// Función para formatear fechas
const formatDate = (date: Date | string): string => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString('es-ES', options);
};

// Función para formatear la información del personal
const formatPersonal = (personal: Trabajo['personal']): string => {
  const apellidoMaterno = personal.apellido_materno ? ` ${personal.apellido_materno}` : '';
  return `${personal.nombres} ${personal.apellido_paterno}${apellidoMaterno}`;
};

// Función para capitalizar el estado
const capitalize = (word: string): string => {
  if (!word) return '';
  return word.charAt(0).toUpperCase() + word.slice(1);
};
</script>
