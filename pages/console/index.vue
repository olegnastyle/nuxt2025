<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl text-black dark:text-white font-bold mb-6">Панель управления</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Управление блоками -->
      <BlockVisibilityControl />
      
      <!-- Другие элементы управления -->
      <div class="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h2 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Другие настройки</h2>
        <!-- Здесь можно добавить другие элементы управления -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useGlobalStore } from '~/stores/global'
import BlockVisibilityControl from '~/components/ui/BlockVisibilityControl.vue'

const globalStore = useGlobalStore()

onMounted(async () => {
  await globalStore.fetchGlobalSettings()
})
</script>