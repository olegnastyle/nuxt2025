<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl text-black dark:text-white font-bold mb-6">Панель управления</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Управление блоками -->
      <BlockVisibilityControl />

      <div class="p-4 text-black dark:text-white bg-white dark:bg-gray-800 rounded-lg shadow">
        <h2 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Управление навигацией</h2>
        <ul v-for="nav in navbar" :key="nav.sort" class="flex flex-col">
          <li class="flex gap-2.5 my-1.5 p-2 bg-gray-700/50 rounded-lg">
            <svg class="size-6 cursor-move" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z"></path></svg>
            <p>{{ nav.name }}</p>
          </li>
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

const navbar = ref({})
const fetchNavbar = async () => {
    try {
        // index.loader = true
        const res = await $fetch('https://static.dublecode.ru/api/navbars?sort=sort:asc')
        
        navbar.value = res.data
        console.log(navbar.value);
        
    } catch (error) {
        console.log(error)
    } finally {
        // index.loader = false
    }
}

onMounted(() => {
  globalStore.fetchGlobalSettings()
  fetchNavbar()
})
</script>