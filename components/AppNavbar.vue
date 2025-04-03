<template>
    <div class="w-full">
        <!-- Основное меню -->
        <ul :class="[
            'flex flex-col lg:flex-row lg:items-center w-full p-4 lg:p-0 mt-4 lg:mt-0 font-medium border border-gray-100 rounded-lg bg-gray-50 lg:space-x-8 rtl:space-x-reverse lg:border-0 lg:bg-white dark:bg-gray-800 lg:dark:bg-gray-900 dark:border-gray-700',
            menuOpen ? 'block' : 'hidden lg:flex'
        ]">
            <li v-for="nav in navbar" :key="nav.sort" class="relative group w-full lg:w-auto">
                <div class="p-1 flex items-center justify-between w-full hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded-lg transition-colors duration-200">
                    <NuxtLink :to="nav.to"
                        class="flex-1 py-3 px-4 text-gray-900 rounded lg:hover:bg-transparent lg:hover:text-cyan-700 lg:p-0 dark:text-white lg:dark:hover:text-cyan-500 dark:hover:bg-transparent dark:border-gray-700"
                        :class="{ 'lg:text-cyan-700 lg:dark:text-cyan-500': route.path == nav.path }"
                        @click="handleLinkClick">
                        <span class="text-base">{{ nav.name }}</span>
                    </NuxtLink>
                    <button v-if="Array.isArray(nav.categories) && nav.categories.length > 0" @click.stop="toggleCategory(nav)"
                        class="p-2 rounded-lg bg-gray-200 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors duration-200">
                        <svg class="w-4 h-4 transition-transform duration-200 text-gray-600 dark:text-gray-300" 
                            :class="{ 'rotate-180': isCategoryOpen(nav) }" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/></svg>
                    </button>
                </div>
                
                <!-- Выпадающее меню -->
                <div v-if="Array.isArray(nav.categories) && nav.categories.length > 0" 
                    class="lg:absolute lg:top-full lg:left-0 w-full lg:w-48 font-normal bg-gray-300 backdrop-blur-sm divide-y divide-gray-100 rounded-lg  dark:bg-black/40 dark:divide-white"
                    :class="[
                        isCategoryOpen(nav) ? 'block' : 'hidden',
                        'lg:group-hover:block',
                        {'lg:right-0 lg:left-auto': isNearRightEdge}
                    ]">
                    <ul class="p-1 text-sm text-gray-700 dark:text-gray-200 max-h-[60vh] overflow-y-auto">
                        <li v-for="category in nav.categories" :key="category.id" class="relative group/sub w-full">
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

                            <!-- Вложенное выпадающее меню -->
                            <div v-if="Array.isArray(category.subcategories) && category.subcategories.length > 0"
                                class="lg:absolute lg:top-0 lg:left-full w-full lg:w-48 bg-gray-200 backdrop-blur-sm divide-y divide-gray-100 rounded-lg shadow-lg dark:bg-gray-700/60 max-h-[60vh] overflow-y-auto"
                                :class="[
                                    isSubcategoryOpen(category) ? 'block' : 'hidden',
                                    'lg:group-hover/sub:block',
                                    {
                                        'lg:right-full lg:left-auto': isNearRightEdge,
                                        'lg:bottom-0 lg:top-auto': isNearBottomEdge
                                    }
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
    isNearRightEdge.value = rect.right + 200 > windowWidth
    isNearBottomEdge.value = rect.bottom + 200 > windowHeight
}

const handleClickOutside = (event) => {
    const menu = document.querySelector('.main-menu')
    const dropdowns = document.querySelectorAll('.dropdown-menu')
    const submenus = document.querySelectorAll('.submenu')
    const categoryButtons = document.querySelectorAll('.category-button')
    const subcategoryButtons = document.querySelectorAll('.subcategory-button')
    
    if (!menu?.contains(event.target) && 
        !Array.from(dropdowns).some(dropdown => dropdown.contains(event.target)) &&
        !Array.from(submenus).some(submenu => submenu.contains(event.target)) &&
        !Array.from(categoryButtons).some(button => button.contains(event.target)) &&
        !Array.from(subcategoryButtons).some(button => button.contains(event.target))) {
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