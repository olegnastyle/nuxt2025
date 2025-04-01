<template>
    <!-- Оборачиваем кнопку и выпадающее меню в контейнер для отслеживания hover-событий -->
    <div class="relative inline-block" @mouseenter="profileToggle = true" @mouseleave="profileToggle = false">
      <!-- Кнопка профиля -->
      <button id="avatarButton" class="cursor-pointer focus:outline-none">
        <img
          v-if="index.userMe.documentId"
          class="h-7 w-7 rounded-full"
          src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
          alt="Профиль"
        />
        <svg
          v-else
          class="h-6 w-6 text-black dark:text-white hover:text-cyan-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H18C18 18.6863 15.3137 16 12 16C8.68629 16 6 18.6863 6 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11Z"></path>
        </svg>
      </button>
  
      <!-- Выпадающее меню, которое появляется при hover -->
      <div
        v-if="profileToggle"
        id="userDropdown"
        class="absolute z-10 p-1 pb-0 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600"
      >
        <div v-if="index.userMe.documentId" class="font-light">
          <div class="flex flex-col gap-1 px-4 py-3 text-sm text-gray-900 dark:text-white">
            <h3 class="font-bold">Олег Нуржанов</h3>
            <div class="truncate">{{ index.userMe.email }}</div>
          </div>
          <hr class="border-white/10" />
          <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="avatarButton">
            <li>
              <NuxtLink
                to="/profile"
                class="block px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Профиль
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/profile"
                class="block px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Настройки
              </NuxtLink>
            </li>
          </ul>
          <hr class="border-white/10" />
          <div class="py-1">
            <a
              href="#"
              @click="index.logout"
              class="block px-4 py-2 rounded text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Выйти
            </a>
          </div>
        </div>
        <div v-else>
          <ul class="p-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="avatarButton">
            <li>
              <NuxtLink
                @click="index.authToggle = false"
                to="/profile"
                class="block px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Войти
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                @click="index.authToggle = true"
                to="/profile"
                class="block px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Создать аккаунт
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script setup>
const profileToggle = ref(false)

const index = useIndexStore();
</script>