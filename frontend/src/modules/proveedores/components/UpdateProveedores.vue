<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
  >
    <div class="bg-white p-6 w-full max-w-md rounded-lg shadow-xl" aria-modal="true">
      <h2 id="modal-title" class="text-2xl font-bold text-gray-800 mb-6">
        Actualizar Proveedor
      </h2>

      <!-- Formulario normal  -->
      <form @submit.prevent="onSubmit" class="space-y-4">
        <!-- Nombre -->
        <div>
          <label for="nombre" class="block text-sm font-medium text-gray-700">
            Nombre
          </label>
          <input
            id="nombre"
            type="text"
            v-model="form.nombre"
            placeholder="Nombre del proveedor"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
          />
          <!-- Mensaje de error si hay -->
          <p v-if="v$.nombre.$error" class="text-red-500 text-sm">
            <!-- Muestra el primer error encontrado -->
            {{ firstError(v$.nombre) }}
          </p>
        </div>

        <!-- Número  -->
        <div>
          <label for="numero" class="block text-sm font-medium text-gray-700">
            Número
          </label>
          <input
            id="numero"
            type="text"
            v-model="form.numero"
            placeholder="Número de contacto"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
          />
          <!-- Este campo es opcional, sin validaciones obligatorias -->
        </div>

        <!-- Dirección Web -->
        <div>
          <label for="direccion_web" class="block text-sm font-medium text-gray-700">
            Dirección Web
          </label>
          <input
            id="direccion_web"
            type="text"
            v-model="form.direccion_web"
            placeholder="https://ejemplo.com"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
          />
          <p v-if="v$.direccion_web.$error" class="text-red-500 text-sm">
            {{ firstError(v$.direccion_web) }}
          </p>
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
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch, computed } from 'vue'
import { useToast } from 'vue-toastification'
import useVuelidate from '@vuelidate/core'
import { required, url } from '@vuelidate/validators'
import { updateProveedorAction } from '../actions/proveedores.action'

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
})

// Emitir eventos para cerrar el modal y actualizar la lista
const emit = defineEmits(['close', 'refresh'])

// Manejar el cierre del modal
const closeModal = () => {
  emit('close')
}

const toast = useToast()

// Formulario reactivo inicializado con los datos del proveedor
const form = reactive({
  nombre: props.proveedor.nombre,
  numero: props.proveedor.numero || '',
  direccion_web: props.proveedor.direccion_web,
  activo: props.proveedor.activo, // si lo necesitas
})

// Reglas de validación con Vuelidate
// Ajusta según tus requisitos (por ejemplo: "required", "url", etc.)
const rules = computed(() => ({
  nombre: {
    required,
  },
  numero: {
    // ningún validador => opcional
  },
  direccion_web: {
    required,
    url,
  },
  // activo: { ... } si deseas validarlo
}))

// Inicializamos Vuelidate
const v$ = useVuelidate(rules, form)

// Función para obtener el primer error de un campo
function firstError(state: any): string {
  if (!state.$errors?.length) return ''
  return state.$errors[0].$message || 'Campo inválido'
}

// Manejar el envío del formulario
async function onSubmit() {
  // 1) Verificar si es válido
  const isValid = await v$.value.$validate()
  if (!isValid) {
    toast.error('Hay errores en el formulario')
    return
  }

  // 2) Llamar acción para actualizar
  const response = await updateProveedorAction(props.proveedor.id_proveedor, form)

  if (response.ok) {
    toast.success('Proveedor actualizado exitosamente')
    emit('refresh') // Emitir evento para actualizar la lista de proveedores
    closeModal()
  } else {
    toast.error(response.message || 'Error al actualizar el proveedor')
  }
}

// Actualizar el formulario si cambian los datos del proveedor
watch(
  () => props.proveedor,
  (newProveedor) => {
    form.nombre = newProveedor.nombre
    form.numero = newProveedor.numero || ''
    form.direccion_web = newProveedor.direccion_web
    form.activo = newProveedor.activo
  },
  { deep: true }
)
</script>
