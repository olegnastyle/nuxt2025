<template>
    <ul class="flex flex-col w-full p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li v-for="nav in navbar" :key="nav.id">
            <NuxtLink :to="nav.to"
                class="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:p-0 md:text-black dark:md:text-white"
                aria-current="page"
                :class="{ 'md:text-blue-700 md:dark:text-blue-500': route.path == nav.path }"
                @click="menuOpen = false">
                {{ nav.name }}
            </NuxtLink>
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
        const res = await $fetch('https://908bd2082661.vps.myjino.ru/api/navbars')
        navbar.value = res.data
    } catch (error) {
        console.log(error);
    } finally {
        index.loader = false;
    }
}

onMounted(() => fetchNavbar())
</script>