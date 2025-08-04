<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
      <h2 class="text-2xl font-semibold text-gray-800 mb-4">Actualizar Persona</h2>

      <form @submit.prevent="submitUpdate">
        <!-- Nombres -->
        <div class="mb-4">
          <label class="block text-gray-700 font-medium mb-2" for="nombres">Nombres</label>
          <input
            id="nombres"
            v-model="form.nombres"
            type="text"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            placeholder="Ingrese solo letras"
          />
          <p v-if="v$.nombres.$error" class="text-red-500 text-sm">
            {{ v$.nombres.$errors[0].$message }}
          </p>
        </div>

        <!-- Apellido Paterno -->
        <div class="mb-4">
          <label class="block text-gray-700 font-medium mb-2" for="apellido_paterno">Apellido Paterno</label>
          <input
            id="apellido_paterno"
            v-model="form.apellido_paterno"
            type="text"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            placeholder="Ingrese solo letras"
          />
          <p v-if="v$.apellido_paterno.$error" class="text-red-500 text-sm">
            {{ v$.apellido_paterno.$errors[0].$message }}
          </p>
        </div>

        <!-- Apellido Materno -->
        <div class="mb-4">
          <label class="block text-gray-700 font-medium mb-2" for="apellido_materno">Apellido Materno</label>
          <input
            id="apellido_materno"
            v-model="form.apellido_materno"
            type="text"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            placeholder="Ingrese solo letras (opcional)"
          />
          <p v-if="v$.apellido_materno.$error" class="text-red-500 text-sm">
            {{ v$.apellido_materno.$errors[0].$message }}
          </p>
        </div>

        <!-- Email -->
        <div class="mb-4">
          <label class="block text-gray-700 font-medium mb-2" for="email">Email</label>
          <input
            id="email"
            v-model="form.email"
            type="text"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            placeholder="Ingrese un email válido"
          />
          <p v-if="v$.email.$error" class="text-red-500 text-sm">
            {{ v$.email.$errors[0].$message }}
          </p>
        </div>

        <!-- Teléfono -->
        <div class="mb-4">
          <label class="block text-gray-700 font-medium mb-2" for="telefono">Teléfono</label>
          <input
            id="telefono"
            v-model.number="form.telefono"
            type="text"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            placeholder="Ingrese solo números"
          />
          <p v-if="v$.telefono.$error" class="text-red-500 text-sm">
            {{ v$.telefono.$errors[0].$message }}
          </p>
        </div>

        <!-- Tipo de Persona -->
        <div class="mb-4">
          <label class="block text-gray-700 font-medium mb-2" for="tipo_persona">Tipo de Persona</label>
          <select
            id="tipo_persona"
            v-model="form.tipo_persona"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
          >
            <option value="">Seleccione una opción</option>
            <option value="juridica">Jurídica</option>
            <option value="natural">Natural</option>
          </select>
          <p v-if="v$.tipo_persona.$error" class="text-red-500 text-sm">
            {{ v$.tipo_persona.$errors[0].$message }}
          </p>
        </div>

        <!-- Botones -->
        <div class="flex justify-end gap-4">
          <button type="button" @click="$emit('close')" class="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400">
            Cancelar
          </button>
          <button type="submit" class="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
            Actualizar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, watch } from "vue";
import { useToast } from "vue-toastification";
import { updatePersona } from "../actions/admin-personal.action";
import { getValidationRules } from "../validators/CreatePersaonl.validator";
import useVuelidate from "@vuelidate/core";

// Props
const props = defineProps<{
  persona: any | null;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "updated"): void;
}>();

const toast = useToast();

// Formulario reactivo
const form = reactive({
  nombres: props.persona?.nombres || "",
  apellido_paterno: props.persona?.apellido_paterno || "",
  apellido_materno: props.persona?.apellido_materno || "",
  email: props.persona?.email || "",
  telefono: props.persona?.telefono || "",
  tipo_persona: props.persona?.tipo_persona || "",
});

// Aplicar reglas de validación con Vuelidate
const rules = computed(() => getValidationRules(form));
const v$ = useVuelidate(rules, form);

// Re-inicializar formulario cuando cambia la prop 'persona'
watch(
  () => props.persona,
  (newPersona) => {
    if (newPersona) {
      form.nombres = newPersona.nombres || "";
      form.apellido_paterno = newPersona.apellido_paterno || "";
      form.apellido_materno = newPersona.apellido_materno || "";
      form.email = newPersona.email || "";
      form.telefono = newPersona.telefono || "";
      form.tipo_persona = newPersona.tipo_persona || "";
    }
  }
);

// Enviar el formulario
const submitUpdate = async () => {
  const isValid = await v$.value.$validate();
  if (!isValid) {
    toast.error("Corrige los errores antes de enviar el formulario.");
    return;
  }

  try {
    if (!props.persona) {
      toast.error("No se proporcionó la persona a actualizar.");
      return;
    }

    const updatedPersonaResponse = await updatePersona(props.persona.id_personal, form);

    if (updatedPersonaResponse.ok && updatedPersonaResponse.data) {
      toast.success("Persona actualizada con éxito.");
      emit("updated");
      emit("close");
    } else {
      toast.error(updatedPersonaResponse.message || "Error al actualizar la persona.");
    }
  } catch (error) {
    console.error(error);
    toast.error("Ocurrió un error al actualizar la persona.");
  }
};
</script>
