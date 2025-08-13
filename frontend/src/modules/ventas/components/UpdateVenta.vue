<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div class="bg-white p-6 w-full max-w-4xl rounded-lg shadow-md">
      <h2 class="text-2xl font-semibold text-gray-800 mb-4">Actualizar Venta</h2>

      <!-- Barra de búsqueda para personal -->
      <div class="mb-6">
        <label class="block text-gray-700 font-semibold mb-2">Buscar Personal</label>
        <div class="relative">
          <input
            v-model="busquedaPersonal"
            @input="buscarPersonal"
            type="text"
            class="w-full border rounded-lg p-3 pl-10 focus:ring-2 focus:ring-orange-400 outline-none"
            placeholder="Escribe el nombre del personal..."
          />
          <svg class="w-5 h-5 text-gray-400 absolute left-3 top-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>

          <!-- Lista de resultados -->
          <ul v-if="resultadosBusqueda.length" class="absolute z-10 mt-1 w-full bg-white border rounded-lg shadow-lg max-h-56 overflow-y-auto">
            <li
              v-for="persona in resultadosBusqueda"
              :key="persona.id_personal"
              @click="seleccionarPersona(persona)"
              class="px-4 py-2 hover:bg-orange-100 cursor-pointer"
            >
              {{ persona.nombres }}
            </li>
          </ul>
        </div>
        <p v-if="formData.id_persona" class="mt-2 text-gray-700">
          Comprador: <span class="font-semibold">{{ formData.nombre_persona }}</span>
        </p>
      </div>

      <!-- Barra de búsqueda para trabajos -->
      <div class="mb-4">
        <label class="block text-gray-700 font-semibold mb-2">Buscar Trabajo por Número</label>
        <input
          v-model="busquedaTrabajo"
          type="text"
          class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-orange-400 outline-none"
          placeholder="Escribe el número del trabajo..."
        />
      </div>

      <!-- Lista de trabajos pendientes -->
      <div>
        <h3 class="text-lg font-semibold text-gray-700 mb-3">Trabajos Pendientes</h3>
        <div v-if="!loading && trabajosPendientesFiltrados.length === 0" class="text-gray-500">
          No hay trabajos pendientes disponibles.
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-80 overflow-y-auto">
          <div
            v-for="trabajo in trabajosPendientesFiltrados"
            :key="trabajo.id_trabajo"
            class="border rounded-lg p-4 flex justify-between items-center shadow-sm hover:shadow-md transition"
          >
            <div>
              <p class="font-semibold text-gray-800">Nº {{ trabajo.numero_trabajo }}</p>
              <p class="text-sm text-gray-600">Personal: {{ trabajo.personal }}</p>
            </div>
            <button
              @click="seleccionarTrabajo(trabajo)"
              class="px-3 py-1.5 bg-orange-500 text-white rounded hover:bg-orange-600 text-sm"
            >
              Agregar
            </button>
          </div>
        </div>
      </div>

      <!-- Trabajos seleccionados -->
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
              class="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
            >
              Quitar
            </button>
          </li>
        </ul>
      </div>

      <!-- Totales -->
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
        </div>
      </div>

      <!-- Botones -->
      <div class="mt-6 flex justify-between">
        <button @click="closeModal" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancelar</button>
        <button @click="onUpdate" class="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
          Actualizar Venta
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useToast } from 'vue-toastification';
import { findPendientes, findPrecioVenta, searchPersonaVenta, getVentaForUpdate, updateVenta } from '../actions/venta.action';

const props = defineProps<{ isOpen: boolean; venta: object }>();
const emit = defineEmits(['close', 'ventaActualizada']);

const toast = useToast();

const formData = ref({
  monto_total: 0,
  id_persona: '',
  nombre_persona: '',
  trabajosSeleccionados: [] as { id_trabajo: string; numero_trabajo: number; precio_sugerido: number }[],
});

const trabajosPendientes = ref([]);
const loading = ref(false);
const busquedaPersonal = ref('');
const resultadosBusqueda = ref([]);
const busquedaTrabajo = ref('');

const precioSugeridoTotal = computed(() =>
  formData.value.trabajosSeleccionados.reduce((total, t) => total + t.precio_sugerido, 0)
);

const trabajosPendientesFiltrados = computed(() => {
  if (!busquedaTrabajo.value.trim()) return trabajosPendientes.value;
  return trabajosPendientes.value.filter(t =>
    String(t.numero_trabajo).includes(busquedaTrabajo.value.trim())
  );
});

const loadTrabajosPendientes = async () => {
  try {
    loading.value = true;
    const res = await findPendientes();
    if (res.ok) trabajosPendientes.value = res.data;
  } catch {
    toast.error('Error al cargar trabajos pendientes');
  } finally {
    loading.value = false;
  }
};

const buscarPersonal = async () => {
  if (!busquedaPersonal.value.trim()) {
    resultadosBusqueda.value = [];
    return;
  }
  try {
    const res = await searchPersonaVenta(busquedaPersonal.value);
    if (res.ok) resultadosBusqueda.value = res.data;
  } catch {
    toast.error('Error al buscar personal');
  }
};

const seleccionarPersona = (persona: any) => {
  formData.value.id_persona = persona.id_personal;
  formData.value.nombre_persona = persona.nombres;
  resultadosBusqueda.value = [];
  busquedaPersonal.value = '';
};

const seleccionarTrabajo = async (trabajo: any) => {
  if (!formData.value.trabajosSeleccionados.some(t => t.id_trabajo === trabajo.id_trabajo)) {
    const precio = await findPrecioVenta(trabajo.id_trabajo);
    if (precio.ok) {
      formData.value.trabajosSeleccionados.push({
        id_trabajo: trabajo.id_trabajo,
        numero_trabajo: trabajo.numero_trabajo,
        precio_sugerido: precio.data,
      });
    }
  }
};

const quitarTrabajo = (id_trabajo: string) => {
  formData.value.trabajosSeleccionados = formData.value.trabajosSeleccionados.filter(
    t => t.id_trabajo !== id_trabajo
  );
};

const cargarDatosVenta = async () => {
  try {
    const res = await getVentaForUpdate(props.id_venta);
    if (res.ok && res.data) {
      formData.value.id_persona = res.data.id_personal;
      formData.value.nombre_persona = res.data.nombre_persona;
      formData.value.monto_total = res.data.monto_total;
      formData.value.trabajosSeleccionados = res.data.detalleVentas.map((d: any) => ({
        id_trabajo: d.id_trabajo,
        numero_trabajo: d.numero_trabajo,
        precio_sugerido: d.precio_sugerido,
      }));
    }
  } catch {
    toast.error('Error al cargar venta');
  }
};

const onUpdate = async () => {
  try {
    const res = await updateVenta(props.id_venta, {
      monto_total: formData.value.monto_total,
      id_personal: formData.value.id_persona,
      detalleVentas: formData.value.trabajosSeleccionados.map(t => ({
        id_trabajo: t.id_trabajo,
      })),
    });
    if (res.ok) {
      toast.success('Venta actualizada');
      emit('ventaActualizada');
      closeModal();
    }
  } catch {
    toast.error('Error al actualizar');
  }
};

const closeModal = () => emit('close');

onMounted(() => {
  loadTrabajosPendientes();
  cargarDatosVenta();
});
</script>
