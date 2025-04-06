<template>
  <div class="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
    <h2 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Управление видимостью блоков</h2>
    
    <div class="space-y-4">
      <!-- Блок 1 -->
      <div class="flex items-center justify-between">
        <span class="text-gray-700 dark:text-gray-300">Блок 1</span>
        <button 
          @click="toggleBlock('block1', !globalStore.block1)"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          {{ globalStore.block1 ? 'Выключить' : 'Включить' }}
        </button>
      </div>

      <!-- Блок 2 -->
      <div class="flex items-center justify-between">
        <span class="text-gray-700 dark:text-gray-300">Блок 2</span>
        <button 
          @click="toggleBlock('block2', !globalStore.block2)"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          {{ globalStore.block2 ? 'Выключить' : 'Включить' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useGlobalStore } from '~/stores/global'

const globalStore = useGlobalStore()

onMounted(async () => {
  await globalStore.fetchGlobalSettings()
})

const toggleBlock = async (blockName, value) => {
  await globalStore.updateBlockVisibility(blockName, value)
}
</script> 