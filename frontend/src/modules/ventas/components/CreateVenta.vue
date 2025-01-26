<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div class="bg-white p-6 w-full max-w-4xl rounded-lg shadow-md">
      <h2 class="text-2xl font-semibold text-gray-800 mb-4">Crear Venta</h2>

      <!-- Barra de búsqueda para personal -->
      <div class="mb-6">
        <label for="buscar-personal" class="block text-gray-700 font-semibold mb-2">Buscar Personal</label>
        <input
          id="buscar-personal"
          v-model="busquedaPersonal"
          @input="buscarPersonal"
          type="text"
          class="w-full border rounded-lg p-3"
          placeholder="Escribe el nombre del personal..."
        />
        <ul v-if="resultadosBusqueda.length" class="mt-2 bg-white border rounded-lg">
          <li
            v-for="persona in resultadosBusqueda"
            :key="persona.id_personal"
            @click="seleccionarPersona(persona)"
            class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
          >
            {{ persona.nombres }}
          </li>
        </ul>
        <p v-if="formData.id_persona" class="mt-2 text-gray-700">Comprador: {{ formData.nombre_persona }}</p>
      </div>

      <!-- Lista de trabajos pendientes -->
      <div>
        <h3 class="text-lg font-semibold text-gray-700 mb-2">Trabajos Pendientes</h3>
        <div v-if="loading" class="text-gray-500">Cargando trabajos...</div>
        <div v-else>
          <ul class="space-y-2">
            <li
              v-for="trabajo in trabajosPendientes"
              :key="trabajo.id_trabajo"
              class="flex justify-between items-center border-b pb-2"
            >
              <span class="text-gray-700">
                <strong>Numero Trabajo: {{ trabajo.numero_trabajo }}</strong> - {{ trabajo.personal }}
              </span>
              <button
                @click="seleccionarTrabajo(trabajo)"
                class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Agregar
              </button>
            </li>
          </ul>
        </div>
      </div>

      <!-- Lista de trabajos seleccionados -->
      <div class="mt-6">
        <h3 class="text-lg font-semibold text-gray-700 mb-2">Trabajos Seleccionados</h3>
        <div v-if="formData.trabajosSeleccionados.length === 0" class="text-gray-500">
          No has seleccionado ningún trabajo.
        </div>
        <ul v-else class="space-y-2">
          <li
            v-for="trabajo in formData.trabajosSeleccionados"
            :key="trabajo.id_trabajo"
            class="flex justify-between items-center border-b pb-2"
          >
            <span class="text-gray-700">
              <strong>{{ trabajo.numero_trabajo }}</strong> - Precio sugerido: {{ trabajo.precio_sugerido }}
            </span>
            <button
              @click="quitarTrabajo(trabajo.id_trabajo)"
              class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Quitar
            </button>
          </li>
        </ul>
      </div>

      <!-- Precio sugerido total y monto total -->
      <div class="mt-6 grid grid-cols-2 gap-4">
        <div>
          <label class="block text-gray-700 font-semibold mb-2">Precio Sugerido Total:</label>
          <div class="p-3 bg-gray-100 rounded-lg">{{ precioSugeridoTotal }}</div>
        </div>
        <div>
          <label class="block text-gray-700 font-semibold mb-2">Monto Total:</label>
          <input
            v-model.number="formData.monto_total"
            type="number"
            class="w-full border rounded-lg p-3"
            placeholder="Escribe el monto total..."
          />
          <p v-if="v$.monto_total.$error" class="text-red-500 text-sm">{{ v$.monto_total.$errors[0].$message }}</p>
        </div>
      </div>

      <!-- Botones -->
      <div class="mt-6 flex justify-between">
        <button @click="closeModal" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
          Cancelar
        </button>
        <button @click="onSubmit" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Crear Venta
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, numeric, minValue } from '@vuelidate/validators';
import { createVenta, findPendientes, findPrecioVenta, searchPersonaVenta } from '../actions/venta.action';
import { useToast } from 'vue-toastification';

const props = defineProps({ isOpen: Boolean });
const emit = defineEmits(['close', 'ventaCreada']);

// Datos del formulario
const formData = ref({
  monto_total: 0,
  id_persona: '',
  nombre_persona: '',
  trabajosSeleccionados: [] as { id_trabajo: string; numero_trabajo: number; precio_sugerido: number }[],
});

// Validaciones para el formulario
const rules = {
  monto_total: { required, numeric, minValue: minValue(1) },
};
const v$ = useVuelidate(rules, formData);

const toast = useToast();

// Datos para la lista de trabajos pendientes
const trabajosPendientes = ref([]);
const loading = ref(false);

// Barra de búsqueda de personal
const busquedaPersonal = ref('');
const resultadosBusqueda = ref([]);
const buscandoPersonal = ref(false);

// Precio sugerido total (calculado dinámicamente)
const precioSugeridoTotal = computed(() =>
  formData.value.trabajosSeleccionados.reduce((total, trabajo) => total + trabajo.precio_sugerido, 0)
);

// Cargar trabajos pendientes
const loadTrabajosPendientes = async () => {
  try {
    loading.value = true;
    const response = await findPendientes();
    if (response.ok && response.data) {
      trabajosPendientes.value = response.data;
    } else {
      toast.error('No se pudieron cargar los trabajos pendientes.');
    }
  } catch (error) {
    console.error(error);
    toast.error('Error al cargar los trabajos pendientes.');
  } finally {
    loading.value = false;
  }
};

// Seleccionar un trabajo y calcular su precio sugerido
const seleccionarTrabajo = async (trabajo: any) => {
  try {
    if (!formData.value.trabajosSeleccionados.some(t => t.id_trabajo === trabajo.id_trabajo)) {
      const precioVenta = await findPrecioVenta(trabajo.id_trabajo);
      if (precioVenta.ok && precioVenta.data) {
        formData.value.trabajosSeleccionados.push({
          id_trabajo: trabajo.id_trabajo,
          numero_trabajo: trabajo.numero_trabajo,
          precio_sugerido: precioVenta.data,
        });
      }
    }
  } catch (error) {
    console.error(error);
    toast.error('Error al calcular el precio del trabajo.');
  }
};

// Quitar un trabajo seleccionado
const quitarTrabajo = (id_trabajo: string) => {
  formData.value.trabajosSeleccionados = formData.value.trabajosSeleccionados.filter(
    trabajo => trabajo.id_trabajo !== id_trabajo
  );
};

// Buscar personal
const buscarPersonal = async () => {
  if (!busquedaPersonal.value.trim()) {
    resultadosBusqueda.value = [];
    return;
  }

  try {
    buscandoPersonal.value = true;
    const response = await searchPersonaVenta(busquedaPersonal.value);
    if (response.ok && response.data) {
      resultadosBusqueda.value = response.data;
    } else {
      toast.error('No se encontraron resultados para la búsqueda.');
    }
  } catch (error) {
    console.error(error);
    toast.error('Error al buscar personal.');
  } finally {
    buscandoPersonal.value = false;
  }
};

// Seleccionar personal
const seleccionarPersona = (persona: any) => {
  formData.value.id_persona = persona.id_personal;
  formData.value.nombre_persona = persona.nombres;
  resultadosBusqueda.value = [];
  busquedaPersonal.value = '';
};

// Cerrar el modal
const closeModal = () => {
  emit('close');
};

// Enviar el formulario
const onSubmit = async () => {
  const isValid = await v$.value.$validate();
  if (!isValid) {
    toast.error('Por favor revisa los campos marcados en rojo.');
    return;
  }

  try {
    const response = await createVenta({
      monto_total: formData.value.monto_total,
      id_persona: formData.value.id_persona,
      detalleVentas: formData.value.trabajosSeleccionados.map(trabajo => ({
        id_trabajo: trabajo.id_trabajo,
      })),
    });

    if (response.ok) {
      toast.success('Venta creada con éxito.');
      emit('ventaCreada'); // Para notificar al componente padre que se creó la venta
      closeModal();
    } else {
      toast.error(response.message || 'Error al crear la venta.');
    }
  } catch (error) {
    console.error(error);
    toast.error('Hubo un error al crear la venta.');
  }
};

// Cargar trabajos al montar
onMounted(() => {
  loadTrabajosPendientes();
});
</script>
