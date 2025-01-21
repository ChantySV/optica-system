<template>
  <div class="container mx-auto mt-8 bg-white p-6 rounded-lg shadow-md">
    <!-- Título -->
    <h1 class="text-3xl font-semibold text-gray-800 mb-6 text-center">Detalles de Trabajo</h1>

    <!-- Tabla de trabajo -->
    <div class="overflow-x-auto">
      <table class="w-full table-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <!-- Encabezado -->
        <thead class="bg-gray-200 text-gray-700 uppercase text-sm">
          <tr>
            <th class="px-6 py-4 text-left">Fecha de Salida</th>
            <th class="px-6 py-4 text-left">Costo</th>
            <th class="px-6 py-4 text-left">Detalles de Trabajo</th>
            <th class="px-6 py-4 text-left">Personal</th>
            <th class="px-6 py-4 text-left">Tratamiento</th>
            <th class="px-6 py-4 text-left">Producto</th>
            <th class="px-6 py-4 text-left">Color</th>
          </tr>
        </thead>

        <!-- Cuerpo -->
        <tbody>
          <tr
            class="border-b last:border-none hover:bg-gray-100 transition-colors"
          >
            <td class="px-6 py-4 text-gray-800">2025-01-05</td>
            <td class="px-6 py-4 text-gray-800 font-medium">$150.56</td>
            <td class="px-6 py-4">
              <a
                href="https://example.com/detalletrabajo/2a4c513a-b4e9-4566-bccd-798ce2a8e085"
                target="_blank"
                class="text-orange-500 hover:underline font-semibold"
              >
                Ver Detalles
              </a>
            </td>
            <td class="px-6 py-4 text-gray-800 truncate">
              Ramiro Cuellar
            </td>
            <td class="px-6 py-4 text-gray-800 truncate">
              Ninguno
            </td>
            <td class="px-6 py-4 text-gray-800 truncate">
              Lentes UV
            </td>
            <td class="px-6 py-4 text-gray-800 truncate">
              Color
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
  // No lógica requerida para datos estáticos
</script>
