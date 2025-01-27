<!-- src/components/UpdateUsuarioModal.vue -->

<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white p-6 rounded-lg shadow-lg w-1/3">
      <h2 class="text-2xl font-bold mb-4">Actualizar Usuario</h2>
      <form @submit.prevent="submitUpdate">
        <div class="mb-4">
          <label class="block text-gray-700">Nombre de Usuario</label>
          <input
            type="text"
            v-model="form.nombre_usuario"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            required
          />
        </div>

        <div class="mb-4">
          <label class="block text-gray-700">Rol</label>
          <select
            v-model="form.id_rol"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            required
          >
            <option value="" disabled>Selecciona un rol</option>
            <option v-for="rol in roles" :key="rol.id_rol" :value="rol.id_rol">
              {{ rol.nombre_rol }}
            </option>
          </select>
        </div>

        <div class="mb-4">
          <label class="block text-gray-700">Nombres</label>
          <input
            type="text"
            v-model="form.nombres"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            required
          />
        </div>

        <div class="flex justify-end">
          <button
            type="button"
            @click="$emit('close')"
            class="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 focus:outline-none mr-2"
          >
            Cancelar
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            Actualizar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { findAllRoles } from '../../actions/admin-usuarios.action';
import {backendApi }from '@/api/backendApi';
import { useToast } from 'vue-toastification';
import type { Datum } from '../../interfaces/usuariosResponse.interface';

const props = defineProps<{
  usuario: Datum | null;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'updated'): void;
}>();

const toast = useToast();

// Datos del formulario
const form = ref({
  nombre_usuario: '',
  id_rol: '',
  nombres: '',
});

// Lista de roles
const roles = ref([]);

// Función para cargar roles
const loadRoles = async () => {
  const response = await findAllRoles();
  if (response.ok) {
    roles.value = response.data;
  } else {
    toast.error(response.message || 'No se pudieron cargar los roles.');
  }
};

// Función para cargar datos del usuario en el formulario
const populateForm = () => {
  if (props.usuario) {
    form.value.nombre_usuario = props.usuario.nombre_usuario;
    form.value.id_rol = props.usuario.role.nombre_rol; // Asegúrate de que este campo es el correcto
    form.value.nombres = props.usuario.personal.nombres;
  }
};

// Submit del formulario de actualización
const submitUpdate = async () => {
  if (!props.usuario) {
    toast.error('No hay un usuario seleccionado para actualizar.');
    return;
  }

  try {
    const payload = {
      nombre_usuario: form.value.nombre_usuario,
      nombre_rol: form.value.id_rol,
      nombres: form.value.nombres,
    };

    const response = await backendApi.patch(`/usuarios/${props.usuario.nombre_usuario}`, payload);

    if (response.data.ok) {
      toast.success('Usuario actualizado exitosamente.');
      emit('updated');
      emit('close');
    } else {
      toast.error(response.data.message || 'Error al actualizar el usuario.');
    }
  } catch (error: any) {
    console.error('Error al actualizar usuario:', error);
    toast.error(error.response?.data?.message || 'Error al actualizar el usuario.');
  }
};

// Cargar roles y poblar formulario al montar el componente
onMounted(() => {
  loadRoles();
  populateForm();
});

// Actualizar formulario si cambia el usuario
watch(
  () => props.usuario,
  () => {
    populateForm();
  }
);
</script>
