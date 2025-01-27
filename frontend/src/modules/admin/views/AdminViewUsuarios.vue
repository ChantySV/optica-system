<script setup lang="ts">
import ListaUsuarios from '../components/usuarios/ListaUsuarios.vue';
import { ref } from 'vue';
import CreateUsuarioModal from '../components/usuarios/CreateUsuarios.vue';
import { useToast } from 'vue-toastification';

const isCreateModalOpen = ref(false);
const toast = useToast();

// Función para abrir el modal de creación
const openCreateModal = () => {
  isCreateModalOpen.value = true;
};

// Función para manejar el evento cuando se crea un usuario
const handleUserCreated = () => {
  toast.success('Usuario creado y lista actualizada.');
  // Aquí puedes llamar a una función para recargar la lista de usuarios
};
</script>

<template>
    <div class="container mx-auto mt-8 bg-white p-6 rounded-lg shadow">
    <div class="flex justify-end mb-4">
      <button
        @click="openCreateModal"
        class="px-6 py-2 bg-orange-500 text-white font-medium rounded-lg shadow hover:bg-orange-600 "
      >
        Crear Nuevo Usuario
      </button>
    </div>

    <!-- Resto del contenido (tabla, etc.) -->

    <!-- Modal de Creación de Usuario -->
    <CreateUsuarioModal
      v-if="isCreateModalOpen"
      @close="isCreateModalOpen = false"
      @created="handleUserCreated"
    />
    <ListaUsuarios/>
  </div>


</template>
