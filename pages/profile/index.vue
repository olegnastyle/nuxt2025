<template>
    <h1 class="my-4 text-2xl text-blue-700 darl:blue-500 font-medium">Профиль</h1>
    <!-- форма авторизации видна если нет documentId -->
    <AppAuth v-if="!index.userMe.documentId" />
    <!-- вывели данные пользователя -->
    <ul class="dark:text-white/50 text-xl">
        <li>Логин: <span class="text-white">{{ index.userMe.username }}</span></li>
        <li>Почта: <span class="text-white">{{ index.userMe.email }}</span></li>
        <li>Дата создания: <span class="text-white">{{ index.userMe.createdAt }}</span></li>
    </ul>
</template>

<script setup>
const index = useIndexStore();
</script>