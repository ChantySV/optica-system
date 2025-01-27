<!-- src/components/AdminJuridicos.vue -->

<template>
  <div class="container mx-auto mt-8 bg-white p-6 rounded-lg">
    <!-- Título -->
    <h1 class="text-3xl font-bold text-gray-700 mb-6 text-center"> Personas Naturales</h1>

    <!-- Barra de búsqueda -->
    <div class="flex flex-wrap items-center gap-4 mb-6">
      <input type="text" v-model="searchQuery" placeholder="Buscar por nombres del personal"
        class="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none" />
      <button @click="onSearch"
        class="px-6 py-2 bg-orange-500 text-white font-medium rounded-lg shadow hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400">
        Buscar
      </button>
      <button v-if="searchQuery" @click="resetSearch"
        class="px-6 py-2 bg-gray-300 text-gray-700 font-medium rounded-lg shadow hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400">
        Limpiar
      </button>
    </div>

    <!-- Mensajes de carga y error -->
    <div v-if="loading" class="text-center text-gray-500 text-lg">Cargando datos...</div>
    <div v-else-if="error" class="text-center text-red-500 text-lg">{{ error }}</div>

    <!-- Tabla de personales -->
    <div v-else class="overflow-x-auto">
      <table class="w-full table-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <thead class="bg-gray-200 text-gray-700 uppercase text-sm border">
          <tr>
            <th class="px-6 py-3 text-left cursor-pointer hover:underline" @click="sortBy('nombres')">
              Nombre
              <span v-if="sortField === 'nombres'">
                <span v-if="sortOrder === 'ASC'">▲</span>
                <span v-else>▼</span>
              </span>
            </th>
            <th class="px-6 py-3 text-left cursor-pointer hover:underline" @click="sortBy('apellido_paterno')">
              Apellido Paterno
              <span v-if="sortField === 'apellido_paterno'">
                <span v-if="sortOrder === 'ASC'">▲</span>
                <span v-else>▼</span>
              </span>
            </th>
            <th class="px-6 py-3 text-left cursor-pointer hover:underline" @click="sortBy('email')">
              Email
              <span v-if="sortField === 'email'">
                <span v-if="sortOrder === 'ASC'">▲</span>
                <span v-else>▼</span>
              </span>
            </th>
            <th class="px-6 py-3 text-left">Teléfono</th>
            <th class="px-6 py-3 text-center">Activo</th>
            <th class="px-6 py-3 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="persona in personas" :key="persona.id_personal"
            class="border-b last:border-none hover:bg-gray-100 transition-colors">
            <td class="px-6 py-3 text-gray-700">{{ persona.nombres }}</td>
            <td class="px-6 py-3 text-gray-700">{{ persona.apellido_paterno }}</td>
            <td class="px-6 py-3 text-gray-700">{{ persona.email }}</td>
            <td class="px-6 py-3 text-gray-700">{{ persona.telefono }}</td>
            <td class="px-6 py-3 text-center">
              <span class="px-3 py-1 rounded-full text-white" :class="persona.activo ? 'bg-orange-500' : 'bg-gray-600'">
                {{ persona.activo ? 'Sí' : 'No' }}
              </span>
            </td>
            <td class="px-6 py-3 text-center">
              <button @click="openUpdateModal(persona)"
                class="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 focus:outline-none">
                Actualizar
              </button>
              <button @click="eliminarPersona(persona.id_personal)" :class="[
                'px-4 py-2 text-white rounded-lg hover:opacity-80 focus:outline-none ml-2',
                persona.activo ? 'bg-gray-700' : 'bg-gray-700'
              ]">
                {{ persona.activo ? 'Eliminar' : 'Restaurar' }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Paginación -->
      <div class="flex justify-between items-center mt-6">
        <button :disabled="currentPage === 1 || loading" @click="goToPreviousPage"
          class="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-400">
          Anterior
        </button>
        <span class="text-gray-700 font-medium">Página {{ currentPage }}</span>
        <button :disabled="!hasNextPage || loading" @click="goToNextPage"
          class="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-400">
          Siguiente
        </button>
      </div>
    </div>
    <!-- Modal de Actualización -->
    <UpdatePersonaModal v-if="isModalOpen" :persona="selectedPersona" @close="isModalOpen = false"
      @updated="handleUpdate" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { findAllNaturales, removePersona, searchPersonaAdmin } from '../actions/admin-personal.action';
import { useToast } from 'vue-toastification';
import type { personalInteface } from '../interfaces/personalResponse.interface';
import UpdatePersonaModal from './UpdatePersonal.vue';

const personas = ref<personalInteface[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const totalItems = ref(0);
const itemsPerPage = 10;
const currentPage = ref(1);
const searchQuery = ref('');
const sortField = ref('nombres');
const sortOrder = ref<'ASC' | 'DESC'>('ASC');
const toast = useToast();

// Estado para el modal de actualización
const isModalOpen = ref(false);
const selectedPersona = ref<personalInteface | null>(null);

const hasNextPage = computed(() => totalItems.value > currentPage.value * itemsPerPage);

const loadPersonas = async () => {
  loading.value = true;
  error.value = null;

  try {
    const offset = (currentPage.value - 1) * itemsPerPage;
    const response = await findAllNaturales(itemsPerPage, offset, sortField.value, sortOrder.value);
    if (response.ok && response.data) {
      personas.value = response.data.naturales;
      totalItems.value = response.data.total;
    } else {
      toast.error(response.message || 'Error al cargar las personas Naturales.');
    }
  } catch (err) {
    console.error(err);
    error.value = 'Error al cargar las personas jurídicas.';
  } finally {
    loading.value = false;
  }
};

const onSearch = async () => {
  if (!searchQuery.value.trim()) {
    toast.error('Por favor ingresa un término de búsqueda.');
    return;
  }

  loading.value = true;
  try {
    const response = await searchPersonaAdmin(searchQuery.value);
    if (response.ok && response.data) {
      personas.value = response.data.personas;
      totalItems.value = response.data.total;
      currentPage.value = 1; // Resetear a la primera página
    } else {
      toast.error(response.message || 'No se encontraron resultados.');
    }
  } catch (err) {
    console.error(err);
    toast.error('Error al buscar las personas jurídicas.');
  } finally {
    loading.value = false;
  }
};

const resetSearch = () => {
  searchQuery.value = '';
  currentPage.value = 1;
  loadPersonas();
};

const sortBy = (field: string) => {
  if (sortField.value === field) {
    sortOrder.value = sortOrder.value === 'ASC' ? 'DESC' : 'ASC';
  } else {
    sortField.value = field;
    sortOrder.value = 'ASC';
  }
  loadPersonas();
};

const goToPreviousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    loadPersonas();
  }
};

const goToNextPage = () => {
  if (hasNextPage.value) {
    currentPage.value++;
    loadPersonas();
  }
};

const eliminarPersona = async (id: string) => {
  const result = await removePersona(id);
  if (result.ok) {
    toast.success('Accion realizada exitosamente.');
    loadPersonas()
  } else {
    toast.error(result.message || 'Error al eliminar la persona.');
  }
};

// Abrir el modal de actualización
const openUpdateModal = (persona: personalInteface) => {
  selectedPersona.value = { ...persona };
  isModalOpen.value = true;
};

// Manejar la actualización después de que el modal emite 'updated'
const handleUpdate = () => {
  loadPersonas();
};

// Exponer el método para que el componente padre pueda llamarlo
defineExpose({
  reloadData: loadPersonas,
});

onMounted(() => {
  loadPersonas();
});
</script>
