<template>
    <ul
        class="flex flex-col w-full p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li>
            <NuxtLink to="/"
                class="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:p-0 md:text-black dark:md:text-white"
                aria-current="page" :class="{ 'md:text-blue-700 md:dark:text-blue-500': route.path == '/' }"
                @click="menuOpen = false">Главная</NuxtLink>
        </li>
        <li>
            <NuxtLink to="/blog"
                class="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                :class="{ 'md:text-blue-700 md:dark:text-blue-500': route.path == '/blog' }" @click="menuOpen = false">
                Блог</NuxtLink>
        </li>
        <li>
            <NuxtLink to="/about"
                class="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                :class="{ 'md:text-blue-700 md:dark:text-blue-500': route.path == '/about' }" @click="menuOpen = false">
                О нас</NuxtLink>
        </li>
        <li>
            <NuxtLink to="/contact"
                class="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                :class="{ 'md:text-blue-700 md:dark:text-blue-500': route.path == '/contact' }"
                @click="menuOpen = false">Контакты</NuxtLink>
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
</script>