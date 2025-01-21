<template>
  <div class="container mx-auto mt-8 bg-white p-6 rounded-lg shadow-md">
    <!-- Título -->
    <h1 class="text-3xl font-semibold text-gray-800 mb-6 text-center">
      Método de Manejo de Inventario Precio Promedio Ponderado
    </h1>

    <!-- Tabla de inventario -->
    <div class="overflow-x-auto">
      <table class="w-full table-auto bg-white rounded-lg shadow-md">
        <!-- Encabezado -->
        <thead class="bg-gray-200 text-gray-700 text-sm uppercase">
          <tr>
            <th class="px-6 py-4 text-left border-b">Fecha</th>
            <th class="px-6 py-4 text-left border-b">Concepto</th>
            <th class="px-6 py-4 text-left border-b">Cantidad</th>
            <th class="px-6 py-4 text-left border-b">Valor unidad</th>
            <th class="px-6 py-4 text-left border-b">Valor total</th>
            <th class="px-6 py-4 text-left border-b">Cantidad</th>
            <th class="px-6 py-4 text-left border-b">Valor unidad</th>
            <th class="px-6 py-4 text-left border-b">Valor total</th>
            <th class="px-6 py-4 text-left border-b">Cantidad</th>
            <th class="px-6 py-4 text-left border-b">Valor unidad</th>
            <th class="px-6 py-4 text-left border-b">Valor total</th>
          </tr>
        </thead>

        <!-- Cuerpo -->
        <tbody>
          <tr
            v-for="(row, index) in data"
            :key="index"
            class="hover:bg-gray-100 transition-colors"
            :class="index % 2 === 0 ? 'bg-gray-50' : 'bg-white'"
          >
            <td class="px-6 py-4 text-gray-800">{{ row.fecha }}</td>
            <td class="px-6 py-4 text-gray-800">{{ row.concepto }}</td>
            <td class="px-6 py-4 text-gray-800">{{ row.cantidad }}</td>
            <td class="px-6 py-4 text-gray-800">${{ row.valorUnidad.toFixed(2) }}</td>
            <td class="px-6 py-4 text-gray-800">${{ row.valorTotal.toFixed(2) }}</td>
            <td class="px-6 py-4 text-gray-800">{{ row.cantidad }}</td>
            <td class="px-6 py-4 text-gray-800">${{ row.valorUnidad.toFixed(2) }}</td>
            <td class="px-6 py-4 text-gray-800">${{ row.valorTotal.toFixed(2) }}</td>
            <td class="px-6 py-4 text-gray-800">{{ row.cantidad }}</td>
            <td class="px-6 py-4 text-gray-800">${{ row.valorUnidad.toFixed(2) }}</td>
            <td class="px-6 py-4 text-gray-800">${{ row.valorTotal.toFixed(2) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
const data = [
  {
    fecha: "Marzo",
    concepto: "Compra",
    cantidad: 150,
    valorUnidad: 1000.0,
    valorTotal: 150000.0,
  },
  {
    fecha: "Junio",
    concepto: "Compra",
    cantidad: 50,
    valorUnidad: 1200.0,
    valorTotal: 60000.0,
  },
  {
    fecha: "Agosto",
    concepto: "Venta",
    cantidad: 80,
    valorUnidad: 1050.0,
    valorTotal: 84000.0,
  },
  {
    fecha: "Diciembre",
    concepto: "Venta",
    cantidad: 45,
    valorUnidad: 1050.0,
    valorTotal: 47250.0,
  },
];
</script>
