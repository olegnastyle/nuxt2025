<template>
    <button @click="profileToggle = !profileToggle" class="cursor-pointer">
        <img v-if="false" id="avatarButton" type="button" class="size-7 rounded-full"
            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
            alt="выпадающее меню">
        <svg v-else class="size-6 text-black dark:text-white hover:text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H18C18 18.6863 15.3137 16 12 16C8.68629 16 6 18.6863 6 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11Z"></path></svg>
    </button>

    <!-- выпадающее меню -->
    <div id="userDropdown" v-if="profileToggle"
        class="absolute z-10 p-1 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600">
        <div v-if="false">
            <div class="px-4 py-3 text-sm text-gray-900 dark:text-white">
                <div>Олег Нуржанов</div>
                <div class="font-medium truncate">olegnastyle@yandex.ru</div>
            </div>
            <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="avatarButton">
                <li>
                    <a href="#"
                        class="block px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Профиль</a>
                </li>
                <li>
                    <a href="#"
                        class="block px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    Настройки</a>
                </li>
            </ul>
            <div class="py-1">
                <a href="#"
                    class="block px-4 py-2 rounded text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                    Выйти    
                </a>
            </div>
        </div>
        <div v-else>
            <ul class="p-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="avatarButton">
                <li>
                    <NuxtLink @click="index.authToggle = false" to="/profile" class="block px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        Войти
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink @click="index.authToggle = true" to="/profile" class="block px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        Создать аккаунт
                    </NuxtLink>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
const profileToggle = ref(false)

const index = useIndexStore();
</script>