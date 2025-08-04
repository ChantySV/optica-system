<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white p-6 rounded-lg shadow-lg w-1/3">
      <h2 class="text-2xl font-bold mb-4">Actualizar Usuario</h2>
      <form @submit.prevent="submitUpdate">
        <!-- Nombre de Usuario -->
        <div class="mb-4">
          <label class="block text-gray-700">Nombre de Usuario</label>
          <input
            type="text"
            v-model="form.nombre_usuario"
            class="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:outline-none"
            :class="{
              'border-red-500': v$.nombre_usuario.$error,
              'border-gray-300': !v$.nombre_usuario.$error
            }"
          />
          <p v-if="v$.nombre_usuario.$error" class="text-red-500 text-sm">
            {{ v$.nombre_usuario.$errors[0].$message }}
          </p>
        </div>

        <!-- Rol -->
        <div class="mb-4">
          <label class="block text-gray-700">Rol</label>
          <select
            v-model="form.id_rol"
            class="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:outline-none"
            required
          >
            <option value="" selected disabled>Selecciona un rol</option>
            <option v-for="rol in roles" :key="rol.id_rol" :value="rol.id_rol">
              {{ rol.nombre_rol }}
            </option>
          </select>
        </div>

        <!-- Contraseña -->
        <div class="mb-4">
          <label class="block text-gray-700">Contraseña</label>
          <input
            type="text"
            v-model="form.contrasenha"
            class="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:outline-none"
            :class="{
              'border-red-500': v$.contrasenha.$error,
              'border-gray-300': !v$.contrasenha.$error
            }"
            required
          />
          <p v-if="v$.contrasenha.$error" class="text-red-500 text-sm">
            {{ v$.contrasenha.$errors[0].$message }}
          </p>
        </div>

        <!-- Botones -->
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
            class="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 focus:outline-none"
          >
            Actualizar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue';
import { useToast } from 'vue-toastification';
import { findAllRoles, updateUsuario } from '../../actions/admin-usuarios.action';
import { getValidationRules } from '../../validators/CreateUsuario.calidator';
import useVuelidate from '@vuelidate/core';
import type { Datum } from '../../interfaces/usuariosResponse.interface';

const toast = useToast();

const form = ref({
  nombre_usuario: '',
  id_rol: '',
  id_personal: '',
  contrasenha: '',
});

// Vuelidate
const rules = computed(() => getValidationRules());
const v$ = useVuelidate(rules, form);

const props = defineProps<{
  usuario: Datum | null;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'updated'): void;
}>();

const roles = ref([]);

const loadRoles = async () => {
  const response = await findAllRoles();
  if (response.ok) {
    roles.value = response.data;
  } else {
    toast.error(response.message || 'No se pudieron cargar los roles.');
  }
};

const populateForm = () => {
  if (props.usuario) {
    form.value.nombre_usuario = props.usuario.nombre_usuario;
    form.value.id_rol = props.usuario.role?.id_rol ?? '';
    form.value.id_personal = props.usuario.personal?.id_personal ?? '';
    form.value.contrasenha = props.usuario.contrasenha ?? '';
  }
};

const submitUpdate = async () => {
  v$.value.$touch();
  if (v$.value.$invalid) {
    toast.error('Revisa los errores en el formulario.');
    return;
  }

  if (!props.usuario) {
    toast.error('No hay un usuario seleccionado para actualizar.');
    return;
  }

  const payload = {
    nombre_usuario: form.value.nombre_usuario,
    id_rol: form.value.id_rol,
    id_personal: form.value.id_personal,
    contrasenha: form.value.contrasenha,
  };

  const response = await updateUsuario(props.usuario.id_usuario, payload);

  if (response.ok) {
    toast.success('Usuario actualizado exitosamente.');
    emit('updated');
    emit('close');
  } else {
    toast.error(response.message || 'Error al actualizar el usuario.');
  }
};

onMounted(() => {
  loadRoles();
  populateForm();
});

watch(
  () => props.usuario,
  () => {
    populateForm();
  }
);
</script>
