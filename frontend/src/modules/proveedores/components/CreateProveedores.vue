<template>
  <div v-if="isOpen" role="dialog" aria-labelledby="modal-title"
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div class="bg-white p-6 w-full max-w-md rounded-lg shadow-xl" aria-modal="true">
      <h2 id="modal-title" class="text-2xl font-bold text-gray-800 mb-6">
        Crear Nuevo Proveedor
      </h2>

      <!--  FORM  -->
      <form @submit.prevent="onSubmit" class="space-y-4">

        <!-- NOMBRE -->
        <div>
          <label for="nombre" class="block text-sm font-medium text-gray-700">
            Nombre Proveedor
          </label>
          <input id="nombre" type="text" v-model="formData.nombre" placeholder="Nombre del proveedor"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg" />
          <p v-if="v$.nombre.$error" class="text-red-500 text-sm">
            {{ v$.nombre.$errors[0].$message }}
          </p>
        </div>

        <!-- NÚMERO  -->
        <div>
          <label for="numero" class="block text-sm font-medium text-gray-700">
            Número
          </label>
          <input id="numero" type="text" v-model="formData.numero" placeholder="Número de contacto"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg" />
          <p v-if="v$.numero.$error" class="text-red-500 text-sm">
            {{ v$.numero.$errors[0].$message }}
          </p>
        </div>

        <!-- DIRECCIÓN WEB  -->
        <div>
          <label for="direccion_web" class="block text-sm font-medium text-gray-700">
            Dirección Web
          </label>
          <input id="direccion_web" type="text" v-model="formData.direccion_web" placeholder="Direccion Web"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg" />
          <p v-if="v$.direccion_web.$error" class="text-red-500 text-sm">
            {{ v$.direccion_web.$errors[0].$message }}
          </p>
        </div>

        <!-- Botones -->
        <div class="flex justify-end space-x-4">
          <button type="button" @click="closeModal" class="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg">
            Cancelar
          </button>
          <button type="submit" class="px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg">
            Crear
          </button>
        </div>

      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { validationRules } from '../validators/createProveedor.validator'
import { useToast } from 'vue-toastification'
import { createProveedorAction } from '../actions/proveedores.action'

const toast = useToast()

const props = defineProps({
  isOpen: Boolean
})

const emit = defineEmits(['close', 'refreshList'])

function closeModal() {
  emit('close')
}

const formData = ref({
  nombre: "",
  numero: "",
  direccion_web: "",
});

const rules = computed(() => validationRules);

const v$ = useVuelidate(rules, formData);

async function onSubmit() {
  const isValid = await v$.value.$validate()
  if (!isValid) {
    toast.error('Corrige los errores antes de enviar el formulario.')
    return
  }
  try {
    const response = await createProveedorAction(formData.value)
    if (response.ok) {
      toast.success('Proveedor creado exitosamente')
      emit('refreshList')
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
