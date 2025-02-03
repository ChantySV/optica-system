<!-- src/components/PmpList.vue -->

<template>
  <div class="container mx-auto p-6 bg-gray-50 rounded-lg shadow-md space-y-8 mb-20">
    <!-- Título principal -->
    <h1 class="text-3xl font-bold text-gray-800 text-center">Compras, Ventas y Valor Neto</h1>

    <!-- Barra de búsqueda -->
    <div class="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Buscar por nombre de producto"
        class="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/2 focus:ring focus:ring-blue-300"
      />
      <button
        @click="fetchData"
        class="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all"
      >
        Buscar
      </button>
    </div>

    <!-- Compras -->
    <CompraPmpTable
      :pmpData="pmpCompraData"
      :loading="loadingCompra"
      :error="errorCompra"
      :currentPage="currentPageCompra"
      :totalItems="totalCompra"
      @page-change="handlePageChangeCompra"
    />

    <!-- Ventas -->
    <VentaPmpTable
      :pmpData="pmpVentaData"
      :loading="loadingVenta"
      :error="errorVenta"
      :currentPage="currentPageVenta"
      :totalItems="totalVenta"
      @page-change="handlePageChangeVenta"
    />

    <!-- Neto PMP -->
    <NetoPmpTable
      :pmpData="pmpNetoData"
      :loading="loadingNeto"
      :error="errorNeto"
      :currentPage="currentPageNeto"
      :totalItems="totalNeto"
      @page-change="handlePageChangeNeto"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getPmpCompraData, getPmpVentaData, getPmpNetoData } from '../actions/admin-pmp.action';
import type { PmpCompraData, PmpVentaData, NetoPmp } from '../interfaces/pmpResponse.interface';
import { useToast } from 'vue-toastification';
import CompraPmpTable from '../components/pmp/ListaPmpCompra.vue';
import VentaPmpTable from '../components/pmp/ListaPmpVenta.vue';
import NetoPmpTable from '../components/pmp/ListaPmpTotal.vue';

const searchQuery = ref('');

const pmpCompraData = ref<PmpCompraData[]>([]);
const pmpVentaData = ref<PmpVentaData[]>([]);
const pmpNetoData = ref<NetoPmp[]>([]);

const loadingCompra = ref(false);
const loadingVenta = ref(false);
const loadingNeto = ref(false);
const errorCompra = ref<string | null>(null);
const errorVenta = ref<string | null>(null);
const errorNeto = ref<string | null>(null);

const currentPageCompra = ref(1);
const totalCompra = ref(0);
const itemsPerPageCompra = 10;

const currentPageVenta = ref(1);
const totalVenta = ref(0);
const itemsPerPageVenta = 10;

const currentPageNeto = ref(1);
const totalNeto = ref(0);
const itemsPerPageNeto = 10;

const toast = useToast();

const fetchData = async () => {
  // Compras
  loadingCompra.value = true;
  errorCompra.value = null;

  try {
    const compraResponse = await getPmpCompraData(searchQuery.value, currentPageCompra.value, itemsPerPageCompra);
    if (compraResponse.ok) {
      pmpCompraData.value = compraResponse.data;
      totalCompra.value = compraResponse.total;
    } else {
      errorCompra.value = compraResponse.message || 'Error al cargar datos de compras.';
      toast.error(errorCompra.value);
    }
  } catch (error) {
    console.error(error);
    errorCompra.value = 'Error al cargar datos de compras.';
    toast.error(errorCompra.value);
  } finally {
    loadingCompra.value = false;
  }

  // Ventas
  loadingVenta.value = true;
  errorVenta.value = null;

  try {
    const ventaResponse = await getPmpVentaData(searchQuery.value, currentPageVenta.value, itemsPerPageVenta);
    if (ventaResponse.ok) {
      pmpVentaData.value = ventaResponse.data;
      totalVenta.value = ventaResponse.total;
    } else {
      errorVenta.value = ventaResponse.message || 'Error al cargar datos de ventas.';
      toast.error(errorVenta.value);
    }
  } catch (error) {
    console.error(error);
    errorVenta.value = 'Error al cargar datos de ventas.';
    toast.error(errorVenta.value);
  } finally {
    loadingVenta.value = false;
  }

  // Neto PMP
  loadingNeto.value = true;
  errorNeto.value = null;

  try {
    const netoResponse = await getPmpNetoData(searchQuery.value, currentPageNeto.value, itemsPerPageNeto);
    if (netoResponse.ok) {
      pmpNetoData.value = netoResponse.data;
      totalNeto.value = netoResponse.total;
    } else {
      errorNeto.value = netoResponse.message || 'Error al cargar datos netos de PMP.';
      toast.error(errorNeto.value);
    }
  } catch (error) {
    console.error(error);
    errorNeto.value = 'Error al cargar datos netos de PMP.';
    toast.error(errorNeto.value);
  } finally {
    loadingNeto.value = false;
  }
};

// Manejo de cambios de página para Compras
const handlePageChangeCompra = (newPage: number) => {
  currentPageCompra.value = newPage;
  fetchData();
};

// Manejo de cambios de página para Ventas
const handlePageChangeVenta = (newPage: number) => {
  currentPageVenta.value = newPage;
  fetchData();
};

// Manejo de cambios de página para Neto PMP
const handlePageChangeNeto = (newPage: number) => {
  currentPageNeto.value = newPage;
  fetchData();
};

// Cargar datos al montar el componente
onMounted(() => {
  fetchData();
});
</script>

<style scoped>
/* Estilos adicionales para mejorar la responsividad */
@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }
  button {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  }
}
</style>
