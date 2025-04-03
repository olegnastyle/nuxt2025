<template>
    <!-- компонент верхнего колонтитула -->
    <header class="sticky top-0 z-50 bg-white border-gray-200 dark:bg-gray-900">
        <nav class="bg-white border-gray-200 dark:bg-gray-900">
            <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3">

                <!-- логотип -->
                <NuxtLink to="/" class="flex items-center space-x-2 rtl:space-x-reverse">
                    <img src="~/public/favicon.ico" class="h-7" alt="PlusPixel Logo" />
                    <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">PlusPixel</span>
                </NuxtLink>

                <!-- мобильные иконки -->
                <div class="flex items-center space-x-2 lg:hidden">
                    <button @click="searchOpen = !searchOpen" type="button" class="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg p-2">
                        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </button>
                    <UiDarkToggle />
                    <UiProfile />
                    <button @click="toggleMenu" type="button" class="inline-flex items-center p-2 size-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                        <svg v-if="!menuOpen"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M16 18V20H5V18H16ZM21 11V13H3V11H21ZM19 4V6H8V4H19Z"></path></svg>
                        <svg v-else  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path></svg>
                    </button>
                </div>

                <!-- десктопные элементы -->
                <div class="hidden lg:flex lg:items-center lg:space-x-4 lg:order-2">
                    <UiDarkToggle />
                    <UiProfile />
                    <div class="relative">
                        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input v-model="search" type="search" id="search-navbar" class="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-cyan-500 focus:border-cyan-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-500 dark:focus:border-cyan-500" placeholder="Поиск...">
                    </div>
                </div>
                
                <!-- мобильное меню -->
                <div :class="[
                    'w-full lg:flex lg:w-auto lg:order-1 transition-all duration-300 ease-in-out',
                    menuOpen || searchOpen ? 'block' : 'hidden'
                ]"
                id="navbar-search">
                    <!-- мобильный поиск -->
                    <div v-if="searchOpen" class="relative w-full mt-3 lg:hidden">
                        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input v-model="search" type="search" id="search-navbar-mobile" class="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-cyan-500 focus:border-cyan-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-500 dark:focus:border-cyan-500" placeholder="Поиск...">
                    </div>

                    <!-- навигация -->
                    <AppNavbar v-model="menuOpen" />
                </div>
            </div>
        </nav>
    </header>
</template>

<script setup>
const index = useIndexStore();
const search = ref('')
const router = useRouter();
const route = useRoute();

// отслеживание состояния меню
const menuOpen = ref(false)
const searchOpen = ref(false)

const toggleMenu = () => {
    menuOpen.value = !menuOpen.value
    if (menuOpen.value) {
        searchOpen.value = false
    }
}

// Наблюдаем за изменениями в состоянии поиска
watch(() => search.value, (newSearch) => {
    if (route.path != '/search') {
        router.push('/search');
    }
    index.search = newSearch
});
</script>