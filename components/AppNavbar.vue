<template>
    <div class="w-full">
        <!-- Мобильное меню -->
        <ul :class="[
            'flex flex-col lg:hidden w-full p-4 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700',
            menuOpen ? 'block' : 'hidden'
        ]">
            <li v-for="nav in navbar" :key="nav.sort" class="relative w-full">
                <div class="p-1 flex items-center justify-between w-full hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded-lg transition-colors duration-200">
                    <NuxtLink :to="nav.to"
                        class="flex-1 py-3 px-4 text-gray-900 rounded dark:text-white dark:hover:bg-transparent dark:border-gray-700"
                        :class="{ 'text-cyan-700 dark:text-cyan-500': route.path == nav.path }"
                        @click="handleLinkClick">
                        <span class="text-base">{{ nav.name }}</span>
                    </NuxtLink>
                    <button v-if="Array.isArray(nav.categories) && nav.categories.length > 0" @click.stop="toggleCategory(nav)"
                        class="p-2 rounded-lg bg-gray-200 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors duration-200">
                        <svg class="w-4 h-4 transition-transform duration-200 text-gray-600 dark:text-gray-300" 
                            :class="{ 'rotate-180': isCategoryOpen(nav) }" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/></svg>
                    </button>
                </div>
                
                <!-- Мобильное выпадающее меню -->
                <div v-if="Array.isArray(nav.categories) && nav.categories.length > 0" 
                    class="w-full font-normal bg-gray-300 backdrop-blur-sm divide-y divide-gray-100 rounded-lg dark:bg-black/40 dark:divide-white"
                    :class="[
                        isCategoryOpen(nav) ? 'block' : 'hidden'
                    ]">
                    <ul class="p-1 text-sm text-gray-700 dark:text-gray-200 max-h-[60vh] overflow-y-auto">
                        <li v-for="category in nav.categories" :key="category.id" class="relative w-full">
                            <div class="flex items-center justify-between w-full">
                                <NuxtLink :to="'/'+category.slug" 
                                    class="flex-1 px-4 py-3 rounded transition-colors duration-200"
                                    @click="handleLinkClick">
                                    <span class="text-base">{{ category.name }}</span>
                                </NuxtLink>
                                <button v-if="Array.isArray(category.subcategories) && category.subcategories.length > 0"
                                    @click.stop="toggleSubcategory(category)"
                                    class="p-2 rounded-lg bg-gray-200 hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-500 transition-colors duration-200">
                                    <svg class="size-4 transition-transform rotate-90 duration-200 text-gray-600 dark:text-gray-300"
                                        :class="{ 'rotate-270': isSubcategoryOpen(category) }" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/></svg>
                                </button>
                            </div>

                            <!-- Мобильное вложенное меню -->
                            <div v-if="Array.isArray(category.subcategories) && category.subcategories.length > 0"
                                class="w-full bg-gray-200 backdrop-blur-sm divide-y divide-gray-100 rounded-lg dark:bg-gray-700/60 max-h-[60vh] overflow-y-auto"
                                :class="[
                                    isSubcategoryOpen(category) ? 'block' : 'hidden'
                                ]">
                                <ul class="p-1 text-sm w-full text-gray-700 dark:text-gray-200">
                                    <li v-for="subcategory in category.subcategories" :key="subcategory.id">
                                        <NuxtLink :to="'/'+subcategory.slug" 
                                            class="block px-4 py-3 rounded hover:bg-white dark:hover:bg-gray-600 dark:hover:text-white transition-colors duration-200"
                                            @click="handleLinkClick">
                                            <span class="text-base">{{ subcategory.name }}</span>
                                        </NuxtLink>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </li>
        </ul>

        <!-- Десктопное меню -->
        <ul class="hidden lg:flex lg:items-center lg:space-x-8 rtl:space-x-reverse">
            <li v-for="nav in navbar" :key="nav.sort" class="relative group">
                <div class="flex items-center gap-1">
                    <NuxtLink :to="nav.to"
                        class="py-2 px-3 text-gray-900 dark:text-white hover:text-cyan-700 dark:hover:text-cyan-500 transition-all duration-300 transform hover:scale-105"
                        :class="{ 'text-cyan-700 dark:text-cyan-500': route.path == nav.path }"
                        @click="handleLinkClick">
                        <span class="text-base">{{ nav.name }}</span>
                    </NuxtLink>
                    <div v-if="Array.isArray(nav.categories) && nav.categories.length > 0" 
                        class="flex items-center justify-center w-4 h-4 transition-all duration-300 group-hover:rotate-180">
                        <svg class="w-3 h-3 text-gray-500 dark:text-gray-400 group-hover:text-cyan-700 dark:group-hover:text-cyan-500" 
                            aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                        </svg>
                    </div>
                </div>

                <!-- Десктопное выпадающее меню -->
                <div v-if="Array.isArray(nav.categories) && nav.categories.length > 0" 
                    class="absolute top-full left-0 w-48 font-normal bg-white dark:bg-gray-800/50 rounded-lg shadow-lg transform transition-all duration-300 origin-top scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
                    :class="{'right-0 left-auto': isNearRightEdge}">
                    <ul class="p-1 text-sm text-gray-700 dark:text-gray-200">
                        <li v-for="category in nav.categories" :key="category.id" class="relative group/sub">
                            <div class="flex items-center justify-between w-full hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-all duration-300">
                                <NuxtLink :to="'/'+category.slug" 
                                    class="flex-1 px-4 py-3 transition-all duration-300"
                                    @click="handleLinkClick">
                                    <span class="text-base">{{ category.name }}</span>
                                </NuxtLink>
                                <div v-if="Array.isArray(category.subcategories) && category.subcategories.length > 0" 
                                    class="flex items-center justify-center w-8 h-8 transition-all duration-300">
                                    <svg class="w-3 h-3 text-gray-500 dark:text-gray-400 group-hover/sub:text-cyan-700 dark:group-hover/sub:text-cyan-500" 
                                        aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                                    </svg>
                                </div>
                            </div>

                            <!-- Десктопное вложенное меню -->
                            <div v-if="Array.isArray(category.subcategories) && category.subcategories.length > 0"
                                class="absolute top-0 left-[calc(100%-0.5rem)] w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl transform transition-all duration-300 origin-left scale-0 group-hover/sub:scale-100 opacity-0 group-hover/sub:opacity-100 -translate-x-2 group-hover/sub:translate-x-0 z-50"
                                :class="{
                                    'right-[calc(100%-0.5rem)] left-auto origin-right': isNearRightEdge,
                                    'bottom-0 top-auto': isNearBottomEdge
                                }">
                                <ul class="p-1 text-sm w-full text-gray-700 dark:text-gray-200">
                                    <li v-for="subcategory in category.subcategories" :key="subcategory.id">
                                        <NuxtLink :to="'/'+subcategory.slug" 
                                            class="block px-4 py-3 rounded hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white transition-all duration-300"
                                            @click="handleLinkClick">
                                            <span class="text-base">{{ subcategory.name }}</span>
                                        </NuxtLink>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup>
const route = useRoute()
const menuOpen = defineModel()
const navbar = ref()
const index = useIndexStore()

const isNearRightEdge = ref(false)
const isNearBottomEdge = ref(false)
const openCategories = ref(new Set())
const openSubcategories = ref(new Set())
const activeCategory = ref(null)

const isCategoryOpen = (nav) => openCategories.value.has(nav.id)
const isSubcategoryOpen = (category) => openSubcategories.value.has(category.id)

const handleLinkClick = () => {
    closeAllMenus()
    menuOpen.value = false
}

const toggleCategory = (nav) => {
    if (openCategories.value.has(nav.id)) {
        openCategories.value.delete(nav.id)
        activeCategory.value = null
    } else {
        openCategories.value.clear()
        openCategories.value.add(nav.id)
        activeCategory.value = nav.id
    }
}

const toggleSubcategory = (category) => {
    if (openSubcategories.value.has(category.id)) {
        openSubcategories.value.delete(category.id)
    } else {
        openSubcategories.value.clear()
        openSubcategories.value.add(category.id)
    }
}

const closeAllMenus = () => {
    openCategories.value.clear()
    openSubcategories.value.clear()
    activeCategory.value = null
}

const checkPosition = (element) => {
    if (!element) return
    const rect = element.getBoundingClientRect()
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight
    
    // Проверяем, не выходит ли меню за правый край экрана
    isNearRightEdge.value = rect.right + 400 > windowWidth
    
    // Проверяем, не выходит ли меню за нижний край экрана
    isNearBottomEdge.value = rect.bottom + 300 > windowHeight
}

const handleClickOutside = (event) => {
    const menu = document.querySelector('.main-menu')
    const dropdowns = document.querySelectorAll('.dropdown-menu')
    const submenus = document.querySelectorAll('.submenu')
    const categoryButtons = document.querySelectorAll('.category-button')
    const subcategoryButtons = document.querySelectorAll('.subcategory-button')
    
    const isClickInside = 
        menu?.contains(event.target) || 
        Array.from(dropdowns).some(dropdown => dropdown.contains(event.target)) ||
        Array.from(submenus).some(submenu => submenu.contains(event.target)) ||
        Array.from(categoryButtons).some(button => button.contains(event.target)) ||
        Array.from(subcategoryButtons).some(button => button.contains(event.target))
    
    if (!isClickInside) {
        closeAllMenus()
    }
}

const fetchNavbar = async () => {
    try {
        index.loader = true
        const res = await $fetch('https://static.dublecode.ru/api/navbars?populate[categories][populate][0]=subcategories&sort=sort:asc')
        navbar.value = res.data
    } catch (error) {
        console.log(error)
    } finally {
        index.loader = false
    }
}

onMounted(() => {
    fetchNavbar()
    window.addEventListener('resize', () => {
        const elements = document.querySelectorAll('.group/sub')
        elements.forEach(element => checkPosition(element))
    })
    document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
})
</script>