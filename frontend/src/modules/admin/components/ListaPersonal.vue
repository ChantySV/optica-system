<template>
  <div class="container mx-auto mt-8 bg-white p-6 rounded-lg shadow-md">
    <!-- Título -->
    <h1 class="text-3xl font-semibold text-gray-800 mb-6 text-center">Datos del Personal</h1>

    <!-- Tabla de personal -->
    <div class="overflow-x-auto">
      <table class="w-full table-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <!-- Encabezado -->
        <thead class="bg-gray-200 text-gray-700 uppercase text-sm">
          <tr>
            <th class="px-6 py-4 text-left border-b">Nombres</th>
            <th class="px-6 py-4 text-left border-b">Apellido Paterno</th>
            <th class="px-6 py-4 text-left border-b">Apellido Materno</th>
            <th class="px-6 py-4 text-left border-b">Email</th>
            <th class="px-6 py-4 text-left border-b">Teléfono</th>
            <th class="px-6 py-4 text-left border-b">Tipo de Persona</th>
            <th class="px-6 py-4 text-left border-b">Activo</th>
            <th class="px-6 py-4 text-left border-b">ID Personal</th>
          </tr>
        </thead>

        <!-- Cuerpo -->
        <tbody>
          <tr
            v-for="(persona, index) in personal"
            :key="persona.id"
            class="hover:bg-gray-100 transition-colors"
            :class="index % 2 === 0 ? 'bg-gray-50' : 'bg-white'"
          >
            <td class="px-6 py-4 text-gray-800">{{ persona.nombres }}</td>
            <td class="px-6 py-4 text-gray-800">{{ persona.apellidoPaterno }}</td>
            <td class="px-6 py-4 text-gray-800">{{ persona.apellidoMaterno }}</td>
            <td class="px-6 py-4 text-gray-800">{{ persona.email }}</td>
            <td class="px-6 py-4 text-gray-800">{{ persona.telefono }}</td>
            <td class="px-6 py-4 text-gray-800">{{ persona.tipoPersona }}</td>
            <td class="px-6 py-4 text-gray-800">
              <span
                class="px-3 py-1 rounded-full text-xs font-semibold"
                :class="persona.activo ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'"
              >
                {{ persona.activo ? 'Sí' : 'No' }}
              </span>
            </td>
            <td class="px-6 py-4 text-gray-800">{{ persona.idPersonal }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
const personal = [
  {
    nombres: "Juan",
    apellidoPaterno: "Pérez",
    apellidoMaterno: "García",
    email: "juan.perez@example.com",
    telefono: "709465123",
    tipoPersona: "Jurídica",
    activo: true,
    idPersonal: "c64be9d9-3adc-4c08-aebf-1665be2e2f6e",
  },
  {
    nombres: "María",
    apellidoPaterno: "Gómez",
    apellidoMaterno: "López",
    email: "maria.gomez@example.com",
    telefono: "709465124",
    tipoPersona: "Natural",
    activo: false,
    idPersonal: "d73be9d9-3adc-4c08-aebf-1665be2e2f7f",
  },
];
</script>
