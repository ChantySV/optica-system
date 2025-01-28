<!-- src/components/AdminUsuarios.vue -->

<template>
  <div class="container mx-auto mt-8 bg-white p-6 rounded-lg">
    <!-- Título -->
    <h1 class="text-3xl font-bold text-gray-700 mb-6 text-center">Lista de Usuarios</h1>

    <!-- Barra de búsqueda y filtros -->
    <div class="flex flex-wrap items-center gap-4 mb-6">
      <input
        type="text"
        v-model="filters.nombre_usuario"
        placeholder="Buscar por nombre de usuario"
        class="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
      />
      <input
        type="text"
        v-model="filters.nombres"
        placeholder="Buscar por nombres"
        class="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
      />
      <button
        @click="onSearch"
        class="px-6 py-2 bg-orange-500 text-white font-medium rounded-lg shadow hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
      >
        Buscar
      </button>
      <button
        v-if="hasFilters"
        @click="resetSearch"
        class="px-6 py-2 bg-gray-300 text-gray-700 font-medium rounded-lg shadow hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
      >
        Limpiar
      </button>
    </div>

    <!-- Mensajes de carga y error -->
    <div v-if="loading" class="text-center text-gray-500 text-lg">Cargando datos...</div>
    <div v-else-if="error" class="text-center text-red-500 text-lg">{{ error }}</div>

    <!-- Tabla de usuarios -->
    <div v-else class="overflow-x-auto">
      <table class="w-full table-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <thead class="bg-gray-200 text-gray-700 uppercase text-sm border">
          <tr>
            <th
              class="px-6 py-3 text-left cursor-pointer hover:underline"
              @click="sortBy('nombre_usuario')"
            >
              Nombre de Usuario
              <span v-if="sortField === 'nombre_usuario'">
                <span v-if="sortOrder === 'ASC'">▲</span>
                <span v-else>▼</span>
              </span>
            </th>
            <th
              class="px-6 py-3 text-left cursor-pointer hover:underline"
              @click="sortBy('nombre_rol')"
            >
              Rol
              <span v-if="sortField === 'nombre_rol'">
                <span v-if="sortOrder === 'ASC'">▲</span>
                <span v-else>▼</span>
              </span>
            </th>
            <th
              class="px-6 py-3 text-left cursor-pointer hover:underline"
              @click="sortBy('nombres')"
            >
              Nombres
              <span v-if="sortField === 'nombres'">
                <span v-if="sortOrder === 'ASC'">▲</span>
                <span v-else>▼</span>
              </span>
            </th>
            <th class="px-6 py-3 text-center">Activo</th>
            <th class="px-6 py-3 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="usuario in usuarios"
            :key="usuario.id_usuario"
            class="border-b last:border-none hover:bg-gray-100 transition-colors"
          >
            <td class="px-6 py-3 text-gray-700">{{ usuario.nombre_usuario }}</td>
            <td class="px-6 py-3 text-gray-700">{{ usuario.role.nombre_rol }}</td>
            <td class="px-6 py-3 text-gray-700">{{ usuario.personal.nombres }}</td>
            <td class="px-6 py-3 text-center">
              <span
                class="px-3 py-1 rounded-full text-white"
                :class="usuario.activo ? 'bg-orange-500' : 'bg-gray-700'"
              >
                {{ usuario.activo ? 'Sí' : 'No' }}
              </span>
            </td>
            <td class="px-6 py-3 text-center">
              <button
                @click="openUpdateModal(usuario)"
                class="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 focus:outline-none"
              >
                Actualizar
              </button>
              <button
                @click="toggleActivo(usuario.id_usuario, usuario.activo)"
                :class="[
                  'px-4 py-2 text-white rounded-lg hover:opacity-80 focus:outline-none ml-2',
                  usuario.activo ? 'bg-gray-700' : 'bg-gray-700'
                ]"
              >
                {{ usuario.activo ? 'Eliminar' : 'Restaurar' }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Paginación -->
      <div class="flex justify-between items-center mt-6">
        <button
          :disabled="currentPage === 1 || loading"
          @click="goToPreviousPage"
          class="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Anterior
        </button>
        <span class="text-gray-700 font-medium">Página {{ currentPage }}</span>
        <button
          :disabled="!hasNextPage || loading"
          @click="goToNextPage"
          class="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Siguiente
        </button>
      </div>
    </div>

    <!-- Modal de Actualización -->
    <UpdateUsuarioModal
      v-if="isModalOpen"
      :usuario="selectedUsuario"
      @close="isModalOpen = false"
      @updated="handleUpdate"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { findAllUsuarios, toggleActivoUsuario } from '../../actions/admin-usuarios.action';
import { useToast } from 'vue-toastification';
import type { UsuariosResponse, Datum } from '../../interfaces/usuariosResponse.interface';
import UpdateUsuarioModal from './UpdateUsuarios.vue';

// Datos de usuarios
const usuarios = ref<Datum[]>([]);

// Estado de carga y errores
const loading = ref(true);
const error = ref<string | null>(null);

// Paginación
const totalItems = ref(0);
const itemsPerPage = 10;
const currentPage = ref(1);

// Filtros de búsqueda
const filters = ref({
  nombre_usuario: '',
  nombre_rol: '',
  nombres: '',
});

// Ordenamiento
const sortField = ref('nombre_usuario');
const sortOrder = ref<'ASC' | 'DESC'>('ASC');

// Toast para notificaciones
const toast = useToast();

// Estado para el modal de actualización
const isModalOpen = ref(false);
const selectedUsuario = ref<Datum | null>(null);

// Computed para verificar si hay filtros aplicados
const hasFilters = computed(() => {
  return Object.values(filters.value).some(filter => filter.trim() !== '');
});

// Computed para saber si hay una página siguiente
const hasNextPage = computed(() => totalItems.value > currentPage.value * itemsPerPage);

// Método para cargar los usuarios
const loadUsuarios = async () => {
  loading.value = true;
  error.value = null;

  try {
    const response: UsuariosResponse = await findAllUsuarios(
      currentPage.value,
      itemsPerPage,
      sortField.value,
      sortOrder.value,
      filters.value
    );

    if (response.ok) {
      usuarios.value = response.data;
      totalItems.value = response.total;
    } else {
      toast.error(response.message || 'Error al cargar los usuarios.');
    }
  } catch (err) {
    console.error(err);
    error.value = 'Error al cargar los usuarios.';
  } finally {
    loading.value = false;
  }
};

// Método para buscar con filtros
const onSearch = async () => {
  currentPage.value = 1;
  await loadUsuarios();
};

// Método para resetear los filtros
const resetSearch = () => {
  filters.value = {
    nombre_usuario: '',
    nombre_rol: '',
    nombres: '',
  };
  currentPage.value = 1;
  loadUsuarios();
};

// Método para ordenar
const sortBy = (field: string) => {
  if (sortField.value === field) {
    sortOrder.value = sortOrder.value === 'ASC' ? 'DESC' : 'ASC';
  } else {
    sortField.value = field;
    sortOrder.value = 'ASC';
  }
  loadUsuarios();
};

// Método para ir a la página anterior
const goToPreviousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    loadUsuarios();
  }
};

// Método para ir a la página siguiente
const goToNextPage = () => {
  if (hasNextPage.value) {
    currentPage.value++;
    loadUsuarios();
  }
};

// Método para alternar el estado 'activo' del usuario
const toggleActivo = async (id: string, activo: boolean) => {
  const result = await toggleActivoUsuario(id);
  if (result.ok && result.data) {
    const action = result.data.activo ? 'eliminado' : 'restaurado';
    toast.success(`Usuario ${action} exitosamente.`);
    loadUsuarios();
  } else {
    toast.error(result.message || 'Error al actualizar el estado del usuario.');
  }
};

// Método para abrir el modal de actualización
const openUpdateModal = (usuario: Datum) => {
  selectedUsuario.value = usuario;
  isModalOpen.value = true;
};

// Método para manejar la actualización después del modal
const handleUpdate = () => {
  loadUsuarios();
};

// Cargar los usuarios al montar el componente
onMounted(() => {
  loadUsuarios();
});
</script>
