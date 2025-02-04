<template>
  <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div class="bg-white rounded-lg w-3/4 xl:w-2/3 p-8 overflow-auto max-h-screen">
      <h2 class="text-xl font-semibold mb-6">Agregar Nuevo Trabajo</h2>

      <form @submit.prevent="submitForm">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Número de Trabajo -->
          <div>
            <label class="block text-gray-700">Número de Trabajo:</label>
            <input type="number" v-model.number="form.numero_trabajo" class="w-full px-3 py-2 border rounded" />
            <p v-if="v$.numero_trabajo.$error" class="text-red-500 text-sm">
              {{ v$.numero_trabajo.$errors[0].$message }}
            </p>
          </div>

          <!-- ID Personal -->
          <div>
            <label class="block text-gray-700">Personal Encargado:</label>
            <select v-model="form.id_personal" class="w-full px-3 py-2 border rounded">
              <option value="">Seleccione un personal</option>
              <option v-for="personal in personalOptions" :key="personal.id_personal" :value="personal.id_personal">
                {{ personal.nombres }}
              </option>
            </select>
            <p v-if="v$.id_personal.$error" class="text-red-500 text-sm">
              {{ v$.id_personal.$errors[0].$message }}
            </p>
          </div>
        </div>

        <h3 class="text-lg font-semibold mt-6 mb-4">Detalle del Trabajo</h3>

        <!-- Distancia -->
        <div class="mb-4">
          <label class="inline-flex items-center">
            <input type="checkbox" v-model="form.detalleTrabajo.distancia" class="form-checkbox" />
            <span class="ml-2">Distancia</span>
          </label>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Adición y Base -->
          <div>
            <label class="block text-gray-700">Adición:</label>
            <input type="number" v-model.number="form.detalleTrabajo.adicion" class="w-full px-3 py-2 border rounded" />
            <p v-if="v$.detalleTrabajo.adicion.$error" class="text-red-500 text-sm">
              {{ v$.detalleTrabajo.adicion.$errors[0].$message }}
            </p>
          </div>

          <div>
            <label class="block text-gray-700">Base:</label>
            <input type="number" v-model.number="form.detalleTrabajo.base" class="w-full px-3 py-2 border rounded" />
            <p v-if="v$.detalleTrabajo.base.$error" class="text-red-500 text-sm">
              {{ v$.detalleTrabajo.base.$errors[0].$message }}
            </p>
          </div>
        </div>

        <!-- Esférico y Cilindro en dos columnas -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-gray-700">Esférico Derecho:</label>
            <input type="number" step="0.01" v-model.number="form.detalleTrabajo.esferico_derecho"
              class="w-full px-3 py-2 border rounded" />
            <p v-if="v$.detalleTrabajo.esferico_derecho.$error" class="text-red-500 text-sm">
              {{ v$.detalleTrabajo.esferico_derecho.$errors[0].$message }}
            </p>
          </div>

          <div>
            <label class="block text-gray-700">Esférico Izquierdo:</label>
            <input type="number" step="0.01" v-model.number="form.detalleTrabajo.esferico_izquierdo"
              class="w-full px-3 py-2 border rounded" />
            <p v-if="v$.detalleTrabajo.esferico_izquierdo.$error" class="text-red-500 text-sm">
              {{ v$.detalleTrabajo.esferico_izquierdo.$errors[0].$message }}
            </p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-gray-700">Cilindro Derecho:</label>
            <input type="number" step="0.01" v-model.number="form.detalleTrabajo.cilindro_derecho"
              class="w-full px-3 py-2 border rounded" />
            <p v-if="v$.detalleTrabajo.cilindro_derecho.$error" class="text-red-500 text-sm">
              {{ v$.detalleTrabajo.cilindro_derecho.$errors[0].$message }}
            </p>
          </div>

          <div>
            <label class="block text-gray-700">Cilindro Izquierdo:</label>
            <input type="number" step="0.01" v-model.number="form.detalleTrabajo.cilindro_izquierdo"
              class="w-full px-3 py-2 border rounded" />
            <p v-if="v$.detalleTrabajo.cilindro_izquierdo.$error" class="text-red-500 text-sm">
              {{ v$.detalleTrabajo.cilindro_izquierdo.$errors[0].$message }}
            </p>
          </div>
        </div>

        <!-- Producto, Color y Tratamiento en una sola fila -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          <div>
            <label class="block text-gray-700">Producto:</label>
            <select v-model="form.detalleTrabajo.id_producto" class="w-full px-3 py-2 border rounded">
              <option value="" disabled>Seleccione un producto</option>
              <option v-for="producto in productosOptions" :key="producto.id_producto" :value="producto.id_producto">
                {{ producto.nombre }}
              </option>
            </select>
            <p v-if="v$.detalleTrabajo.id_producto.$error" class="text-red-500 text-sm">
              {{ v$.detalleTrabajo.id_producto.$errors[0].$message }}
            </p>
          </div>

          <div>
            <label class="block text-gray-700">Color:</label>
            <select v-model="form.detalleTrabajo.id_color" class="w-full px-3 py-2 border rounded">
              <option value="" disabled>Seleccione un color (opcional)</option>
              <option v-for="color in coloresOptions" :key="color.id_color" :value="color.id_color">
                {{ color.nombre }}
              </option>
            </select>
            <p v-if="v$.detalleTrabajo.id_color.$error" class="text-red-500 text-sm">
              {{ v$.detalleTrabajo.id_color.$errors[0].$message }}
            </p>
          </div>

          <div>
            <label class="block text-gray-700">Tratamiento:</label>
            <select v-model="form.detalleTrabajo.id_tratamiento" class="w-full px-3 py-2 border rounded">
              <option value="">Seleccione un tratamiento (opcional)</option>
              <option v-for="tratamiento in tratamientosOptions" :key="tratamiento.id_tratamiento"
                :value="tratamiento.id_tratamiento">
                {{ tratamiento.nombre }}
              </option>
            </select>
          </div>
        </div>

        <!-- Botones de Acción -->
        <div class="flex justify-end space-x-4 mt-6">
          <button type="button" @click="closeModal"
            class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">
            Cancelar
          </button>
          <button type="submit" class="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
            Guardar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, reactive, ref, onMounted, computed } from 'vue';
import { createTrabajo, findProducto, findTratamiento, findColor, findPersonal } from '../actions/trabajos-create.action';
import { useToast } from 'vue-toastification';
import { getValidationRules } from '../validators/CreateTrabajo.validator';
import useVuelidate from '@vuelidate/core';

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(['close', 'refreshList']);


const form = reactive({
  numero_trabajo: 0,
  id_personal: '',
  detalleTrabajo: {
    distancia: false,
    adicion: 0,
    base: 0,
    esferico_derecho: 0,
    esferico_izquierdo: 0,
    cilindro_derecho: 0,
    cilindro_izquierdo: 0,
    eje_derecho: 0,
    eje_izquierdo: 0,
    id_tratamiento: '',
    id_producto: '',
    id_color: '',
  },
});

const rules = computed(() => getValidationRules());

const v$ = useVuelidate(rules, form);

const productosOptions = ref<{ id_producto: string; nombre: string }[]>([]);
const tratamientosOptions = ref<{ id_tratamiento: string; nombre: string }[]>([]);
const coloresOptions = ref<{ id_color: string; nombre: string }[]>([]);
const personalOptions = ref<{ id_personal: string; nombres: string }[]>([]);

const fetchOptions = async () => {
  const [productosRes, tratamientosRes, coloresRes, personalRes] = await Promise.all([
    findProducto(),
    findTratamiento(),
    findColor(),
    findPersonal(),
  ]);

  if (productosRes.ok && productosRes.data) {
    productosOptions.value = productosRes.data;
  } else {
    toast.error('Error al cargar los productos.');
  }

  if (tratamientosRes.ok && tratamientosRes.data) {
    tratamientosOptions.value = tratamientosRes.data;
  } else {
    toast.error('Error al cargar los tratamientos.');
  }

  if (coloresRes.ok && coloresRes.data) {
    coloresOptions.value = coloresRes.data;
  } else {
    toast.error('Error al cargar los colores.');
  }

  if (personalRes.ok && personalRes.data) {
    personalOptions.value = personalRes.data;
  } else {
    toast.error('Error al cargar el personal.');
  }
};

onMounted(() => {
  fetchOptions();
});

const closeModal = () => {
  emit('close');
};

const toast = useToast();

const submitForm = async () => {

  const isValid = await v$.value.$validate()
  if (!isValid) {
    toast.error('Corrige los errores antes de enviar el formulario.')
    return
  }

  try {
    const payload = {
      numero_trabajo: form.numero_trabajo,
      id_personal: form.id_personal,
      detalleTrabajo: {
        distancia: form.detalleTrabajo.distancia,
        adicion: form.detalleTrabajo.adicion || undefined,
        base: form.detalleTrabajo.base || undefined,
        esferico_derecho: form.detalleTrabajo.esferico_derecho || undefined,
        esferico_izquierdo: form.detalleTrabajo.esferico_izquierdo || undefined,
        cilindro_derecho: form.detalleTrabajo.cilindro_derecho || undefined,
        cilindro_izquierdo: form.detalleTrabajo.cilindro_izquierdo || undefined,
        eje_derecho: form.detalleTrabajo.eje_derecho || undefined,
        eje_izquierdo: form.detalleTrabajo.eje_izquierdo || undefined,
        id_tratamiento: form.detalleTrabajo.id_tratamiento || undefined,
        id_producto: form.detalleTrabajo.id_producto,
        id_color: form.detalleTrabajo.id_color || undefined,
      },
    };

    const response = await createTrabajo(payload);

    if (!response.ok) {
    if (response.code === 'TRABAJO_DUPLICADO') {
      toast.error(`El número de trabajo ya está en uso. Por favor, ingrese otro.`);
    } else if (response.code === 'STOCK_INSUFICIENTE') {
      toast.error(`No hay suficiente stock para este trabajo.`);
    } else {
      toast.error(response.message);
    }
    return;
  }
    if (response.ok) {
      toast.success('Trabajo creado exitosamente.');
      emit('refreshList');
      closeModal();
    }
  } catch (error) {
    console.error('Error al enviar el formulario:', error);
    toast.error('Ocurrió un error al enviar el formulario.');
  }
};
</script>
