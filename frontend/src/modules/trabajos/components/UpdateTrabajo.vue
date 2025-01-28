<!-- src/components/TrabajoUpdateModal.vue -->

<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div class="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-semibold text-gray-700">Actualizar Trabajo</h2>
        <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700 focus:outline-none">
          &times;
        </button>
      </div>

      <form @submit.prevent="submitForm">
        <div class="space-y-4">
          <div>
            <label for="fecha_salida" class="block text-gray-700">Fecha de Salida</label>
            <input
              type="date"
              id="fecha_salida"
              v-model="form.fecha_salida"
              class="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div>
            <label for="estado" class="block text-gray-700">Estado</label>
            <select
              id="estado"
              v-model="form.estado"
              class="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <option value="pendiente">Pendiente</option>
              <option value="completado">Completado</option>
              <option value="cancelado">Cancelado</option>
            </select>
          </div>
        </div>

        <div class="flex justify-end mt-6 space-x-4">
          <button
            type="button"
            @click="$emit('close')"
            class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none"
          >
            Cancelar
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none"
          >
            Actualizar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Trabajo } from '../interfaces/TrabajosResponse.interface';
import { updateTrabajo } from '../actions/trabajos.action';
import { useToast } from 'vue-toastification';

const props = defineProps<{
  trabajo: Trabajo | null;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'updated'): void;
}>();

const toast = useToast();

// Estado del formulario
const form = ref({
  fecha_salida: '',
  estado: '',
  activo: true,
});

// Inicializar el formulario cuando cambia el Trabajo seleccionado
watch(() => props.trabajo, (newTrabajo) => {
  if (newTrabajo) {
    form.value.fecha_salida = newTrabajo.fecha_salida ? newTrabajo.fecha_salida.split('T')[0] : '';
    form.value.estado = newTrabajo.estado;
    form.value.activo = newTrabajo.activo;
  }
});

// Función para enviar el formulario
const submitForm = async () => {
  if (!props.trabajo) return;

  try {
    const response = await updateTrabajo(props.trabajo.id_trabajo, form.value);
    if (response.ok) {
      toast.success('Trabajo actualizado exitosamente.');
      emit('updated');
      emit('close');
    } else {
      toast.error(response.message || 'Error al actualizar el trabajo.');
    }
  } catch (error: any) {
    toast.error(error.message || 'Error al actualizar el trabajo.');
  }
};
</script>

<style scoped>
/* Estilos para el modal */
</style>
