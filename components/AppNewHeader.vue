<template>
    <header class="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <nav class="max-w-screen-xl mx-auto px-4 py-2 flex items-center justify-between">
            <!-- Левая часть: Логотип -->
            <!-- логотип -->
            <NuxtLink to="/" class="flex items-center space-x-3 rtl:space-x-reverse">
                <img src="~/public/favicon.ico" class="h-8" alt="Flowbite Logo" />
                <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">PlusPixel</span>
            </NuxtLink>

            <!-- Правая часть: Кнопки и меню -->
            <div class="flex items-center space-x-2">
                <!-- Кнопка переключения тёмной темы -->
                <div class="relative">
                    <!-- Сам переключатель тем -->
                    <button @click="toggleDarkMode" class="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                        :aria-label="isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'">
                        <!-- Иконка луны/ночного режима -->
                        <svg class="w-5 h-5 text-gray-700 dark:text-gray-200" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                        </svg>
                    </button>
                    <!-- Tooltip (при желании можно заменить/убрать) -->
                    <div v-if="showDarkTooltip"
                        class="absolute right-0 mt-2 w-32 bg-gray-900 text-white text-sm rounded-md px-2 py-1">
                        Toggle dark mode
                    </div>
                </div>

                <!-- Кнопка статистики/аналитики -->
                <div class="relative">
                    <button @click="toggleStatsTooltip" class="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                        :aria-label="showStatsTooltip ? 'Close analytics' : 'Open analytics'">
                        <svg class="w-5 h-5 text-gray-700 dark:text-gray-200" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                        </svg>
                    </button>
                    <!-- Tooltip статистики -->
                    <div v-if="showStatsTooltip"
                        class="absolute right-0 mt-2 w-32 bg-gray-900 text-white text-sm rounded-md px-2 py-1">
                        View analytics
                    </div>
                </div>

                <!-- Кнопка меню пользователя -->
                <div class="relative">
                    <button @click="toggleUserMenu"
                        class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                        aria-expanded="userMenuOpen">
                        <span class="sr-only">Open user menu</span>
                        <img src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user photo"
                            class="h-8 w-8 rounded-full" />
                    </button>
                    <!-- Dropdown меню пользователя -->
                    <div v-if="userMenuOpen"
                        class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg py-2">
                        <div class="px-4 py-2 border-b border-gray-200 dark:border-gray-600">
                            <span class="block text-sm font-semibold dark:text-white">Neil sims</span>
                            <span class="block text-sm text-gray-500 dark:text-gray-300">name@flowbite.com</span>
                        </div>
                        <ul class="py-2 text-sm text-gray-700 dark:text-gray-200">
                            <li>
                                <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">My
                                    profile</a>
                            </li>
                            <li>
                                <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">Account
                                    settings</a>
                            </li>
                        </ul>
                        <ul
                            class="py-2 text-sm text-gray-700 dark:text-gray-200 border-t border-gray-200 dark:border-gray-600">
                            <li>
                                <a href="#"
                                    class="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">
                                    <svg class="w-4 h-4 mr-2 text-gray-600 dark:text-gray-300" fill="currentColor"
                                        viewBox="0 0 20 20">
                                        <path fill-rule="evenodd"
                                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                            clip-rule="evenodd" />
                                    </svg>
                                    My likes
                                </a>
                            </li>
                            <li>
                                <a href="#"
                                    class="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">
                                    <svg class="w-4 h-4 mr-2 text-gray-600 dark:text-gray-300" fill="currentColor"
                                        viewBox="0 0 20 20">
                                        <path
                                            d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                                    </svg>
                                    Collections
                                </a>
                            </li>
                            <li>
                                <a href="#"
                                    class="flex items-center justify-between px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">
                                    <span class="flex items-center space-x-2">
                                        <svg class="w-4 h-4 mr-2 text-cyan-600 dark:text-cyan-500" fill="currentColor"
                                            viewBox="0 0 20 20">
                                            <path fill-rule="evenodd"
                                                d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                                                clip-rule="evenodd" />
                                        </svg>
                                        <span>Pro version</span>
                                    </span>
                                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-300" fill="currentColor"
                                        viewBox="0 0 20 20">
                                        <path fill-rule="evenodd"
                                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </a>
                            </li>
                        </ul>
                        <ul
                            class="py-2 text-sm text-gray-700 dark:text-gray-200 border-t border-gray-200 dark:border-gray-600">
                            <li>
                                <a href="#"
                                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 text-red-600 dark:text-red-400">
                                    Sign out
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- Ссылка Log out (как отдельная кнопка/ссылка) -->
                <a href="#" class="hidden md:inline-block text-cyan-600 dark:text-cyan-500 hover:underline font-medium">
                    Log out
                </a>

                <!-- Кнопка открытия мобильного меню -->
                <button @click="toggleMobileMenu" type="button"
                    class="inline-flex items-center p-2 text-sm rounded-lg md:hidden hover:bg-gray-100 dark:hover:bg-gray-700"
                    :aria-expanded="mobileMenuOpen">
                    <span class="sr-only">Open main menu</span>
                    <svg v-if="!mobileMenuOpen" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd"
                            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
                    </svg>
                    <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
                    </svg>
                </button>
            </div>
        </nav>

        <!-- Мобильное меню -->
        <div v-if="mobileMenuOpen"
            class="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
            id="mobile-menu-2">
            <ul class="flex flex-col p-4 space-y-2 text-gray-700 dark:text-gray-200">
                <li>
                    <a href="#"
                        class="block px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-cyan-600 dark:text-cyan-500">
                        Home
                    </a>
                </li>
                <li>
                    <a href="#" class="block px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                        Company
                    </a>
                </li>
                <li>
                    <a href="#" class="block px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                        Marketplace
                    </a>
                </li>
                <li>
                    <a href="#" class="block px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                        Features
                    </a>
                </li>
                <li>
                    <a href="#" class="block px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                        Team
                    </a>
                </li>
                <li>
                    <a href="#" class="block px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                        Contact
                    </a>
                </li>
            </ul>
        </div>
    </header>
</template>

<script setup>
import { ref } from 'vue'

/**
 * Состояния
 */
const isDarkMode = ref(false)
const showDarkTooltip = ref(false)
const showStatsTooltip = ref(false)
const userMenuOpen = ref(false)
const mobileMenuOpen = ref(false)

/**
 * Методы
 */
function toggleDarkMode() {
    isDarkMode.value = !isDarkMode.value
    if (isDarkMode.value) {
        document.documentElement.classList.add('dark')
    } else {
        document.documentElement.classList.remove('dark')
    }
}

function toggleUserMenu() {
    userMenuOpen.value = !userMenuOpen.value
}

function toggleMobileMenu() {
    mobileMenuOpen.value = !mobileMenuOpen.value
}

function toggleStatsTooltip() {
    showStatsTooltip.value = !showStatsTooltip.value
}

</script>

<style scoped>
/* Дополнительные стили при желании */
</style>