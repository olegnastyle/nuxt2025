<template>
  <!-- компонент регистрации -->
  <section class="bg-gray-50 dark:bg-gray-900">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <div class="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
            <h2 class="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Регистрация
            </h2>
            <form @submit.prevent="registr" class="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
                <div>
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Ваш email
                    </label>
                    <input v-model="userForma.email" type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-500 dark:focus:border-cyan-500" placeholder="name@company.com" required>
                </div>
                <div>
                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Пароль</label>
                    <input v-model="userForma.password" type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-500 dark:focus:border-cyan-500" required>
                </div>
                <div>
                    <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Повторите пароль</label>
                    <input type="confirm-password" name="confirm-password" id="confirm-password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-500 dark:focus:border-cyan-500" required>
                </div>
                <div class="flex items-start">
                    <div class="flex items-center h-5">
                      <input id="newsletter" aria-describedby="newsletter" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-cyan-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-cyan-600 dark:ring-offset-gray-800" required>
                    </div>
                    <div class="ml-3 text-sm">
                      <label for="newsletter" class="font-light text-gray-500 dark:text-gray-300">Я принимаю <NuxtLink class="font-medium text-cyan-600 hover:underline dark:text-cyan-500">правила и условия</NuxtLink></label>
                    </div>
                </div>
                <button type="submit" class="w-full text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800">
                  Создать аккаунт
                </button>
            </form>
        </div>
    </div>
  </section>
</template>

<script setup>
const index = useIndexStore();
const userForma = ref({})
const newID = ref(0)

const fetchUsers = async () => {
  try {
    const response = await $fetch('https://static.dublecode.ru/api/users?fields=username&sort=username:desc');
    const lastUser  = response[0];

    if (lastUser  && lastUser.username) {
      const match = lastUser.username.match(/\d+/);
      if (match) {
        newID.value = match[0];
      }
    }
  } catch (error) {
    console.log(`Не вышло получить последний id пользователя: ${error}`);
  }
};

const registr = async () => {
  try {
    await fetchUsers()

    if (newID) {
      const response = await $fetch(`https://static.dublecode.ru/api/auth/local/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          "username": `id${+newID.value + 1}`,
          "email": userForma.value.email,
          "password": userForma.value.password
        },
      });

      const data = await response;
      localStorage.setItem('jwt', data.jwt);
    }

  } catch (error) {
      console.error('Ошибка при обновлении просмотров:', error);
  } finally {
    index.authToggle = false;
  }
}
</script>