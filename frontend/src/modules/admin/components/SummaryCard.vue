<template>
  <div class="mt-4">
    <div class="flex flex-wrap -mx-6">
      <div class="w-full px-6 sm:w-1/2 xl:w-1/3" v-for="(card, index) in cards" :key="index">
        <div class="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
          <div :class="`p-3 ${card.bgColor} bg-opacity-75 rounded-full`">
            <svg :class="`w-8 h-8 text-white`" :viewBox="card.viewBox" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path :d="card.path1" fill="currentColor" />
              <path v-if="card.path2" :d="card.path2" fill="currentColor" />
            </svg>
          </div>
          <div class="mx-5">
            <h4 class="text-2xl font-semibold text-gray-700">
              {{ card.count }}
            </h4>
            <div class="text-gray-500">{{ card.label }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const cards = [
  {
    bgColor: 'bg-indigo-600',
    count: '8,282',
    label: 'New Users',
    viewBox: '0 0 28 30',
    path1: 'M18.2 9.08889C18.2 11.5373 ...',
  },
  {
    bgColor: 'bg-blue-600',
    count: '200,521',
    label: 'Total Orders',
    viewBox: '0 0 28 28',
    path1: 'M4.19999 1.4C3.4268 ...',
    path2: 'M22.4 23.1C22.4 24.2598 ...',
  },
  {
    bgColor: 'bg-pink-600',
    count: '215,542',
    label: 'Available Products',
    viewBox: '0 0 28 28',
    path1: 'M6.99998 11.2H21L22.4 ...',
  },
];
</script>
