<template>
    <div class="relative">
        <button @click="toggleProfile" class="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
            <ClientOnly>
                <template #default>
                    <img v-if="user?.avatar" :src="user.avatar" :alt="user.name" class="w-8 h-8 rounded-full object-cover">
                    <svg v-else class="size-5 text-black dark:text-white hover:text-cyan-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clip-rule="evenodd" />
                    </svg>
                </template>
                <template #fallback>
                    <div class="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                </template>
            </ClientOnly>
            <span class="text-sm font-medium text-gray-900 dark:text-white">{{ user?.name || 'Профиль' }}</span>
            <svg class="w-4 h-4 transition-transform duration-200" :class="{ 'rotate-180': profileToggle }" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
            </svg>
        </button>

        <!-- Выпадающее меню -->
        <div v-if="profileToggle" 
            class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700"
            :class="[
                isNearRightEdge ? 'right-0' : 'left-0',
                isNearBottomEdge ? 'bottom-full' : 'top-full'
            ]">
            <div class="py-1">
                <NuxtLink to="/profile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700" @click="closeProfile">
                    Профиль
                </NuxtLink>
                <NuxtLink to="/orders" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700" @click="closeProfile">
                    Заказы
                </NuxtLink>
            </div>
            <div class="py-1">
                <button @click="logout" class="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700">
                    Выйти
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
const user = computed(() => userStore.user)

const profileToggle = ref(false)
const isNearRightEdge = ref(false)
const isNearBottomEdge = ref(false)

const toggleProfile = () => {
    profileToggle.value = !profileToggle.value
    if (profileToggle.value) {
        checkPosition()
    }
}

const closeProfile = () => {
    profileToggle.value = false
}

const logout = async () => {
    try {
        await userStore.logout()
        profileToggle.value = false
        navigateTo('/')
    } catch (error) {
        console.error('Ошибка при выходе:', error)
    }
}

const checkPosition = () => {
    const button = document.querySelector('.profile-button')
    if (!button) return
    
    const rect = button.getBoundingClientRect()
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight
    
    isNearRightEdge.value = rect.right + 200 > windowWidth
    isNearBottomEdge.value = rect.bottom + 200 > windowHeight
}

onMounted(() => {
    window.addEventListener('resize', checkPosition)
    window.addEventListener('click', (event) => {
        const profile = document.querySelector('.profile')
        if (profile && !profile.contains(event.target)) {
            closeProfile()
        }
    })
})

onUnmounted(() => {
    window.removeEventListener('resize', checkPosition)
})
</script>