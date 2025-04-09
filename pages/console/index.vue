<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl text-black dark:text-white font-bold mb-6">Панель управления</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Управление блоками -->
      <BlockVisibilityControl />

      <div class="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h2 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Управление навигацией</h2>
        <ul>
          <li></li>
        </ul>
      </div>
      
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

const navbar = ref([])
const fetchNavbar = async () => {
    try {
        index.loader = true
        const res = await $fetch('https://static.dublecode.ru/api/navbars?sort=sort:asc')
        navbar.value = res.data
    } catch (error) {
        console.log(error)
    } finally {
        index.loader = false
    }
}

onMounted(async () => {
  await globalStore.fetchGlobalSettings()
  fetchNavbar()
})
</script>