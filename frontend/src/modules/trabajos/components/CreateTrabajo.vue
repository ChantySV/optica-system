<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div class="bg-white rounded-lg w-11/12 md:w-3/4 lg:w-1/2 p-6 overflow-auto max-h-screen">
      <h2 class="text-xl font-semibold mb-4">Agregar Nuevo Trabajo</h2>
      <form @submit.prevent="submitForm">
        <!-- Fecha de Salida -->
        <div class="mb-4">
          <label class="block text-gray-700">Fecha de Salida:</label>
          <input
            type="date"
            v-model="form.fecha_salida"
            class="w-full px-3 py-2 border rounded"
          />
        </div>

        <!-- Número de Trabajo -->
        <div class="mb-4">
          <label class="block text-gray-700">Número de Trabajo:</label>
          <input
            type="number"
            v-model.number="form.numero_trabajo"
            required
            class="w-full px-3 py-2 border rounded"
          />
        </div>

        <!-- ID Personal -->
        <div class="mb-4">
          <label class="block text-gray-700">Personal Encargada del Trabajo:</label>
          <select
            v-model="form.id_personal"
            required
            class="w-full px-3 py-2 border rounded"
          >
            <option value="" disabled>Seleccione un personal</option>
            <option v-for="personal in personalOptions" :key="personal.id_personal" :value="personal.id_personal">
              {{ personal.nombres }}
            </option>
          </select>
          <div v-if="errors.id_personal" class="text-red-500 text-sm mt-1">
            {{ errors.id_personal }}
          </div>
        </div>

        <!-- Detalle Trabajo -->
        <div class="mb-4">
          <h3 class="text-lg font-semibold">Detalle del Trabajo</h3>

          <!-- Distancia -->
          <div class="mb-2">
            <label class="inline-flex items-center">
              <input type="checkbox" v-model="form.detalleTrabajo.distancia" class="form-checkbox" />
              <span class="ml-2">Distancia</span>
            </label>
          </div>

          <!-- Adición -->
          <div class="mb-2">
            <label class="block text-gray-700">Adición:</label>
            <input
              type="number"
              v-model.number="form.detalleTrabajo.adicion"
              class="w-full px-3 py-2 border rounded"
            />
          </div>

          <!-- Base -->
          <div class="mb-2">
            <label class="block text-gray-700">Base:</label>
            <input
              type="number"
              v-model.number="form.detalleTrabajo.base"
              class="w-full px-3 py-2 border rounded"
            />
          </div>

          <!-- Esférico Derecho -->
          <div class="mb-2">
            <label class="block text-gray-700">Esférico Derecho:</label>
            <input
              type="number"
              step="0.01"
              v-model.number="form.detalleTrabajo.esferico_derecho"
              min="0"
              class="w-full px-3 py-2 border rounded"
            />
          </div>

          <!-- Esférico Izquierdo -->
          <div class="mb-2">
            <label class="block text-gray-700">Esférico Izquierdo:</label>
            <input
              type="number"
              step="0.01"
              v-model.number="form.detalleTrabajo.esferico_izquierdo"
              min="0"
              class="w-full px-3 py-2 border rounded"
            />
          </div>

          <!-- Cilindro Derecho -->
          <div class="mb-2">
            <label class="block text-gray-700">Cilindro Derecho:</label>
            <input
              type="number"
              step="0.01"
              v-model.number="form.detalleTrabajo.cilindro_derecho"
              max="0"
              class="w-full px-3 py-2 border rounded"
            />
          </div>

          <!-- Cilindro Izquierdo -->
          <div class="mb-2">
            <label class="block text-gray-700">Cilindro Izquierdo:</label>
            <input
              type="number"
              step="0.01"
              v-model.number="form.detalleTrabajo.cilindro_izquierdo"
              max="0"
              class="w-full px-3 py-2 border rounded"
            />
          </div>

          <!-- Eje Derecho -->
          <div class="mb-2">
            <label class="block text-gray-700">Eje Derecho:</label>
            <input
              type="number"
              v-model.number="form.detalleTrabajo.eje_derecho"
              class="w-full px-3 py-2 border rounded"
            />
          </div>

          <!-- Eje Izquierdo -->
          <div class="mb-2">
            <label class="block text-gray-700">Eje Izquierdo:</label>
            <input
              type="number"
              v-model.number="form.detalleTrabajo.eje_izquierdo"
              class="w-full px-3 py-2 border rounded"
            />
          </div>

          <!-- ID Tratamiento -->
          <div class="mb-2">
            <label class="block text-gray-700">Tratamiento:</label>
            <select
              v-model="form.detalleTrabajo.id_tratamiento"
              class="w-full px-3 py-2 border rounded"
            >
              <option value="" disabled>Seleccione un tratamiento (opcional)</option>
              <option v-for="tratamiento in tratamientosOptions" :key="tratamiento.id_tratamiento" :value="tratamiento.id_tratamiento">
                {{ tratamiento.nombre }}
              </option>
            </select>
          </div>

          <!-- ID Producto -->
          <div class="mb-2">
            <label class="block text-gray-700">Producto:</label>
            <select
              v-model="form.detalleTrabajo.id_producto"
              required
              class="w-full px-3 py-2 border rounded"
            >
              <option value="" disabled>Seleccione un producto</option>
              <option v-for="producto in productosOptions" :key="producto.id_producto" :value="producto.id_producto">
                {{ producto.nombre }}
              </option>
            </select>
            <div v-if="errors.id_producto" class="text-red-500 text-sm mt-1">
              {{ errors.id_producto }}
            </div>
          </div>

          <!-- ID Color -->
          <div class="mb-2">
            <label class="block text-gray-700">Color:</label>
            <select
              v-model="form.detalleTrabajo.id_color"
              class="w-full px-3 py-2 border rounded"
            >
              <option value="" disabled>Seleccione un color (opcional)</option>
              <option v-for="color in coloresOptions" :key="color.id_color" :value="color.id_color">
                {{ color.nombre }}
              </option>
            </select>
          </div>
        </div>

        <!-- Botones de Acción -->
        <div class="flex justify-end space-x-4">
          <button
            type="button"
            @click="emitClose"
            class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, reactive, ref, onMounted } from 'vue';
import { createTrabajo, findProducto, findTratamiento, findColor, findPersonal } from '../actions/trabajos-create.action';
import { useToast } from 'vue-toastification';

const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'trabajo-creado'): void;
}>();

const form = reactive({
  fecha_salida: '',
  numero_trabajo: 0,
  id_personal: '',
  detalleTrabajo: {
    distancia: false,
    adicion: null as number | null,
    base: null as number | null,
    esferico_derecho: null as number | null,
    esferico_izquierdo: null as number | null,
    cilindro_derecho: null as number | null,
    cilindro_izquierdo: null as number | null,
    eje_derecho: null as number | null,
    eje_izquierdo: null as number | null,
    id_tratamiento: '',
    id_producto: '',
    id_color: '',
  },
});

const productosOptions = ref<{ id_producto: string; nombre: string }[]>([]);
const tratamientosOptions = ref<{ id_tratamiento: string; nombre: string }[]>([]);
const coloresOptions = ref<{ id_color: string; nombre: string }[]>([]);
const personalOptions = ref<{ id_personal: string; nombres: string }[]>([]);

const errors = reactive<{ [key: string]: string }>({});

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
    alert('Error al cargar los productos.');
  }

  if (tratamientosRes.ok && tratamientosRes.data) {
    tratamientosOptions.value = tratamientosRes.data;
  } else {
    alert('Error al cargar los tratamientos.');
  }

  if (coloresRes.ok && coloresRes.data) {
    coloresOptions.value = coloresRes.data;
  } else {
    alert('Error al cargar los colores.');
  }

  if (personalRes.ok && personalRes.data) {
    personalOptions.value = personalRes.data;
  } else {
    alert('Error al cargar el personal.');
  }
};

onMounted(() => {
  fetchOptions();
});

const emitClose = () => {
  emit('close');
};

const toast = useToast();

const submitForm = async () => {
  Object.keys(errors).forEach((key) => {
    errors[key] = '';
  });

  let valid = true;

  if (!form.numero_trabajo) {
    errors.numero_trabajo = 'Número de trabajo es obligatorio.';
    valid = false;
  }

  if (!form.id_personal) {
    errors.id_personal = 'ID Personal es obligatorio.';
    valid = false;
  }

  if (!form.detalleTrabajo.id_producto) {
    errors.id_producto = 'ID Producto es obligatorio.';
    valid = false;
  }

  if (!valid) {
    return;
  }

  try {
    const payload = {
      fecha_salida: form.fecha_salida ? new Date(form.fecha_salida).toISOString() : undefined,
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

    if (response.ok) {
      toast.success('Trabajo creado exitosamente.');
      emit('trabajo-creado');
    } else {
      toast.error(response.message || 'Ocurrió un error al crear el trabajo.');
    }
  } catch (error) {
    console.error('Error al enviar el formulario:', error);
    toast.error('Ocurrió un error al enviar el formulario.');
  }
};
</script>

<style scoped>
</style>
