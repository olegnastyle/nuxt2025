<template>
    <ul class="flex flex-col w-full p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">

        <li v-for="nav in navbar" :key="nav.sort" class="relative hover:*:flex">
            <NuxtLink :to="nav.to"
                class="flex items-center py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:p-0 md:text-black dark:md:text-white"
                aria-current="page"
                :class="{ 'md:text-blue-700 md:dark:text-blue-500': route.path == nav.path }"
                @click="menuOpen = false">
                {{ nav.name }} <svg v-if="Array.isArray(nav.categories) && nav.categories.length > 0" class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/></svg>
            </NuxtLink>
            
            <!-- выпадающее меню -->
            <div v-if="Array.isArray(nav.categories) && nav.categories.length > 0" class="absolute top-6 z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow-sm  dark:bg-gray-700 dark:divide-gray-600">
                <ul class="p-2 text-sm text-gray-700 dark:text-gray-200">
                  <li v-for="category in nav.categories" :key="category.id">
                    <NuxtLink :to="'/'+category.slug" class="block px-4 py-2 text-nowrap rounded hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        {{ category.name }}
                    </NuxtLink>
                  </li>
                </ul>
            </div>
        </li>

        <li>
            <!-- переключатель темы -->
            <UiDarkToggle />
        </li>

    </ul>
</template>

<script setup>
const route = useRoute()
const menuOpen = defineModel()
const navbar = ref()
const index = useIndexStore();
const fetchNavbar = async () => {
    try {
        index.loader = true;
        const res = await $fetch('https://908bd2082661.vps.myjino.ru/api/navbars?populate=*&sort=sort:asc')
        navbar.value = res.data
    } catch (error) {
        console.log(error);
    } finally {
        index.loader = false;
    }
}

onMounted(() => fetchNavbar())
</script>