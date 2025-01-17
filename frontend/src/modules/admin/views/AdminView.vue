<template>
  <div>
    <h3 class="text-3xl font-medium text-gray-700">
      Dashboard
    </h3>
    <SummaryCards />

    <div v-if="!personales" class="text-center h-[500px]">
      <h1 class="text-xl">Espere porfavor</h1>
    </div>
    <PersonalTable v-else :personales="personales" />
  </div>
  <ButtonPagination :hasMoreData="!!personales && personales.length < 10" :isFirtsPage="page === 1" :page="page" />
</template>


<script setup lang="ts">

import { useQuery } from '@tanstack/vue-query';
import { getPersonalJuridicoAction } from '../actions';
import SummaryCards from '../components/SummaryCard.vue';
import PersonalTable from '../components/PersonalTable.vue';
import ButtonPagination from '@/modules/common/components/ButtonPagination.vue';
import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';

const route = useRoute()
const page = ref(Number(route.query.page || 0))

const { data: personales = [], } = useQuery({
  queryKey: ['personales', { page: page.value }],
  queryFn: () => getPersonalJuridicoAction(page.value)
})

watch(
  ()=> route.query.page,
  (newpage) =>{
    page.value = Number ( newpage || 0)
  }
)


</script>
