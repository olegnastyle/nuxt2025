<template>
  <!-- Контейнер для содержимого статьи с максимальной шириной и центрированием -->
  <div class="max-w-3xl mx-auto text-black dark:text-white">
      <!-- Заголовок статьи с безопасным доступом к свойству title -->
      <h1 class="text-4xl font-medium my-2">{{ post?.title }}</h1>
      <!-- Информация о статье: время чтения, просмотры, дата публикации -->
      <p v-if="post" class="opacity-50 my-1.5">
          <span>{{ post?.body ? calculateReadingTime(post?.body) : 0 }}</span> •
          <span v-html="post?.views || 0"></span>
          прочитано • {{ convertDatetime(post?.publishedAt) }}</p>
      <!-- Содержимое статьи в формате Markdown, преобразованное в HTML -->
      <div class="markdown my-1.5" v-html="body" ref="markdownContainer"></div>
  </div>
</template>

<script setup>
/**
 * Преобразует дату в формате ISO в читаемый формат "день месяц год"
 * @param {string} isoDatetime - Дата в формате ISO
 * @returns {string} - Дата в формате "день месяц год" или пустая строка
 */
function convertDatetime(isoDatetime) {
  if (!isoDatetime) return '';
  const date = new Date(isoDatetime);
  const months = [
      "янв", "фев", "мар", "апр", "май", "июн",
      "июл", "авг", "сен", "окт", "ноя", "дек"
  ];
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();
  return `${day} ${month} ${year}`;
}

// Получение информации о текущем маршруте
const route = useRoute()
const { category, id } = route.params
console.log('Параметры маршрута:', { category, id })

// Создаем реактивную переменную для хранения данных статьи
const post = ref(null);
// Получаем доступ к хранилищу состояния
const index = useIndexStore();

// Импортируем библиотеку для преобразования Markdown в HTML
import markdownit from 'markdown-it';
const md = markdownit();
// Создаем реактивную переменную для хранения HTML-содержимого
const body = ref('');

// Следим за изменениями в объекте post и преобразуем Markdown в HTML
watch(() => post.value, (newPost) => {
    if (newPost && newPost && newPost.body) {
        body.value = md.render(newPost.body);
    } else {
        console.error('Неверная структура данных поста:', newPost);
    }
}, { immediate: true });


// Создаем реактивную переменную для хранения SEO-данных
const seo = ref({});

/**
 * Загружает данные статьи с сервера
 * Запрашивает статью по slug, обновляет счетчик просмотров и устанавливает SEO-метаданные
 */
const fetch = async () => {
  try {
      // Включаем индикатор загрузки
      index.loader = true;
      // Запрашиваем данные статьи с сервера
    //   const res = await $fetch(`https://static.dublecode.ru/api/posts?filters[slug][$eqi]=${id}&filters[categories][slug][$eqi]=${category}&populate=*`);
      const res = await $fetch(`https://static.dublecode.ru/api/posts?filters[slug][$eqi]=${id}&filters[categories][slug][$eqi]=${category}&populate=*`);
      console.log('Ответ API:', res);
      
      // Проверяем, есть ли данные в ответе
      if (res.data && res.data.length > 0) {
          // Сохраняем данные статьи
          post.value = res.data[0];
          if (post.value) {
              // Обновляем счетчик просмотров
              updateViews(post.value.id);
              // Сохраняем SEO-данные
              seo.value = post.value.seo || {};
              // Устанавливаем SEO-метаданные для страницы
              useSeoMeta({
                  title: `${seo.value.metaTitle || post.value.title} | PlusPixel`,
                  description: seo.value.metaDescription || '',
                  ogTitle: seo.value.metaTitle || post.value.title,
                  ogDescription: seo.value.metaDescription || '',
              });
          }
      } else {
          console.error('Статья не найдена');
      }
  } catch (error) {
      console.error('Ошибка при загрузке статьи:', error);
  } finally {
      // Выключаем индикатор загрузки
      index.loader = false;
  }
};

/**
 * Обновляет счетчик просмотров статьи на сервере
 * @param {string} documentId - Идентификатор документа
 */
const updateViews = async (documentId) => {
  if (!documentId) return;
  
  try {
      // Отправляем запрос на обновление счетчика просмотров
      await $fetch(`https://static.dublecode.ru/api/posts/${documentId}`, {
          method: 'PUT',
          body: {
              data: {
                  views: (post.value.views || 0) + 1,
              },
          },
      });
  } catch (error) {
      console.error('Ошибка при обновлении просмотров:', error);
  }
};

/**
 * Рассчитывает примерное время чтения статьи
 * @param {string} text - Текст статьи
 * @param {number} wordsPerMinute - Средняя скорость чтения (слов в минуту)
 * @returns {string} - Время чтения с правильным окончанием
 */
function calculateReadingTime(text, wordsPerMinute = 200) {
  if (!text) return '0 минут';
  const words = text.trim().split(/\s+/).length;
  const readingTime = Math.ceil(words / wordsPerMinute);
  if (readingTime === 1) {
      return `${readingTime} минута`;
  } else if (readingTime > 1 && readingTime < 5) {
      return `${readingTime} минуты`;
  } else {
      return `${readingTime} минут`;
  }
}

// Загружаем данные при монтировании компонента
onMounted(() => fetch());

/**
 * Копирует текст в буфер обмена
 * @param {string} text - Текст для копирования
 * @param {Event} event - Событие клика
 */
const copyToClipboard = async (text, event) => {
    if (!navigator.clipboard || typeof navigator.clipboard.writeText !== 'function') {
        console.error('Clipboard API не поддерживается в текущей среде');
        return;
    }

    try {
        await navigator.clipboard.writeText(text);
        showCopiedNotification(event);
    } catch (error) {
        console.error('Не удалось скопировать текст:', error);
    }
};

/**
 * Показывает уведомление "Скопировано" рядом с элементом
 * @param {Event} event - Событие клика
 */
const showCopiedNotification = (event) => {
  const notification = document.createElement('span');
  notification.textContent = 'Скопировано';
  notification.className =
      'absolute bg-cyan-500 text-white text-xs px-2 py-1 rounded-md shadow-md pointer-events-none';

  const rect = event.target.getBoundingClientRect();
  notification.style.top = `${rect.top + window.scrollY}px`;
  notification.style.left = `${rect.right + window.scrollX + 8}px`;

  document.body.appendChild(notification);

  setTimeout(() => {
      notification.remove();
  }, 1000);
};

/**
 * Обработчик кликов на уровне документа
 * Копирует содержимое тегов code и pre в буфер обмена
 * @param {Event} event - Событие клика
 */
const handleDocumentClick = (event) => {
  if (event.target.tagName === 'CODE' || event.target.tagName === 'PRE') {
      const codeText = event.target.textContent;
      copyToClipboard(codeText, event);
  }
};

// Создаем переменную для хранения наблюдателя
let observer;
// При монтировании компонента
onMounted(() => {
  // Добавляем обработчик кликов
  document.addEventListener('click', handleDocumentClick);

  // Создаем наблюдатель за изменениями в DOM
  observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
              if (node.nodeType === Node.ELEMENT_NODE && (node.querySelector('code') || node.querySelector('pre'))) {
                  console.log('Новый тег <code> или <pre> обнаружен');
              }
          });
      });
  });

  // Начинаем наблюдение за изменениями в содержимом статьи
  if (body.value) {
      observer.observe(body.value, {
          childList: true,
          subtree: true,
      });
  }
});

// При размонтировании компонента
onUnmounted(() => {
  // Удаляем обработчик кликов
  document.removeEventListener('click', handleDocumentClick);
  // Отключаем наблюдатель
  if (observer) {
      observer.disconnect();
  }
});
</script>