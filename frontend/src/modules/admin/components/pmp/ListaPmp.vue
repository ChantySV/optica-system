<template>
  <div class="p-4">
    <div v-if="loading" class="text-center py-4 text-gray-600">Cargando datos...</div>
    <div v-else-if="error" class="text-red-500 text-center py-4">{{ error }}</div>

    <!-- COMPRA / VENTA -->
    <div v-else-if="tipo === 'compra' || tipo === 'venta'" class="space-y-4">
      <div
        v-for="producto in pmpData"
        :key="producto.producto"
        class="border rounded-xl shadow-sm p-4"
      >
        <h2 class="text-xl font-bold mb-2">{{ producto.producto }}</h2>

        <div
          v-for="mes in producto.meses"
          :key="mes.fecha"
          class="bg-gray-50 p-3 rounded-lg mb-2"
        >
          <h3 class="font-semibold text-gray-700">{{ mes.fecha }}</h3>
          <table class="w-full mt-2 text-sm text-left">
            <thead>
              <tr class="bg-gray-100 text-gray-700">
                <th class="px-2 py-1">Fecha</th>
                <th class="px-2 py-1">Concepto</th>
                <th class="px-2 py-1">Cantidad</th>
                <th class="px-2 py-1">Valor Unitario</th>
                <th class="px-2 py-1">Valor Total</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="entrada in mes.entradas"
                :key="entrada.fecha + entrada.valor_total"
                class="border-b"
              >
                <td class="px-2 py-1">{{ entrada.fecha }}</td>
                <td class="px-2 py-1 capitalize">{{ entrada.concepto }}</td>
                <td class="px-2 py-1">{{ entrada.cantidad }}</td>
                <td class="px-2 py-1">{{ entrada.valor_unidad }}</td>
                <td class="px-2 py-1">{{ entrada.valor_total }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- NETO -->
    <div v-else class="overflow-x-auto">
      <table class="w-full text-sm border text-left">
        <thead>
          <tr class="bg-gray-100 text-gray-700">
            <th class="px-2 py-1">Mes</th>
            <th class="px-2 py-1">Compras</th>
            <th class="px-2 py-1">Ventas</th>
            <th class="px-2 py-1">Total Compras</th>
            <th class="px-2 py-1">Total Ventas</th>
            <th class="px-2 py-1">Balance Neto</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in pmpData" :key="item.mesAno" class="border-b">
            <td class="px-2 py-1">{{ item.mesAno }}</td>
            <td class="px-2 py-1">{{ item.compras }}</td>
            <td class="px-2 py-1">{{ item.ventas }}</td>
            <td class="px-2 py-1">{{ item.comprasTotales }}</td>
            <td class="px-2 py-1">{{ item.ventasTotales }}</td>
            <td class="px-2 py-1 font-semibold">{{ item.balanceNeto }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  tipo: string
  searchQuery: string
  pmpData: any[]
  loading: boolean
  error: string | null
  page: number
  limit: number
}>()
</script>

<style scoped>
/* Tablas */
table {
  border-collapse: collapse;
  width: 100%;
  background-color: white;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

th,
td {
  border: 1px solid #ddd;
  padding: 0.75rem 1rem;
  text-align: left;
  color: #374151; /* text-gray-700 */
  font-size: 0.875rem; /* text-sm */
}

thead th {
  background-color: #e5e7eb; /* bg-gray-200 */
  text-transform: uppercase;
  font-weight: 600;
  color: #374151;
}

tbody tr:hover {
  background-color: #f3f4f6; /* hover:bg-gray-100 */
  transition: background-color 0.2s ease-in-out;
}

h2 {
  font-size: 1.25rem; /* text-xl */
  font-weight: 700;
  color: #1f2937; /* text-gray-800 */
}

h3 {
  font-weight: 600;
  color: #4b5563; /* text-gray-700 */
  margin-bottom: 0.5rem;
}

/* Cajas */
.bg-gray-50 {
  background-color: #f9fafb;
}

.border {
  border: 1px solid #e5e7eb;
}

.rounded-xl {
  border-radius: 0.75rem;
}

.shadow-sm {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.p-4 {
  padding: 1rem;
}

.mb-2 {
  margin-bottom: 0.5rem;
}

/* Textos */
.text-center {
  text-align: center;
}

.text-gray-600 {
  color: #4b5563;
}

.text-red-500 {
  color: #ef4444;
}

.font-bold {
  font-weight: 700;
}

.font-semibold {
  font-weight: 600;
}
</style>
