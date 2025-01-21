<template>
  <div class="container mx-auto mt-8 bg-white p-6 rounded-lg shadow-md">
    <!-- Título -->
    <h1 class="text-3xl font-semibold text-gray-800 mb-6 text-center">Detalles de Venta</h1>

    <!-- Tabla de venta -->
    <div class="overflow-x-auto">
      <table class="w-full table-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <!-- Encabezado -->
        <thead class="bg-gray-200 text-gray-700 uppercase text-sm">
          <tr>
            <th class="px-6 py-4 text-left">Monto Total</th>
            <th class="px-6 py-4 text-left">Id Personal</th>
            <th class="px-6 py-4 text-left">Detalles de Venta</th>
            <th class="px-6 py-4 text-left">Id Trabajo</th>
            <th class="px-6 py-4 text-left">Cantidad</th>
            <th class="px-6 py-4 text-left">Precio Unitario</th>
          </tr>
        </thead>

        <!-- Cuerpo -->
        <tbody>
          <tr
            class="border-b last:border-none hover:bg-gray-100 transition-colors"
          >
            <td class="px-6 py-4 text-gray-800 font-medium">$150.50</td>
            <td class="px-6 py-4 text-gray-800 truncate">
              d2c2af5b-8a8c-482e-ad67-36e65435c97e
            </td>
            <td class="px-6 py-4">
              <a
                href="https://example.com/detalleventa/211b5a-0625-4483-ab07-cc99b6b5f660"
                target="_blank"
                class="text-orange-500 hover:underline font-semibold"
              >
                Ver Detalles
              </a>
            </td>
            <td class="px-6 py-4 text-gray-800 truncate">
              211b5a-0625-4483-ab07-cc99b6b5f660
            </td>
            <td class="px-6 py-4 text-gray-800">2</td>
            <td class="px-6 py-4 text-gray-800">$50.25</td>
          </tr>
          <tr
            class="border-b last:border-none hover:bg-gray-100 transition-colors"
          >
            <td class="px-6 py-4 text-gray-800 font-medium">$150.50</td>
            <td class="px-6 py-4 text-gray-800 truncate">
              d2c2af5b-8a8c-482e-ad67-36e65435c97e
            </td>
            <td class="px-6 py-4">
              <a
                href="https://example.com/detalleventa/3c7143f1-3f65-4285-92f7-6eadfec66358"
                target="_blank"
                class="text-orange-500 hover:underline font-semibold"
              >
                Ver Detalles
              </a>
            </td>
            <td class="px-6 py-4 text-gray-800 truncate">
              3c7143f1-3f65-4285-92f7-6eadfec66358
            </td>
            <td class="px-6 py-4 text-gray-800">1</td>
            <td class="px-6 py-4 text-gray-800">$50.00</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
  // No lógica requerida para datos estáticos
</script>
