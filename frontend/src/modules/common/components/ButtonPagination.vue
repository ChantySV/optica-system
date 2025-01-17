<template>
  <div class="mt-8 flex justify-center">
    <div class="mt-4">
      <div class="flex px-4 py-4 overflow-x-auto bg-white rounded-md">
        <div class="flex mr-4 rounded">
          <button :disabled="isFirtsPage" @click="$router.push({ query: { page: page - 1 } })"
            class="px-3 py-2 ml-0 leading-tight text-indigo-700 bg-white border border-r-0 border-gray-200 rounded-l hover:bg-indigo-500 hover:text-white"><span>Previous</span></button>
          <a href="#"
            class="px-3 py-2 leading-tight text-indigo-700 bg-white border border-r-0 border-gray-200 hover:bg-indigo-500 hover:text-white"><span>1</span></a>
          <a href="#"
            class="px-3 py-2 leading-tight text-indigo-700 bg-white border border-r-0 border-gray-200 hover:bg-indigo-500 hover:text-white"><span>2</span></a>
          <a href="#"
            class="px-3 py-2 leading-tight text-indigo-700 bg-white border border-r-0 border-gray-200 hover:bg-indigo-500 hover:text-white"><span>3</span></a>
          <button :disabled="hasMoreData" @click="$router.push({ query: { page: page + 1 } })"
            class="px-3 py-2 leading-tight text-indigo-700 bg-white border border-gray-200 rounded-r hover:bg-indigo-500 hover:text-white"><span>Next</span></button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
interface Props {
  page: number;
  isFirtsPage: boolean;
  hasMoreData: boolean;
}
defineProps<Props>()
</script>
