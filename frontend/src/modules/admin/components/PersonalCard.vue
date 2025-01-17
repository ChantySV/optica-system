<template>
  <tbody class="bg-white">
    <tr>
      <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
        <div class="flex items-center">
          <div class="ml-4">
            <div class="text-sm font-medium leading-5 text-gray-900">{{ personal.nombres }}</div>
            <div class="text-sm leading-5 text-gray-500">{{ personal.apellido_paterno }} {{ personal.apellido_materno ||
              "" }}</div>
          </div>
        </div>
      </td>
      <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
        <div class="text-sm leading-5 text-gray-900">{{ personal.email }}</div>
        <div class="text-sm leading-5 text-gray-500"> {{ personal.telefono }}</div>
      </td>
      <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
        <span
          class="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">{{ personal.tipo_persona }}</span>
      </td>
      <td class="px-6 py-4 text-sm leading-5 text-gray-500 border-b border-gray-200 whitespace-nowrap">
        <a href="#" class="text-indigo-600 hover:text-indigo-900">Usuario</a>
      </td>
      <td class="px-6 py-4 text-sm font-medium leading-5 text-right border-b border-gray-200 whitespace-nowrap">
        <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>
      </td>
    </tr>
  </tbody>
</template>

<script setup lang="ts">
import type { PersonalInterface } from '../interfaces/personal.interface';

interface Props {
  personal: PersonalInterface;
}

defineProps<Props>();

</script>
