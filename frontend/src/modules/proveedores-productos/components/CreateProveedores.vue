<template>
  <div
    v-if="isOpen"
    role="dialog"
    aria-labelledby="modal-title"
    aria-hidden="false"
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
  >
    <div class="bg-white p-6 w-full max-w-md rounded-lg shadow-xl" aria-modal="true">
      <h2 id="modal-title" class="text-2xl font-bold text-gray-800 mb-6">
        Crear Nuevo Proveedor
      </h2>

      <!-- Formulario con VeeValidate -->
      <Form @submit="onSubmit" class="space-y-4">
        <!-- Campo: Nombre -->
        <div>
          <label for="nombre" class="block text-sm font-medium text-gray-700">
            Nombre
          </label>
          <Field
            name="nombre"
            id="nombre"
            type="text"
            placeholder="Nombre del proveedor"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
          />
          <ErrorMessage name="nombre" class="text-red-500 text-sm" />
        </div>

        <!-- Campo: Número -->
        <div>
          <label for="numero" class="block text-sm font-medium text-gray-700">
            Número
          </label>
          <Field
            name="numero"
            id="numero"
            type="text"
            placeholder="Número de contacto"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
          />
          <ErrorMessage name="numero" class="text-red-500 text-sm" />
        </div>

        <!-- Campo: Dirección Web -->
        <div>
          <label for="direccion_web" class="block text-sm font-medium text-gray-700">
            Dirección Web
          </label>
          <Field
            name="direccion_web"
            id="direccion_web"
            type="url"
            placeholder="https://ejemplo.com"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
          />
          <ErrorMessage name="direccion_web" class="text-red-500 text-sm" />
        </div>

        <!-- Botones de acción -->
        <div class="flex justify-end space-x-4">
          <button
            type="button"
            @click="closeModal"
            class="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
          >
            Cancelar
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
          >
            Crear
          </button>
        </div>
      </Form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Form, Field, ErrorMessage, defineRule } from "vee-validate";
import { useToast } from "vue-toastification";
import { createProveedorAction } from "../actions/proveedores.action";

// Props para controlar el modal
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

// Emitir eventos para cerrar el modal
const emit = defineEmits(["close"]);

// Toast de notificaciones
const toast = useToast();

// Manejar el cierre del modal
const closeModal = () => {
  emit("close");
};

// Validar y manejar el envío del formulario
const onSubmit = async (values: Record<string, any>) => {
  const response = await createProveedorAction({
    nombre: values.nombre,
    numero: values.numero || null,
    direccion_web: values.direccion_web,
  });

  if (response.ok) {
    toast.success("Proveedor creado exitosamente");
    closeModal();
  } else {
    toast.error(response.message || "Error al crear el proveedor");
  }
};

// Definir reglas de validación
defineRule("required", (value) => {
  return value ? true : "Este campo es obligatorio";
});

// Validación para URLs específicas
defineRule("customUrl", (value) => {
  if (!value) return "Este campo es obligatorio";

  // Validar que el patrón sea correcto
  const pattern = /^www\.[a-zA-Z0-9-]{1,15}\.com$/;
  if (!pattern.test(value)) {
    return "Debe ser una URL válida con formato www.example.com y no mayor a 15 letras";
  }

  // Extraer el dominio y validar longitud
  const domain = value.replace(/^www\.|\.com$/g, ""); // Quita "www." y ".com"
  if (domain.length > 15) {
    return "El dominio no puede superar los 15 caracteres";
  }

  return true;
});
</script>
