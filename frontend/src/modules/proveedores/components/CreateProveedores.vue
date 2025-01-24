<template>
  <div
    v-if="isOpen"
    role="dialog"
    aria-labelledby="modal-title"
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
  >
    <div class="bg-white p-6 w-full max-w-md rounded-lg shadow-xl" aria-modal="true">
      <h2 id="modal-title" class="text-2xl font-bold text-gray-800 mb-6">
        Crear Nuevo Proveedor
      </h2>

      <!-- FORM con Vuelidate -->
      <form @submit.prevent="onSubmit" class="space-y-4">

        <!-- NOMBRE (requerido, string) -->
        <div>
          <label for="nombre" class="block text-sm font-medium text-gray-700">
            Nombre
          </label>
          <input
            id="nombre"
            type="text"
            v-model="formData.nombre"
            placeholder="Nombre del proveedor"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          <!-- Mostrar errores -->
          <p v-if="v$.nombre.$error" class="text-red-500 text-sm">
            {{ firstError(v$.nombre) }}
          </p>
        </div>

        <!-- NÚMERO (opc) -->
        <div>
          <label for="numero" class="block text-sm font-medium text-gray-700">
            Número
          </label>
          <input
            id="numero"
            type="text"
            v-model="formData.numero"
            placeholder="Número de contacto"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          <!-- Sin validación obligatoria -->
        </div>

        <!-- DIRECCIÓN WEB (customLink requerido) -->
        <div>
          <label for="direccion_web" class="block text-sm font-medium text-gray-700">
            Dirección Web
          </label>
          <input
            id="direccion_web"
            type="text"
            v-model="formData.direccion_web"
            placeholder="Direccion Web"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          <p v-if="v$.direccion_web.$error" class="text-red-500 text-sm">
            {{ firstError(v$.direccion_web) }}
          </p>
        </div>

        <!-- Botones -->
        <div class="flex justify-end space-x-4">
          <button
            type="button"
            @click="closeModal"
            class="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg"
          >
            Cancelar
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg"
          >
            Crear
          </button>
        </div>

      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { customLink } from '../validators/createProveedor.validator' // tu validador personalizado
import { useToast } from 'vue-toastification'
import { createProveedorAction } from '../actions/proveedores.action'

const toast = useToast()

// Props para controlar el modal
const props = defineProps({
  isOpen: Boolean
})

// Emitir evento para cerrar
const emit = defineEmits(['close'])

function closeModal() {
  emit('close')
}

// Datos del formulario (CreateProveedoreDto sin "activo")
const formData = ref({
  nombre: '',
  numero: '', // opcional
  direccion_web: ''
})

// Reglas con Vuelidate
const rules = computed(() => ({
  nombre: {
    required
  },
  numero: {
    // sin reglas => opcional
  },
  direccion_web: {
    required,
    customLink // Aplica nuestra validación
  }
}))

// Inicializar Vuelidate
const v$ = useVuelidate(rules, formData)

// Helper para el primer mensaje de error
function firstError(state: any): string {
  if (!state.$errors?.length) return ''
  return state.$errors[0].$message || 'Campo inválido'
}

// Manejo del submit
async function onSubmit() {
  // Validamos
  const isValid = await v$.value.$validate()
  if (!isValid) {
    toast.error('Revisa los campos marcados')
    return
  }

  // Si pasa validación
  try {
    const response = await createProveedorAction(formData.value)
    if (response.ok) {
      toast.success('Proveedor creado exitosamente')
      closeModal()
    } else {
      toast.error(response.message || 'Error al crear el proveedor')
    }
  } catch (err) {
    console.error(err)
    toast.error('Error al enviar el formulario')
  }
}
</script>

<style scoped>
/* Estilos de ejemplo con Tailwind */
</style>
