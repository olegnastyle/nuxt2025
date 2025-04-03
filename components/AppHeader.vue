<template>
    <!-- компонент верхнего колонтитула -->
    <header>
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
                    <button @click="toggleMenu" type="button" class="inline-flex items-center p-2 w-9 h-9 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path v-if="!menuOpen" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                            <path v-else stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1l15 12M1 13l15-12"/>
                        </svg>
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