<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div class="bg-white rounded-lg w-11/12 md:w-3/4 lg:w-1/2 p-6 overflow-auto max-h-screen">
      <h2 class="text-2xl font-semibold text-gray-800 mb-4">Actualizar Trabajo</h2>

      <form @submit.prevent="handleSubmit">
        <!-- Número de Trabajo -->
        <div class="mb-4">
          <label class="block text-gray-700">Número de Trabajo</label>
          <input
            type="number"
            v-model="form.numero_trabajo"
            required
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <!-- Fecha de Salida -->
        <div class="mb-4">
          <label class="block text-gray-700">Fecha de Salida</label>
          <input
            type="date"
            v-model="form.fecha_salida"
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <!-- Estado -->
        <div class="mb-4">
          <label class="block text-gray-700">Estado</label>
          <select v-model="form.estado" required class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300">
            <option disabled value="">Seleccione un estado</option>
            <option value="entregado">Entregado</option>
            <option value="pendiente">Pendiente</option>
          </select>
        </div>

        <!-- Personal -->
        <div class="mb-4">
          <label class="block text-gray-700">Personal</label>
          <select v-model="form.id_personal" required class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300">
            <option disabled value="">Seleccione un personal</option>
            <option v-for="persona in personalList" :key="persona.id_personal" :value="persona.id_personal">
              {{ formatPersonal(persona) }}
            </option>
          </select>
        </div>

        <!-- Detalle del Trabajo -->
        <div class="mb-4">
          <h3 class="text-lg font-semibold text-gray-700 mb-2">Detalle del Trabajo</h3>
          <!-- Distancia -->
          <div class="mb-2">
            <label class="block text-gray-700">Distancia</label>
            <select v-model="form.detalleTrabajo.distancia" required class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300">
              <option disabled value="">Seleccione una opción</option>
              <option :value="true">Sí</option>
              <option :value="false">No</option>
            </select>
          </div>

          <!-- Esférico Derecho -->
          <div class="mb-2">
            <label class="block text-gray-700">Esférico Derecho</label>
            <input
              type="text"
              v-model="form.detalleTrabajo.esferico_derecho"
              class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <!-- Esférico Izquierdo -->
          <div class="mb-2">
            <label class="block text-gray-700">Esférico Izquierdo</label>
            <input
              type="text"
              v-model="form.detalleTrabajo.esferico_izquierdo"
              class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <!-- Cilindro Derecho -->
          <div class="mb-2">
            <label class="block text-gray-700">Cilindro Derecho</label>
            <input
              type="text"
              v-model="form.detalleTrabajo.cilindro_derecho"
              class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <!-- Cilindro Izquierdo -->
          <div class="mb-2">
            <label class="block text-gray-700">Cilindro Izquierdo</label>
            <input
              type="text"
              v-model="form.detalleTrabajo.cilindro_izquierdo"
              class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <!-- Eje Derecho -->
          <div class="mb-2">
            <label class="block text-gray-700">Eje Derecho</label>
            <input
              type="number"
              v-model="form.detalleTrabajo.eje_derecho"
              class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <!-- Eje Izquierdo -->
          <div class="mb-2">
            <label class="block text-gray-700">Eje Izquierdo</label>
            <input
              type="number"
              v-model="form.detalleTrabajo.eje_izquierdo"
              class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <!-- Prisma Izquierdo -->
          <div class="mb-2">
            <label class="block text-gray-700">Prisma Izquierdo</label>
            <input
              type="number"
              v-model="form.detalleTrabajo.prisma_izquierdo"
              class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <!-- Prisma Derecho -->
          <div class="mb-2">
            <label class="block text-gray-700">Prisma Derecho</label>
            <input
              type="number"
              v-model="form.detalleTrabajo.prisma_derecho"
              class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <!-- Base Izquierdo -->
          <div class="mb-2">
            <label class="block text-gray-700">Base Izquierdo</label>
            <input
              type="number"
              v-model="form.detalleTrabajo.base_izquierdo"
              class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <!-- Base Derecho -->
          <div class="mb-2">
            <label class="block text-gray-700">Base Derecho</label>
            <input
              type="number"
              v-model="form.detalleTrabajo.base_derecho"
              class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <!-- Adición Izquierdo -->
          <div class="mb-2">
            <label class="block text-gray-700">Adición Izquierdo</label>
            <input
              type="number"
              v-model="form.detalleTrabajo.adicion_izquierdo"
              class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <!-- Adición Derecho -->
          <div class="mb-2">
            <label class="block text-gray-700">Adición Derecho</label>
            <input
              type="number"
              v-model="form.detalleTrabajo.adicion_derecho"
              class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <!-- Altura Izquierdo -->
          <div class="mb-2">
            <label class="block text-gray-700">Altura Izquierdo</label>
            <input
              type="number"
              v-model="form.detalleTrabajo.altura_izquierdo"
              class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <!-- Altura Derecho -->
          <div class="mb-2">
            <label class="block text-gray-700">Altura Derecho</label>
            <input
              type="number"
              v-model="form.detalleTrabajo.altura_derecho"
              class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <!-- DIP Izquierdo -->
          <div class="mb-2">
            <label class="block text-gray-700">DIP Izquierdo</label>
            <input
              type="text"
              v-model="form.detalleTrabajo.dip_izquierdo"
              class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <!-- DIP Derecho -->
          <div class="mb-2">
            <label class="block text-gray-700">DIP Derecho</label>
            <input
              type="number"
              v-model="form.detalleTrabajo.dip_derecho"
              class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
        </div>

        <!-- Producto -->
        <div class="mb-4">
          <h3 class="text-lg font-semibold text-gray-700 mb-2">Producto</h3>
          <div class="mb-2">
            <label class="block text-gray-700">Nombre del Producto</label>
            <input
              type="text"
              v-model="form.detalleTrabajo.producto.nombre"
              required
              class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div class="mb-2">
            <label class="block text-gray-700">Stock</label>
            <input
              type="number"
              v-model="form.detalleTrabajo.producto.stock"
              required
              class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div class="mb-2">
            <label class="block text-gray-700">Precio de Compra</label>
            <input
              type="text"
              v-model="form.detalleTrabajo.producto.precio_compra"
              required
              class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div class="mb-2">
            <label class="block text-gray-700">Precio de Venta</label>
            <input
              type="text"
              v-model="form.detalleTrabajo.producto.precio_venta"
              required
              class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
        </div>

        <!-- Tratamiento (Opcional) -->
        <div class="mb-4">
          <h3 class="text-lg font-semibold text-gray-700 mb-2">Tratamiento (Opcional)</h3>
          <div class="mb-2">
            <label class="block text-gray-700">Nombre del Tratamiento</label>
            <input
              type="text"
              v-model="form.detalleTrabajo.tratamiento.nombre"
              class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div class="mb-2">
            <label class="block text-gray-700">Descripción</label>
            <textarea
              v-model="form.detalleTrabajo.tratamiento.descripcion"
              class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            ></textarea>
          </div>
        </div>

        <!-- Color (Opcional) -->
        <div class="mb-4">
          <h3 class="text-lg font-semibold text-gray-700 mb-2">Color (Opcional)</h3>
          <div class="mb-2">
            <label class="block text-gray-700">Nombre del Color</label>
            <input
              type="text"
              v-model="form.detalleTrabajo.color.nombre"
              class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
        </div>

        <!-- Botones de acción -->
        <div class="flex justify-end mt-6">
          <button type="button" @click="close" class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 focus:outline-none mr-2">
            Cancelar
          </button>
          <button type="submit" class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none">
            Actualizar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { updateTrabajo } from '../actions/trabajos.action'; // Ajusta la ruta
import { useToast } from 'vue-toastification';
import type { Trabajo, Personal } from '../interfaces/TrabajosResponse.interface';
import { backendApi } from '@/api/backendApi';

// Props
const props = defineProps<{
  isOpen: boolean;
  trabajoSeleccionado: Trabajo | null;
}>();

// Emits
const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'trabajo-actualizado'): void;
}>();

const toast = useToast();

// Formulario de actualización
const form = ref({
  numero_trabajo: '',
  fecha_entrada: '',
  fecha_salida: null,
  estado: '',
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
    producto: {
      nombre: '',
      stock: 0,
      precio_compra: '',
      precio_venta: '',
    },
    tratamiento: {
      nombre: '',
      descripcion: '',
    },
    color: {
      nombre: '',
    },
  },
});

// Lista de personal para el select
const personalList = ref<Personal[]>([]);

// Función para cargar la lista de personal
const loadPersonal = async () => {
  try {
    const response = await backendApi.get('/personal'); // Ajusta la ruta según tu API
    personalList.value = response.data.personal;
  } catch (error) {
    console.error('Error al cargar el personal:', error);
    toast.error('No se pudo cargar la lista de personal.');
  }
};

// Formatear el nombre completo del personal
const formatPersonal = (persona: Personal): string => {
  const apellidoMaterno = persona.apellido_materno ? ` ${persona.apellido_materno}` : '';
  return `${persona.nombres} ${persona.apellido_paterno}${apellidoMaterno}`;
};

// Función para cerrar el modal
const close = () => {
  emit('close');
};

// Función para manejar el envío del formulario
const handleSubmit = async () => {
  if (!props.trabajoSeleccionado) {
    toast.error('No se ha seleccionado ningún trabajo para actualizar.');
    return;
  }

  // Preparar los datos a actualizar
  const updatedData = {
    numero_trabajo: form.value.numero_trabajo,
    fecha_entrada: form.value.fecha_entrada,
    fecha_salida: form.value.fecha_salida,
    estado: form.value.estado as 'entregado' | 'pendiente',
    id_personal: form.value.id_personal,
    detalleTrabajo: {
      distancia: form.value.detalleTrabajo.distancia,
      esferico_derecho: form.value.detalleTrabajo.esferico_derecho,
      esferico_izquierdo: form.value.detalleTrabajo.esferico_izquierdo,
      cilindro_derecho: form.value.detalleTrabajo.cilindro_derecho,
      cilindro_izquierdo: form.value.detalleTrabajo.cilindro_izquierdo,
      eje_derecho: form.value.detalleTrabajo.eje_derecho,
      eje_izquierdo: form.value.detalleTrabajo.eje_izquierdo,
      prisma_izquierdo: form.value.detalleTrabajo.prisma_izquierdo,
      prisma_derecho: form.value.detalleTrabajo.prisma_derecho,
      base_izquierdo: form.value.detalleTrabajo.base_izquierdo,
      base_derecho: form.value.detalleTrabajo.base_derecho,
      adicion_izquierdo: form.value.detalleTrabajo.adicion_izquierdo,
      adicion_derecho: form.value.detalleTrabajo.adicion_derecho,
      altura_izquierdo: form.value.detalleTrabajo.altura_izquierdo,
      altura_derecho: form.value.detalleTrabajo.altura_derecho,
      dip_izquierdo: form.value.detalleTrabajo.dip_izquierdo,
      dip_derecho: form.value.detalleTrabajo.dip_derecho,
      producto: {
        nombre: form.value.detalleTrabajo.producto.nombre,
        stock: form.value.detalleTrabajo.producto.stock,
        precio_compra: form.value.detalleTrabajo.producto.precio_compra,
        precio_venta: form.value.detalleTrabajo.producto.precio_venta,
      },
      tratamiento: form.value.detalleTrabajo.tratamiento?.nombre || '',
      descripcion: form.value.detalleTrabajo.tratamiento?.descripcion || '',
      color: form.value.detalleTrabajo.color?.nombre || '',
    },
  };

  const response = await updateTrabajo(props.trabajoSeleccionado.id_trabajo, updatedData);

  if (response.ok) {
    toast.success('Trabajo actualizado exitosamente.');
    emit('trabajo-actualizado');
    close();
  } else {
    toast.error(response.message || 'Error al actualizar el trabajo.');
  }
};

// Vigilar cambios en `trabajoSeleccionado` para resetear el formulario
watch(
  () => props.trabajoSeleccionado,
  (newTrabajo) => {
    if (newTrabajo) {
      // Opcional: Puedes prefijar algunos campos si lo deseas, pero según tu requerimiento, los campos estarán vacíos
      // Si decides prefijar, puedes descomentar y ajustar lo siguiente:
      /*
      form.value.numero_trabajo = newTrabajo.numero_trabajo;
      form.value.fecha_entrada = newTrabajo.fecha_entrada;
      form.value.fecha_salida = newTrabajo.fecha_salida;
      form.value.estado = newTrabajo.estado;
      form.value.id_personal = newTrabajo.personal.id_personal;
      // Y así sucesivamente para los demás campos
      */
    }
  }
);

// Cargar la lista de personal al montar el componente
onMounted(() => {
  loadPersonal();
});
</script>

<style scoped>
/* Estilos adicionales si es necesario */
</style>
