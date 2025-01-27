<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
      <h2 class="text-2xl font-bold mb-4 text-center">Actualizar Tratamiento</h2>
      <form @submit.prevent="submitUpdate">
        <div class="mb-4">
          <label class="block text-gray-700 mb-2" for="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            v-model="form.nombre"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
            placeholder="Ingresa el nombre"
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2" for="descripcion">Descripción</label>
          <textarea
            id="descripcion"
            v-model="form.descripcion"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Ingresa la descripción"
          ></textarea>
        </div>
        <div class="flex justify-end mt-6">
          <button
            type="button"
            @click="closeModal"
            class="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 focus:outline-none mr-2"
          >
            Cancelar
          </button>
          <button
            type="submit"
            :disabled="loading"
            class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none disabled:bg-blue-300"
          >
            Actualizar
          </button>
        </div>
      </form>
      <div v-if="loading" class="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 rounded-lg">
        <svg class="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          ></path>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { updateTratamiento } from '../../actions/admin-tratamientos.action';
import { useToast } from 'vue-toastification';
import type { TratamientoInterface } from '../../interfaces/tratamientoResponse.interface';

const props = defineProps<{
  tratamiento: TratamientoInterface | null;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'updated'): void;
}>();

const form = ref({
  nombre: '',
  descripcion: '',
});

const loading = ref(false);
const toast = useToast();

const closeModal = () => {
  emit('close');
};

const populateForm = () => {
  if (props.tratamiento) {
    form.value.nombre = props.tratamiento.nombre;
    form.value.descripcion = props.tratamiento.descripcion;
  }
};

const submitUpdate = async () => {
  if (!props.tratamiento) {
    toast.error('No hay un tratamiento seleccionado para actualizar.');
    return;
  }

  loading.value = true;
  try {
    const payload = {
      nombre: form.value.nombre,
      descripcion: form.value.descripcion,
    };

    const response = await updateTratamiento(props.tratamiento.id_tratamiento, payload);

    if (response.ok) {
      toast.success('Tratamiento actualizado exitosamente.');
      emit('updated');
      closeModal();
    } else {
      toast.error(response.message || 'Error al actualizar el tratamiento.');
    }
  } catch (error: any) {
    console.error('Error al actualizar tratamiento:', error);
    toast.error(error.message || 'Error al actualizar el tratamiento.');
  } finally {
    loading.value = false;
  }
};

watch(
  () => props.tratamiento,
  () => {
    populateForm();
  }
);

onMounted(() => {
  populateForm();
});
</script>
