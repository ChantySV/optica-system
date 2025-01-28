<!-- src/components/ConfirmDeleteModal.vue -->

<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div class="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/3">
      <h2 class="text-2xl font-semibold text-gray-700 mb-4">Confirmar Eliminación</h2>
      <p class="text-gray-600">
        ¿Estás seguro de que deseas {{ trabajo.activo ? 'eliminar' : 'restaurar' }} el Trabajo número {{ trabajo.numero_trabajo }}?
      </p>

      <div class="flex justify-end mt-6 space-x-4">
        <button
          @click="$emit('close')"
          class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none"
        >
          Cancelar
        </button>
        <button
          @click="handleDelete"
          :class="trabajo.activo ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'"
          class="px-4 py-2 text-white rounded-lg focus:outline-none"
        >
          {{ trabajo.activo ? 'Eliminar' : 'Restaurar' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Trabajo } from '../interfaces/TrabajosResponse.interface';
import { removeTrabajo } from '../actions/trabajos.action';
import { useToast } from 'vue-toastification';

const props = defineProps<{
  trabajo: Trabajo | null;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'deleted'): void;
}>();

const toast = useToast();

// Función para manejar la eliminación o restauración
const handleDelete = async () => {
  if (!props.trabajo) return;

  try {
    const response = await removeTrabajo(props.trabajo.id_trabajo);
    if (response.ok) {
      toast.success(response.message);
      emit('deleted');
      emit('close');
    } else {
      toast.error(response.message || `Error al ${props.trabajo.activo ? 'eliminar' : 'restaurar'} el trabajo.`);
    }
  } catch (error: any) {
    toast.error(error.message || `Error al ${props.trabajo.activo ? 'eliminar' : 'restaurar'} el trabajo.`);
  }
};
</script>

<style scoped>
/* Estilos para el modal */
</style>
