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
            :class="{ 'border-red-500': v$.fecha_salida.$error }"
          />
          <span v-if="v$.fecha_salida.$error" class="text-red-500 text-sm">
            {{ getErrorMessage('fecha_salida') }}
          </span>
        </div>

        <!-- Número de Trabajo -->
        <div class="mb-4">
          <label class="block text-gray-700">Número de Trabajo:</label>
          <input
            type="number"
            v-model.number="form.numero_trabajo"
            class="w-full px-3 py-2 border rounded"
            :class="{ 'border-red-500': v$.numero_trabajo.$error }"
          />
          <span v-if="v$.numero_trabajo.$error" class="text-red-500 text-sm">
            {{ getErrorMessage('numero_trabajo') }}
          </span>
        </div>

        <!-- ID Personal -->
        <div class="mb-4">
          <label class="block text-gray-700">ID Personal:</label>
          <select
            v-model="form.id_personal"
            class="w-full px-3 py-2 border rounded"
            :class="{ 'border-red-500': v$.id_personal.$error }"
          >
            <option value="" disabled>Seleccione un personal</option>
            <option v-for="personal in personalOptions" :key="personal.id_personal" :value="personal.id_personal">
              {{ personal.nombres }}
            </option>
          </select>
          <span v-if="v$.id_personal.$error" class="text-red-500 text-sm">
            {{ getErrorMessage('id_personal') }}
          </span>
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

          <!-- Esférico Derecho -->
          <div class="mb-2">
            <label class="block text-gray-700">Esférico Derecho:</label>
            <input
              type="number"
              step="0.01"
              v-model.number="form.detalleTrabajo.esferico_derecho"
              class="w-full px-3 py-2 border rounded"
              :class="{ 'border-red-500': v$.detalleTrabajo.esferico_derecho.$error }"
            />
            <span v-if="v$.detalleTrabajo.esferico_derecho.$error" class="text-red-500 text-sm">
              {{ getErrorMessage('detalleTrabajo.esferico_derecho') }}
            </span>
          </div>

          <!-- Esférico Izquierdo -->
          <div class="mb-2">
            <label class="block text-gray-700">Esférico Izquierdo:</label>
            <input
              type="number"
              step="0.01"
              v-model.number="form.detalleTrabajo.esferico_izquierdo"
              class="w-full px-3 py-2 border rounded"
              :class="{ 'border-red-500': v$.detalleTrabajo.esferico_izquierdo.$error }"
            />
            <span v-if="v$.detalleTrabajo.esferico_izquierdo.$error" class="text-red-500 text-sm">
              {{ getErrorMessage('detalleTrabajo.esferico_izquierdo') }}
            </span>
          </div>

          <!-- Cilindro Derecho -->
          <div class="mb-2">
            <label class="block text-gray-700">Cilindro Derecho:</label>
            <input
              type="number"
              step="0.01"
              v-model.number="form.detalleTrabajo.cilindro_derecho"
              class="w-full px-3 py-2 border rounded"
              :class="{ 'border-red-500': v$.detalleTrabajo.cilindro_derecho.$error }"
            />
            <span v-if="v$.detalleTrabajo.cilindro_derecho.$error" class="text-red-500 text-sm">
              {{ getErrorMessage('detalleTrabajo.cilindro_derecho') }}
            </span>
          </div>

          <!-- Cilindro Izquierdo -->
          <div class="mb-2">
            <label class="block text-gray-700">Cilindro Izquierdo:</label>
            <input
              type="number"
              step="0.01"
              v-model.number="form.detalleTrabajo.cilindro_izquierdo"
              class="w-full px-3 py-2 border rounded"
              :class="{ 'border-red-500': v$.detalleTrabajo.cilindro_izquierdo.$error }"
            />
            <span v-if="v$.detalleTrabajo.cilindro_izquierdo.$error" class="text-red-500 text-sm">
              {{ getErrorMessage('detalleTrabajo.cilindro_izquierdo') }}
            </span>
          </div>

          <!-- Eje Derecho -->
          <div class="mb-2">
            <label class="block text-gray-700">Eje Derecho:</label>
            <input
              type="number"
              v-model.number="form.detalleTrabajo.eje_derecho"
              class="w-full px-3 py-2 border rounded"
              :class="{ 'border-red-500': v$.detalleTrabajo.eje_derecho.$error }"
            />
            <span v-if="v$.detalleTrabajo.eje_derecho.$error" class="text-red-500 text-sm">
              {{ getErrorMessage('detalleTrabajo.eje_derecho') }}
            </span>
          </div>

          <!-- Eje Izquierdo -->
          <div class="mb-2">
            <label class="block text-gray-700">Eje Izquierdo:</label>
            <input
              type="number"
              v-model.number="form.detalleTrabajo.eje_izquierdo"
              class="w-full px-3 py-2 border rounded"
              :class="{ 'border-red-500': v$.detalleTrabajo.eje_izquierdo.$error }"
            />
            <span v-if="v$.detalleTrabajo.eje_izquierdo.$error" class="text-red-500 text-sm">
              {{ getErrorMessage('detalleTrabajo.eje_izquierdo') }}
            </span>
          </div>

          <!-- Prisma Izquierdo -->
          <div class="mb-2">
            <label class="block text-gray-700">Prisma Izquierdo:</label>
            <input
              type="number"
              step="0.01"
              v-model.number="form.detalleTrabajo.prisma_izquierdo"
              class="w-full px-3 py-2 border rounded"
              :class="{ 'border-red-500': v$.detalleTrabajo.prisma_izquierdo.$error }"
            />
            <span v-if="v$.detalleTrabajo.prisma_izquierdo.$error" class="text-red-500 text-sm">
              {{ getErrorMessage('detalleTrabajo.prisma_izquierdo') }}
            </span>
          </div>

          <!-- Prisma Derecho -->
          <div class="mb-2">
            <label class="block text-gray-700">Prisma Derecho:</label>
            <input
              type="number"
              step="0.01"
              v-model.number="form.detalleTrabajo.prisma_derecho"
              class="w-full px-3 py-2 border rounded"
              :class="{ 'border-red-500': v$.detalleTrabajo.prisma_derecho.$error }"
            />
            <span v-if="v$.detalleTrabajo.prisma_derecho.$error" class="text-red-500 text-sm">
              {{ getErrorMessage('detalleTrabajo.prisma_derecho') }}
            </span>
          </div>

          <!-- Base Izquierdo -->
          <div class="mb-2">
            <label class="block text-gray-700">Base Izquierdo:</label>
            <input
              type="number"
              v-model.number="form.detalleTrabajo.base_izquierdo"
              class="w-full px-3 py-2 border rounded"
              :class="{ 'border-red-500': v$.detalleTrabajo.base_izquierdo.$error }"
            />
            <span v-if="v$.detalleTrabajo.base_izquierdo.$error" class="text-red-500 text-sm">
              {{ getErrorMessage('detalleTrabajo.base_izquierdo') }}
            </span>
          </div>

          <!-- Base Derecho -->
          <div class="mb-2">
            <label class="block text-gray-700">Base Derecho:</label>
            <input
              type="number"
              v-model.number="form.detalleTrabajo.base_derecho"
              class="w-full px-3 py-2 border rounded"
              :class="{ 'border-red-500': v$.detalleTrabajo.base_derecho.$error }"
            />
            <span v-if="v$.detalleTrabajo.base_derecho.$error" class="text-red-500 text-sm">
              {{ getErrorMessage('detalleTrabajo.base_derecho') }}
            </span>
          </div>

          <!-- Adición Izquierdo -->
          <div class="mb-2">
            <label class="block text-gray-700">Adición Izquierdo:</label>
            <input
              type="number"
              v-model.number="form.detalleTrabajo.adicion_izquierdo"
              class="w-full px-3 py-2 border rounded"
              :class="{ 'border-red-500': v$.detalleTrabajo.adicion_izquierdo.$error }"
            />
            <span v-if="v$.detalleTrabajo.adicion_izquierdo.$error" class="text-red-500 text-sm">
              {{ getErrorMessage('detalleTrabajo.adicion_izquierdo') }}
            </span>
          </div>

          <!-- Adición Derecho -->
          <div class="mb-2">
            <label class="block text-gray-700">Adición Derecho:</label>
            <input
              type="number"
              v-model.number="form.detalleTrabajo.adicion_derecho"
              class="w-full px-3 py-2 border rounded"
              :class="{ 'border-red-500': v$.detalleTrabajo.adicion_derecho.$error }"
            />
            <span v-if="v$.detalleTrabajo.adicion_derecho.$error" class="text-red-500 text-sm">
              {{ getErrorMessage('detalleTrabajo.adicion_derecho') }}
            </span>
          </div>

          <!-- Altura Izquierdo -->
          <div class="mb-2">
            <label class="block text-gray-700">Altura Izquierdo:</label>
            <input
              type="number"
              v-model.number="form.detalleTrabajo.altura_izquierdo"
              class="w-full px-3 py-2 border rounded"
              :class="{ 'border-red-500': v$.detalleTrabajo.altura_izquierdo.$error }"
            />
            <span v-if="v$.detalleTrabajo.altura_izquierdo.$error" class="text-red-500 text-sm">
              {{ getErrorMessage('detalleTrabajo.altura_izquierdo') }}
            </span>
          </div>

          <!-- Altura Derecho -->
          <div class="mb-2">
            <label class="block text-gray-700">Altura Derecho:</label>
            <input
              type="number"
              v-model.number="form.detalleTrabajo.altura_derecho"
              class="w-full px-3 py-2 border rounded"
              :class="{ 'border-red-500': v$.detalleTrabajo.altura_derecho.$error }"
            />
            <span v-if="v$.detalleTrabajo.altura_derecho.$error" class="text-red-500 text-sm">
              {{ getErrorMessage('detalleTrabajo.altura_derecho') }}
            </span>
          </div>

          <!-- DIP Izquierdo -->
          <div class="mb-2">
            <label class="block text-gray-700">DIP Izquierdo:</label>
            <input
              type="number"
              step="0.01"
              v-model.number="form.detalleTrabajo.dip_izquierdo"
              class="w-full px-3 py-2 border rounded"
              :class="{ 'border-red-500': v$.detalleTrabajo.dip_izquierdo.$error }"
            />
            <span v-if="v$.detalleTrabajo.dip_izquierdo.$error" class="text-red-500 text-sm">
              {{ getErrorMessage('detalleTrabajo.dip_izquierdo') }}
            </span>
          </div>

          <!-- DIP Derecho -->
          <div class="mb-2">
            <label class="block text-gray-700">DIP Derecho:</label>
            <input
              type="number"
              step="0.01"
              v-model.number="form.detalleTrabajo.dip_derecho"
              class="w-full px-3 py-2 border rounded"
              :class="{ 'border-red-500': v$.detalleTrabajo.dip_derecho.$error }"
            />
            <span v-if="v$.detalleTrabajo.dip_derecho.$error" class="text-red-500 text-sm">
              {{ getErrorMessage('detalleTrabajo.dip_derecho') }}
            </span>
          </div>

          <!-- ID Tratamiento -->
          <div class="mb-2">
            <label class="block text-gray-700">ID Tratamiento:</label>
            <select
              v-model="form.detalleTrabajo.id_tratamiento"
              class="w-full px-3 py-2 border rounded"
            >
              <option value="" disabled>Seleccione un tratamiento (opcional)</option>
              <option v-for="tratamiento in tratamientosOptions" :key="tratamiento.id_tratamiento" :value="tratamiento.id_tratamiento">
                {{ tratamiento.nombre }}
              </option>
            </select>
            <span v-if="v$.detalleTrabajo.id_tratamiento.$error" class="text-red-500 text-sm">
              {{ getErrorMessage('detalleTrabajo.id_tratamiento') }}
            </span>
          </div>

          <!-- ID Producto -->
          <div class="mb-2">
            <label class="block text-gray-700">ID Producto:</label>
            <select
              v-model="form.detalleTrabajo.id_producto"
              class="w-full px-3 py-2 border rounded"
              :class="{ 'border-red-500': v$.detalleTrabajo.id_producto.$error }"
            >
              <option value="" disabled>Seleccione un producto</option>
              <option v-for="producto in productosOptions" :key="producto.id_producto" :value="producto.id_producto">
                {{ producto.nombre }}
              </option>
            </select>
            <span v-if="v$.detalleTrabajo.id_producto.$error" class="text-red-500 text-sm">
              {{ getErrorMessage('detalleTrabajo.id_producto') }}
            </span>
          </div>

          <!-- ID Color -->
          <div class="mb-2">
            <label class="block text-gray-700">ID Color:</label>
            <select
              v-model="form.detalleTrabajo.id_color"
              class="w-full px-3 py-2 border rounded"
            >
              <option value="" disabled>Seleccione un color (opcional)</option>
              <option v-for="color in coloresOptions" :key="color.id_color" :value="color.id_color">
                {{ color.nombre }}
              </option>
            </select>
            <span v-if="v$.detalleTrabajo.id_color.$error" class="text-red-500 text-sm">
              {{ getErrorMessage('detalleTrabajo.id_color') }}
            </span>
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
            class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
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
import { useVuelidate } from '@vuelidate/core';
import { createTrabajoValidator } from '../validators/CreateTrabajo.validator.ts'; // Asegúrate de que la ruta es correcta
import { createTrabajo, findProducto, findTramiento, findColor, findPersonal } from '../actions/trabajos.action.ts'; // Ajusta según la estructura de tu proyecto
import { useToast } from 'vue-toastification';

// Definir las props
const props = defineProps<{
  isOpen: boolean;
}>();

// Definir los eventos emitidos
const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'trabajo-creado'): void;
}>();

// Estado del formulario
const form = reactive({
  fecha_salida: '',
  numero_trabajo: 0,
  id_personal: '',
  detalleTrabajo: {
    distancia: false,
    esferico_derecho: null as number | null,
    esferico_izquierdo: null as number | null,
    cilindro_derecho: null as number | null,
    cilindro_izquierdo: null as number | null,
    eje_derecho: null as number | null,
    eje_izquierdo: null as number | null,
    prisma_izquierdo: null as number | null,
    prisma_derecho: null as number | null,
    base_izquierdo: null as number | null,
    base_derecho: null as number | null,
    adicion_izquierdo: null as number | null,
    adicion_derecho: null as number | null,
    altura_izquierdo: null as number | null,
    altura_derecho: null as number | null,
    dip_izquierdo: null as number | null,
    dip_derecho: null as number | null,
    id_tratamiento: '',
    id_producto: '',
    id_color: '',
  },
});

// Estado para las opciones de los selects
const productosOptions = ref<{ id_producto: string; nombre: string }[]>([]);
const tratamientosOptions = ref<{ id_tratamiento: string; nombre: string }[]>([]);
const coloresOptions = ref<{ id_color: string; nombre: string }[]>([]);
const personalOptions = ref<{ id_personal: string; nombres: string }[]>([]);

// Inicializar Vuelidate
const rules = createTrabajoValidator;
const v$ = useVuelidate(rules, form);

// Obtener el toast
const toast = useToast();

// Función para obtener todas las opciones de selects
const fetchOptions = async () => {
  try {
    const [productosRes, tratamientosRes, coloresRes, personalRes] = await Promise.all([
      findProducto(),
      findTramiento(),
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
  } catch (error) {
    toast.error('Error al cargar las opciones.');
    console.error(error);
  }
};

// Llamar a fetchOptions cuando el componente se monte
onMounted(() => {
  fetchOptions();
});

// Función para emitir el evento de cierre
const emitClose = () => {
  emit('close');
};

// Función para obtener mensajes de error
const getErrorMessage = (fieldPath: string): string => {
  const fields = fieldPath.split('.');
  let field = v$;
  for (const key of fields) {
    if (field.value[key] === undefined) {
      return '';
    }
    field = field.value[key];
  }
  if (field && field.$errors.length > 0) {
    return field.$errors[0].$message;
  }
  return '';
};

// Función para enviar el formulario
const submitForm = async () => {
  v$.value.$touch();
  if (v$.value.$invalid) {
    toast.error('Por favor, corrige los errores en el formulario.');
    return;
  }

  try {
    // Preparar los datos para enviar
    const payload = {
      fecha_salida: form.fecha_salida ? new Date(form.fecha_salida).toISOString() : undefined,
      numero_trabajo: form.numero_trabajo,
      id_personal: form.id_personal,
      detalleTrabajo: {
        distancia: form.detalleTrabajo.distancia,
        esferico_derecho: form.detalleTrabajo.esferico_derecho || undefined,
        esferico_izquierdo: form.detalleTrabajo.esferico_izquierdo || undefined,
        cilindro_derecho: form.detalleTrabajo.cilindro_derecho || undefined,
        cilindro_izquierdo: form.detalleTrabajo.cilindro_izquierdo || undefined,
        eje_derecho: form.detalleTrabajo.eje_derecho || undefined,
        eje_izquierdo: form.detalleTrabajo.eje_izquierdo || undefined,
        prisma_izquierdo: form.detalleTrabajo.prisma_izquierdo || undefined,
        prisma_derecho: form.detalleTrabajo.prisma_derecho || undefined,
        base_izquierdo: form.detalleTrabajo.base_izquierdo || undefined,
        base_derecho: form.detalleTrabajo.base_derecho || undefined,
        adicion_izquierdo: form.detalleTrabajo.adicion_izquierdo || undefined,
        adicion_derecho: form.detalleTrabajo.adicion_derecho || undefined,
        altura_izquierdo: form.detalleTrabajo.altura_izquierdo || undefined,
        altura_derecho: form.detalleTrabajo.altura_derecho || undefined,
        dip_izquierdo: form.detalleTrabajo.dip_izquierdo || undefined,
        dip_derecho: form.detalleTrabajo.dip_derecho || undefined,
        id_tratamiento: form.detalleTrabajo.id_tratamiento || undefined,
        id_producto: form.detalleTrabajo.id_producto,
        id_color: form.detalleTrabajo.id_color || undefined,
      },
    };

    // Enviar la solicitud al backend usando la acción createTrabajo
    const response = await createTrabajo(payload);

    if (response.ok) {
      toast.success('Trabajo creado exitosamente.');
      emit('trabajo-creado');
      // Opcional: Resetear el formulario después de crear
      Object.assign(form, {
        fecha_salida: '',
        numero_trabajo: 0,
        id_personal: '',
        detalleTrabajo: {
          distancia: false,
          esferico_derecho: null,
          esferico_izquierdo: null,
          cilindro_derecho: null,
          cilindro_izquierdo: null,
          eje_derecho: null,
          eje_izquierdo: null,
          prisma_izquierdo: null,
          prisma_derecho: null,
          base_izquierdo: null,
          base_derecho: null,
          adicion_izquierdo: null,
          adicion_derecho: null,
          altura_izquierdo: null,
          altura_derecho: null,
          dip_izquierdo: null,
          dip_derecho: null,
          id_tratamiento: '',
          id_producto: '',
          id_color: '',
        },
      });
      v$.value.$reset();
    } else {
      toast.error(response.message || 'Ocurrió un error al crear el trabajo.');
    }
  } catch (error) {
    toast.error('Ocurrió un error al enviar el formulario.');
    console.error('Error al enviar el formulario:', error);
  }
};
</script>

<style scoped>
/* Estilos para los inputs con errores */
.border-red-500 {
  border-color: #f87171; /* Tailwind red-400 */
}
</style>
