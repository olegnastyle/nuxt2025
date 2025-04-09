<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl text-black dark:text-white font-bold mb-6">Панель управления</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Управление блоками -->
      <BlockVisibilityControl />

      <div class="p-4 text-black dark:text-white bg-white dark:bg-gray-800 rounded-lg shadow">
        <h2 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Управление навигацией</h2>
        <div class="flex flex-col gap-2">
          <div v-for="(item, index) in sortedNavbar" :key="item.id" 
               class="flex items-center gap-2.5 my-1.5 p-2 bg-gray-700/50 rounded-lg cursor-move active:bg-gray-700"
               draggable="true"
               @dragstart="dragStart($event, index)"
               @dragover.prevent
               @dragenter="dragEnter($event, index)"
               @dragleave="dragLeave($event)"
               @drop="drop($event, index)"
               :class="{ 'bg-gray-600/50': isDragging && draggedItemIndex === index }">
            <div class="flex items-center justify-center w-8 h-8">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z"></path>
              </svg>
            </div>
            <p class="flex-1">{{ item.name }}</p>
            <span class="text-sm text-gray-400">Порядок: {{ item.sort }}</span>
          </div>
        </div>
        <button 
          @click="saveOrder" 
          class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          :disabled="isSaving"
        >
          {{ isSaving ? 'Сохранение...' : 'Сохранить' }}
        </button>
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
import { onMounted, ref, computed } from 'vue'
import { useGlobalStore } from '~/stores/global'
import BlockVisibilityControl from '~/components/ui/BlockVisibilityControl.vue'

const globalStore = useGlobalStore()

const navbar = ref([])
const isSaving = ref(false)
const isDragging = ref(false)
const draggedItemIndex = ref(null)

// Сортируем навигацию по полю sort
const sortedNavbar = computed({
  get: () => [...navbar.value].sort((a, b) => a.sort - b.sort),
  set: (value) => {
    navbar.value = value
  }
})

// Загрузка навигации
const fetchNavbar = async () => {
  try {
    const response = await $fetch('https://static.dublecode.ru/api/navbars?populate[categories][populate][0]=subcategories&sort=sort:asc', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      }
    })
    console.log('Ответ API навигации:', response)
    navbar.value = response.data
  } catch (error) {
    console.error('Ошибка при загрузке навигации:', error)
  }
}

// Начало перетаскивания
const dragStart = (event, index) => {
  isDragging.value = true
  draggedItemIndex.value = index
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.setData('text/plain', index)
}

// Элемент перетаскивается над другим элементом
const dragEnter = (event, index) => {
  if (draggedItemIndex.value !== index) {
    // Меняем местами элементы
    const temp = sortedNavbar.value[draggedItemIndex.value]
    sortedNavbar.value[draggedItemIndex.value] = sortedNavbar.value[index]
    sortedNavbar.value[index] = temp
    
    // Обновляем индекс перетаскиваемого элемента
    draggedItemIndex.value = index
    
    // Обновляем значения sort
    sortedNavbar.value.forEach((item, idx) => {
      item.sort = idx + 1
    })
  }
}

// Элемент покидает зону другого элемента
const dragLeave = (event) => {
  // Можно добавить дополнительную логику, если нужно
}

// Элемент отпущен
const drop = (event, index) => {
  isDragging.value = false
  draggedItemIndex.value = null
}

// Сохранение нового порядка
const saveOrder = async () => {
  isSaving.value = true
  try {
    const token = localStorage.getItem('jwt')
    if (!token) {
      throw new Error('Токен авторизации не найден')
    }

    // Создаем массив промисов для обновления каждого элемента
    const updatePromises = sortedNavbar.value.map(item => {
      console.log('Обновление элемента:', item)
      return $fetch(`https://static.dublecode.ru/api/navbars/${item.documentId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: {
          data: {
            sort: item.sort
          }
        }
      })
    })
    
    // Ждем выполнения всех запросов
    await Promise.all(updatePromises)
    
    // Перезагружаем навигацию
    await fetchNavbar()
    
    // Показываем уведомление об успехе
    alert('Порядок навигации успешно обновлен')
  } catch (error) {
    console.error('Ошибка при сохранении порядка:', error)
    if (error.response?.status === 403) {
      alert('Ошибка доступа: У вас нет прав для изменения порядка навигации')
    } else if (error.response?.status === 404) {
      alert('Ошибка: Элемент навигации не найден. Возможно, структура API изменилась.')
    } else {
      alert('Произошла ошибка при сохранении порядка: ' + (error.message || 'Неизвестная ошибка'))
    }
  } finally {
    isSaving.value = false
  }
}

onMounted(() => {
  globalStore.fetchGlobalSettings()
  fetchNavbar()
})
</script>

<style scoped>
.dragging {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>