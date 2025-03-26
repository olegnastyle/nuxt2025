<template>
    <!-- компонент формы обратной связи -->
    <form @submit.prevent="submitForm" class="flex flex-col gap-2 max-w-md my-4">
        <div> 
            <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ваше имя</label>
            <input required v-model="formName" type="text" id="text" aria-describedby="helper-text-explanation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ваше имя">
        </div>
        <div> 
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ваш email</label>
            <input required v-model="formEmail" type="email" id="email" aria-describedby="helper-text-explanation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@academy.top">
        </div>
        <div>
            <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ваше сообщение</label>
            <textarea required v-model="formMessage" id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ваше сообщение..."></textarea>
        </div>
        <button type="submit" class="text-white bg-blue-600/70 hover:bg-blue-600/80 focus:ring-4 focus:outline-none focus:ring-blum-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600/60 dark:hover:bg-blue-600/70 dark:focus:ring-blue-600/80">Отправить</button>
    </form>
</template>

<script setup>
const token = '7220005627:AAESDk0AMrySvgYUWPg6LBS5_F5_Fu5UA6A';
const chatId = "-1002469163817";

const formName = ref('');
const formEmail = ref('');
const formMessage = ref('');

// Функция отправки сообщения
const sendMessage = async (message) => {
  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: 'HTML'
    }),
    headers: { 'Content-Type': 'application/json' },
  });
  return response.json();
};

// Функция обработки отправки формы
const submitForm = async () => {
  const message = `
    <b>Новое сообщение от пользователя:</b>
    <b>Имя:</b> ${formName.value}
    <b>Email:</b> ${formEmail.value}
    <b>Сообщение:</b> ${formMessage.value}
  `;

  try {
    const response = await sendMessage(message);
    if (response.ok) {
      alert('Ваше сообщение успешно отправлено!');
      // Очистка формы после успешной отправки
      formName.value = '';
      formEmail.value = '';
      formMessage.value = '';
    } else {
      alert('Ошибка при отправке сообщения. Пожалуйста, попробуйте еще раз.');
    }
  } catch (error) {
    alert('Ошибка при отправке сообщения. Пожалуйста, попробуйте еще раз.');
    console.error(error);
  }
};
</script>