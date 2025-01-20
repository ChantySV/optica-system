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
        Actualizar Proveedor
      </h2>

      <Form @submit="onSubmit" class="space-y-4">
        <!-- Campo: Nombre -->
        <div>
          <label for="nombre" class="block text-sm font-medium text-gray-700">
            Nombre
          </label>
          <Field
            name="nombre"
            id="nombre"
            v-model="form.nombre"
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
            v-model="form.numero"
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
            v-model="form.direccion_web"
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
            Actualizar
          </button>
        </div>
      </Form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Form, Field, ErrorMessage } from "vee-validate";
import { reactive, watch } from "vue";
import { useToast } from "vue-toastification";
import { updateProveedorAction } from "../actions/proveedores.action";

// Props para controlar el modal y recibir los datos del registro
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  proveedor: {
    type: Object,
    required: true,
  },
});

// Emitir eventos para cerrar el modal y actualizar la lista
const emit = defineEmits(["close", "refresh"]);

// Formulario reactivo inicializado con los datos del proveedor
const form = reactive({
  nombre: props.proveedor.nombre,
  numero: props.proveedor.numero || "",
  direccion_web: props.proveedor.direccion_web,
  activo: props.proveedor.activo,
});

const toast = useToast();

// Manejar el cierre del modal
const closeModal = () => {
  emit("close");
};

// Manejar el envío del formulario
const onSubmit = async () => {
  const response = await updateProveedorAction(props.proveedor.id_proveedor, form);

  if (response.ok) {
    toast.success("Proveedor actualizado exitosamente");
    emit("refresh"); // Emitir evento para actualizar la lista de proveedores
    closeModal();
  } else {
    toast.error(response.message || "Error al actualizar el proveedor");
  }
};

// Actualizar el formulario si cambian los datos del proveedor
watch(
  () => props.proveedor,
  (newProveedor) => {
    form.nombre = newProveedor.nombre;
    form.numero = newProveedor.numero || "";
    form.direccion_web = newProveedor.direccion_web;
    form.activo = newProveedor.activo;
  },
  { deep: true }
);
</script>
