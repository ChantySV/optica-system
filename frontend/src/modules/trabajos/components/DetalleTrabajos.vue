<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div class="bg-white p-6 w-full max-w-lg rounded-lg shadow-lg overflow-auto">
      <h2 class="text-2xl font-bold mb-4">Detalle del Trabajo</h2>

      <div v-if="detalle">
        <p><strong>ID Detalle Trabajo:</strong> {{ detalle.data.id_detalleTrabajo }}</p>
        <p><strong>Distancia:</strong> {{ detalle.distancia ? 'Sí' : 'No' }}</p>
        <p><strong>Esférico Derecho:</strong> {{ detalle.esferico_derecho || 'No disponible' }}</p>
        <p><strong>Esférico Izquierdo:</strong> {{ detalle.esferico_izquierdo || 'No disponible' }}</p>
        <p><strong>Cilindro Derecho:</strong> {{ detalle.cilindro_derecho || 'No disponible' }}</p>
        <p><strong>Cilindro Izquierdo:</strong> {{ detalle.cilindro_izquierdo || 'No disponible' }}</p>
        <p><strong>Producto:</strong> {{ detalle.producto || 'No disponible' }}</p>
        <p><strong>Color:</strong> {{ detalle.color || 'No disponible' }}</p>
        <p><strong>Tratamiento:</strong> {{ detalle.tratamiento || 'No disponible' }}</p>
      </div>
      <div v-else>
        <p class="text-red-500">No se encontraron detalles para este trabajo.</p>
      </div>

      <div class="mt-4 flex justify-end">
        <button
          @click="closeModal"
          class="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 focus:outline-none"
        >
          Cerrar
        </button>
      </div>
    </div>
  </div>
</template>




<script setup lang="ts">
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  detalle: {
    type: Object,
    required: true,
  },
});


const emit = defineEmits(['close'])

const closeModal = () => {
  emit('close');
};
</script>
