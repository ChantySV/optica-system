<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
      <h2 class="text-2xl font-semibold text-gray-800 mb-4">Crear Nueva Persona</h2>

      <form @submit.prevent="submitCreate">
        <!-- Nombres -->
        <div class="mb-4">
          <label class="block text-gray-700 font-medium mb-2" for="nombres">Nombres</label>
          <input
            id="nombres"
            v-model="form.nombres"
            type="text"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            placeholder="Ingrese el Nombre"
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
            placeholder="Ingrese el Apellido Paterno"
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
            placeholder="Ingrese el Apellido Materno (opcional)"
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
            type="email"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            placeholder="Ingrese un email válido (Opcional)"
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
            placeholder="Ingrese el número de teléfono (opcional)"
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
            Crear
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from "vue";
import { useToast } from "vue-toastification";
import { createPersona } from "../actions/admin-personal.action";
import { getValidationRules } from "../validators/CreatePersaonl.validator";
import useVuelidate from "@vuelidate/core";

const emit = defineEmits<{
  (e: "close"): void;
  (e: "created"): void;
}>();

const toast = useToast();

const form = reactive({
  nombres: "",
  apellido_paterno: "",
  apellido_materno: "",
  email: "",
  telefono: null as number | null,
  tipo_persona: "",
});

// Aplicar las reglas de validación
const rules = computed(() => getValidationRules(form));
const v$ = useVuelidate(rules, form);

const submitCreate = async () => {
  const isValid = await v$.value.$validate();
  if (!isValid) {
    toast.error("Corrige los errores antes de enviar el formulario.");
    return;
  }

  try {
    const createPersonaResponse = await createPersona({
      nombres: form.nombres.trim(),
      apellido_paterno: form.apellido_paterno.trim(),
      apellido_materno: form.apellido_materno?.trim() || null,
      email: form.email?.trim() || null,
      telefono: form.telefono,
      tipo_persona: form.tipo_persona.trim(),
    });

    if (createPersonaResponse.ok && createPersonaResponse.data) {
      toast.success("Persona creada con éxito.");
      emit("created");
      emit("close");
    } else {
      toast.error(createPersonaResponse.message || "Error al crear la persona.");
    }
  } catch (error) {
    console.error(error);
    toast.error("Ocurrió un error al crear la persona.");
  }
};
</script>
