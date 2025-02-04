<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
      <h2 class="text-2xl font-bold mb-4 text-center">Crear Nuevo Usuario</h2>

      <form @submit.prevent="submitCreate">
        <!-- Nombre de Usuario -->
        <div class="mb-4">
          <label class="block text-gray-700 mb-2" for="nombre_usuario">Nombre de Usuario</label>
          <input
            type="text"
            id="nombre_usuario"
            v-model="form.nombre_usuario"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            placeholder="Ingresa el nombre de usuario"
          />
          <p v-if="v$.nombre_usuario.$error" class="text-red-500 text-sm">
            {{ v$.nombre_usuario.$errors[0].$message }}
          </p>
        </div>

        <!-- Contraseña -->
        <div class="mb-4">
          <label class="block text-gray-700 mb-2" for="contrasenha">Contraseña</label>
          <input
            type="password"
            id="contrasenha"
            v-model="form.contrasenha"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            placeholder="Ingresa la contraseña"
          />
          <p v-if="v$.contrasenha.$error" class="text-red-500 text-sm">
            {{ v$.contrasenha.$errors[0].$message }}
          </p>
        </div>

        <!-- Selección de Rol -->
        <div class="mb-4">
          <label class="block text-gray-700 mb-2" for="id_rol">Rol</label>
          <select
            id="id_rol"
            v-model="form.id_rol"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
          >
            <option value="" disabled>Selecciona un rol</option>
            <option v-for="rol in roles" :key="rol.id_rol" :value="rol.id_rol">
              {{ rol.nombre_rol }}
            </option>
          </select>
          <p v-if="v$.id_rol.$error" class="text-red-500 text-sm">
            {{ v$.id_rol.$errors[0].$message }}
          </p>
        </div>

        <!-- Selección de Personal -->
        <div class="mb-4">
          <label class="block text-gray-700 mb-2" for="id_personal">Personal</label>
          <select
            id="id_personal"
            v-model="form.id_personal"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
          >
            <option value="" disabled>Selecciona un personal</option>
            <option v-for="personal in personals" :key="personal.id_personal" :value="personal.id_personal">
              {{ personal.nombres }}
            </option>
          </select>
          <p v-if="v$.id_personal.$error" class="text-red-500 text-sm">
            {{ v$.id_personal.$errors[0].$message }}
          </p>
        </div>

        <!-- Botones de Acción -->
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
            class="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            Crear
          </button>
        </div>
      </form>

      <!-- Indicador de carga -->
      <div v-if="loading" class="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 rounded-lg">
        <svg class="animate-spin h-8 w-8 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { findAllRoles, createUsuario, findAllJuridicosAdmin } from "../../actions/admin-usuarios.action";
import { useToast } from "vue-toastification";
import { getValidationRules } from "../../validators/CreateUsuario.calidator";
import useVuelidate from "@vuelidate/core";

const emit = defineEmits<{
  (e: "close"): void;
  (e: "created"): void;
}>();

const toast = useToast();
const loading = ref(false);
const roles = ref([]);
const personals = ref([]);

// Datos del formulario
const form = ref({
  nombre_usuario: "",
  contrasenha: "",
  id_rol: "",
  id_personal: "",
});

// Aplicar validaciones con Vuelidate
const rules = computed(() => getValidationRules());
const v$ = useVuelidate(rules, form);

// Función para cerrar el modal
const closeModal = () => {
  emit("close");
};

// Cargar roles desde el backend
const loadRoles = async () => {
  const response = await findAllRoles();
  if (response.ok) {
    roles.value = response.data;
  } else {
    toast.error(response.message || "No se pudieron cargar los roles.");
  }
};

// Cargar personal desde el backend
const loadPersonal = async () => {
  const response = await findAllJuridicosAdmin();
  if (response.ok) {
    personals.value = response.data;
  } else {
    toast.error(response.message || "No se pudo cargar el personal.");
  }
};

// Enviar el formulario
const submitCreate = async () => {
  const isValid = await v$.value.$validate();
  if (!isValid) {
    toast.error("Corrige los errores antes de enviar el formulario.");
    return;
  }

  loading.value = true;
  try {
    const payload = {
      nombre_usuario: form.value.nombre_usuario.trim(),
      contrasenha: form.value.contrasenha.trim(),
      id_rol: form.value.id_rol,
      id_personal: form.value.id_personal,
    };

    const response = await createUsuario(payload);

    if (response.ok) {
      toast.success("Usuario creado exitosamente.");
      emit("created");
      closeModal();
    } else {
      toast.error(response.message || "Error al crear el usuario.");
    }
  } catch (error: any) {
    console.error("Error al crear usuario:", error);
    toast.error(error.message || "Error al crear el usuario.");
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadRoles();
  loadPersonal();
});
</script>
