<template>
  <div class="mb-20 p-4 space-y-4">

    <PmpTable
      :tipo="tipo"
      :searchQuery="searchQuery"
      :pmpData="pmpData"
      :loading="loading"
      :error="error"
      :page="currentPage"
      :limit="itemsPerPage"
    />

  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import PmpTable from '../components/pmp/ListaPmp.vue'
import { getPmp } from '../actions/admin-pmp.action'
import type { PmpResponse } from '../interfaces/Pmp.type'

const tipo = ref<'compra' | 'venta' | 'neto'>('neto')
const searchQuery = ref('')
const currentPage = ref(1)
const itemsPerPage = 10

const pmpData = ref<PmpResponse['data']>([])
const totalItems = ref(0)
const loading = ref(false)
const error = ref<string | null>(null)

const fetchData = async () => {
  loading.value = true
  error.value = null
  try {
    const response = await getPmp(tipo.value, searchQuery.value, currentPage.value, itemsPerPage)
    if (response.ok) {
      pmpData.value = response.data
      totalItems.value = response.total
    } else {
      error.value = 'Error al obtener los datos.'
      console.log(error);
    }
  } catch (e) {
    error.value = 'Error de red.'
  } finally {
    loading.value = false
  }
}

const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage))

watch([tipo, searchQuery, currentPage], fetchData, { immediate: true })
</script>
