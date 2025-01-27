<!-- src/components/UpdatePersonaModal.vue -->

<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
      <h2 class="text-2xl font-semibold text-gray-800 mb-4">Actualizar Persona Jurídica</h2>

      <form @submit.prevent="submitUpdate">
        <!-- Nombres -->
        <div class="mb-4">
          <label class="block text-gray-700 font-medium mb-2" for="nombres">Nombres</label>
          <input
            id="nombres"
            v-model="form.nombres"
            type="text"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            required
            @input="validateLetters($event, 'nombres')"
            placeholder="Ingrese solo letras"
          />
        </div>

        <!-- Apellido Paterno -->
        <div class="mb-4">
          <label class="block text-gray-700 font-medium mb-2" for="apellido_paterno">Apellido Paterno</label>
          <input
            id="apellido_paterno"
            v-model="form.apellido_paterno"
            type="text"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            required
            @input="validateLetters($event, 'apellido_paterno')"
            placeholder="Ingrese solo letras"
          />
        </div>

        <!-- Apellido Materno -->
        <div class="mb-4">
          <label class="block text-gray-700 font-medium mb-2" for="apellido_materno">Apellido Materno</label>
          <input
            id="apellido_materno"
            v-model="form.apellido_materno"
            type="text"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            @input="validateLetters($event, 'apellido_materno')"
            placeholder="Ingrese solo letras (opcional)"
          />
        </div>

        <!-- Email -->
        <div class="mb-4">
          <label class="block text-gray-700 font-medium mb-2" for="email">Email</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            placeholder="Ingrese un email válido"
          />
        </div>

        <!-- Teléfono -->
        <div class="mb-4">
          <label class="block text-gray-700 font-medium mb-2" for="telefono">Teléfono</label>
          <input
            id="telefono"
            v-model.number="form.telefono"
            type="text"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            @input="validateNumbers($event, 'telefono')"
            placeholder="Ingrese solo números"
          />
        </div>

        <!-- Tipo de Persona -->
        <div class="mb-4">
          <label class="block text-gray-700 font-medium mb-2" for="tipo_persona">Tipo de Persona</label>
          <select
            id="tipo_persona"
            v-model="form.tipo_persona"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            required
          >
            <option value="">Seleccione una opción</option>
            <option value="juridica">Jurídica</option>
            <option value="natural">Natural</option>
            <!-- Añade más opciones según sea necesario -->
          </select>
        </div>

        <!-- Botones -->
        <div class="flex justify-end gap-4">
          <button
            type="button"
            @click="$emit('close')"
            class="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Cancelar
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
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
import { useToast } from 'vue-toastification';
import type { personalInteface } from '../interfaces/personalResponse.interface';
import { updatePersona } from '../actions/admin.action';

// Props
const props = defineProps<{
  persona: personalInteface | null;
}>();

// Emits
const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'updated'): void;
}>();

// Toast
const toast = useToast();

// Formulario
const form = ref({
  nombres: props.persona?.nombres || '',
  apellido_paterno: props.persona?.apellido_paterno || '',
  apellido_materno: props.persona?.apellido_materno || '',
  email: props.persona?.email || null,
  telefono: props.persona?.telefono || '',
  tipo_persona: props.persona?.tipo_persona || '',
});

// Re-inicializar el formulario cuando cambia la prop 'persona'
watch(() => props.persona, (newPersona) => {
  if (newPersona) {
    form.value.nombres = newPersona.nombres || '';
    form.value.apellido_paterno = newPersona.apellido_paterno || '';
    form.value.apellido_materno = newPersona.apellido_materno || '';
    form.value.email = newPersona.email || '';
    form.value.telefono = newPersona.telefono || '';
    form.value.tipo_persona = newPersona.tipo_persona || '';
  }
});

// Función para validar que solo se ingresen letras
const validateLetters = (event: Event, field: string) => {
  const input = event.target as HTMLInputElement;
  // Permitir letras, espacios y acentos
  const regex = /^[A-Za-záéíóúÁÉÍÓÚüÜñÑ\s]*$/;
  if (!regex.test(input.value)) {
    input.value = input.value.replace(/[^A-Za-záéíóúÁÉÍÓÚüÜñÑ\s]/g, '');
    toast.error(`Error en ${field}: Solo se permiten letras.`);
  }
};

// Función para validar que solo se ingresen números
const validateNumbers = (event: Event, field: string) => {
  const input = event.target as HTMLInputElement;
  // Permitir solo dígitos
  const regex = /^[0-9]*$/;
  if (!regex.test(input.value)) {
    input.value = input.value.replace(/[^0-9]/g, '');
    toast.error(`Error en ${field}: Solo se permiten números.`);
  }
};

// Función para enviar el formulario
const submitUpdate = async () => {
  // Validar campos requeridos manualmente
  if (
    !form.value.nombres.trim() ||
    !form.value.apellido_paterno.trim() ||
    !form.value.tipo_persona.trim()
  ) {
    toast.error('Por favor, complete todos los campos requeridos.');
    return;
  }

  const letterFields = ['nombres', 'apellido_paterno', 'apellido_materno'];
  for (const field of letterFields) {
    if (form.value[field] && !/^[A-Za-záéíóúÁÉÍÓÚüÜñÑ\s]+$/.test(form.value[field])) {
      toast.error(`Error en ${field}: Solo se permiten letras.`);
      return;
    }
  }

  if (form.value.telefono && !/^[0-9]+$/.test(form.value.telefono)) {
    toast.error('Error en teléfono: Solo se permiten números.');
    return;
  }

  if (form.value.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    toast.error('Error en email: Formato de email inválido.');
    return;
  }

  try {
    if (!props.persona) {
      toast.error('No se proporcionó la persona a actualizar.');
      return;
    }

    const updatedPersonaResponse = await updatePersona(props.persona.id_personal, form.value);

    if (updatedPersonaResponse.ok && updatedPersonaResponse.data) {
      toast.success('Persona actualizada con éxito.');
      emit('updated');
      emit('close');
    } else {
      toast.error(updatedPersonaResponse.message || 'Error al actualizar la persona.');
    }
  } catch (error) {
    console.error(error);
    toast.error('Ocurrió un error al actualizar la persona.');
  }
};
</script>
