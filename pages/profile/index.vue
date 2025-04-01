<template>
    <h1 class="my-4 text-2xl text-cyan-700 darl:blue-500 font-medium">Профиль</h1>
    <!-- форма авторизации видна если нет documentId -->
    <AppAuth v-if="!index.userMe.documentId" />
    <!-- данные пользователя -->
    <div v-else class="flex justify-center">
        <div class="flex flex-col md:flex-row justify-center items-center gap-10 border border-black/10 dark:border-white/10 p-10 rounded-4xl">
            <div class="relative">
                <img class="h-60 w-60 rounded-xl" src="https://avatars.mds.yandex.net/i?id=4ad4287136a9196bc854535340e08640_l-4406391-images-thumbs&n=13" alt="">
                <button class="absolute top-4 left-4 text-white hover:text-cyan-700 size-8 cursor-pointer transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 3C20.5523 3 21 3.44772 21 4V5.757L19 7.757V5H5V13.1L9 9.1005L13.328 13.429L11.9132 14.8422L9 11.9289L5 15.928V19H15.533L16.2414 19.0012L17.57 17.671L18.8995 19H19V16.242L21 14.242V20C21 20.5523 20.5523 21 20 21H4C3.45 21 3 20.55 3 20V4C3 3.44772 3.44772 3 4 3H20ZM21.7782 7.80761L23.1924 9.22183L15.4142 17L13.9979 16.9979L14 15.5858L21.7782 7.80761ZM15.5 7C16.3284 7 17 7.67157 17 8.5C17 9.32843 16.3284 10 15.5 10C14.6716 10 14 9.32843 14 8.5C14 7.67157 14.6716 7 15.5 7Z"></path></svg>
                </button>
                <button class="w-full p-3 mt-3 text-black dark:text-white border border-dashed border-black/50 dark:border-white/50 opacity-50 hover:opacity-100 rounded-xl cursor-pointer transition-opacity">
                    Загрузить изображение
                </button>
            </div>
            <div>
                <div v-if="editProfileToggle">
                    <ul class="flex flex-col gap-2.5 text-black/50 dark:text-white text-sm">
                        <li>Логин:<br/><span class="text-black dark:text-white/50 text-xl">{{ index.userMe.username }}</span></li>
                        <li>Имя:<br/><span class="text-black dark:text-white/50 text-xl">Олег Игоревич</span></li>
                        <li>Почта:<br/><span class="text-black dark:text-white/50 text-xl">{{ index.userMe.email }}</span></li>
                        <li>Дата создания:<br/><span class="text-black dark:text-white/50 text-xl">{{ formatDate(index.userMe.createdAt) }}</span></li>
                    </ul>
                    <button @click="editProfileToggle = false" class="flex items-center gap-1.5 py-3 px-6 mt-3 text-black dark:text-white text-sm font-light border border-black/50 dark:border-white/50 opacity-50 hover:opacity-100 rounded-xl cursor-pointer transition-opacity">
                        <svg class="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M16.7574 2.99678L14.7574 4.99678H5V18.9968H19V9.23943L21 7.23943V19.9968C21 20.5491 20.5523 20.9968 20 20.9968H4C3.44772 20.9968 3 20.5491 3 19.9968V3.99678C3 3.4445 3.44772 2.99678 4 2.99678H16.7574ZM20.4853 2.09729L21.8995 3.5115L12.7071 12.7039L11.2954 12.7064L11.2929 11.2897L20.4853 2.09729Z"></path></svg>
                        Редактировать профиль
                    </button>
                </div>
                <div v-else>
                    <ul class="flex flex-col justify-between gap-2.5 text-black dark:text-white text-lg">
                        <li class="flex justify-between gap-12">
                            <label for="login">Логин:</label>
                            <input type="text" id="login" :placeholder="index.userMe.username" disabled>
                        </li>
                        <li class="flex justify-between gap-12">
                            <label for="name">Имя:</label>
                            <input type="text" id="name" :placeholder="'Олег Игоревич'">
                        </li>
                        <li class="flex justify-between gap-12">
                            <label for="email">Почта:</label>
                            <input type="text" id="email" :placeholder="index.userMe.email">
                        </li>
                        <li class="flex justify-between gap-12">
                            <label for="data">Дата создания:</label>
                            <input type="text" id="data" :placeholder="formatDate(index.userMe.createdAt)" disabled>
                        </li>
                    </ul>
                    <div class="flex gap-2.5">
                        <button @click="editProfileToggle = false" class="flex items-center gap-1.5 py-3 px-6 mt-3 text-black dark:text-white text-sm font-light bg-cyan-500 border border-cyan-700 opacity-50 hover:opacity-100 rounded-xl cursor-pointer transition-opacity">
                            <svg class="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M16.7574 2.99678L14.7574 4.99678H5V18.9968H19V9.23943L21 7.23943V19.9968C21 20.5491 20.5523 20.9968 20 20.9968H4C3.44772 20.9968 3 20.5491 3 19.9968V3.99678C3 3.4445 3.44772 2.99678 4 2.99678H16.7574ZM20.4853 2.09729L21.8995 3.5115L12.7071 12.7039L11.2954 12.7064L11.2929 11.2897L20.4853 2.09729Z"></path></svg>
                            Сохранить профиль
                        </button>
                        <button @click="editProfileToggle = true" class="flex items-center gap-1.5 py-3 px-6 mt-3 text-cyan-500 text-sm font-light border border-cyan-700 opacity-50 hover:opacity-100 rounded-xl cursor-pointer transition-opacity">
                            <svg class="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M16.7574 2.99678L14.7574 4.99678H5V18.9968H19V9.23943L21 7.23943V19.9968C21 20.5491 20.5523 20.9968 20 20.9968H4C3.44772 20.9968 3 20.5491 3 19.9968V3.99678C3 3.4445 3.44772 2.99678 4 2.99678H16.7574ZM20.4853 2.09729L21.8995 3.5115L12.7071 12.7039L11.2954 12.7064L11.2929 11.2897L20.4853 2.09729Z"></path></svg>
                            Отмена
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script setup>
const index = useIndexStore();
const editProfileToggle = ref(true)

// обработка даты регистрации профиля
const formatDate = (dateString) => {
    const [datePart, timePart] = dateString.split('T');
    const [year, month, day] = datePart.split('-');
    const [hours, minutes] = timePart.split(':');
    return `${day}-${month}-${year} в ${hours}:${minutes}`;
}

</script>