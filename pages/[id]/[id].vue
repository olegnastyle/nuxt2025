<template>
  <div class="max-w-3xl mx-auto text-black dark:text-white">
      <h1 class="text-4xl font-medium my-2">{{ post.title }}</h1>
      <p v-if="post" class="opacity-50 my-1.5">
          <span>{{ post.body ? calculateReadingTime(post.body) : 0 }}</span> •
          <span v-html="post.views || 0"></span>
          прочитано • {{ convertDatetime(post.publishedAt) }}</p>
      <div class="markdown my-1.5" v-html="body" ref="markdownContainer"></div>
  </div>
</template>

<script setup>
function convertDatetime(isoDatetime) {
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

const { id } = useRoute().params;
const post = ref({});
const index = useIndexStore();

import markdownit from 'markdown-it';
const md = markdownit();
const body = ref();

watch(post, (newPost) => {
  body.value = md.render(newPost.body);
});

const seo = ref({});

const fetch = async () => {
  try {
      index.loader = true;
      const res = await $fetch(`https://static.dublecode.ru/api/posts?filters[slug][$eqi]=${id}&populate=*`);
      post.value = res.data[0];
      if (post.value) {
          updateViews(post.value.documentId);
          seo.value = res.data[0].seo;
          useSeoMeta({
              title: `${seo.value.metaTitle} | PlusPixel`,
              description: seo.value.metaDescription,
              ogTitle: seo.value.metaTitle,
              ogDescription: seo.value.metaDescription,
          });
      }
  } catch (error) {
      console.log(error);
  } finally {
      index.loader = false;
  }
};

const updateViews = async (documentId) => {
  try {
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

function calculateReadingTime(text, wordsPerMinute = 200) {
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

onMounted(() => fetch());

// Функция для копирования текста в буфер обмена
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

// Функция для показа уведомления "Скопировано"
const showCopiedNotification = (event) => {
  const notification = document.createElement('span');
  notification.textContent = 'Скопировано';
  notification.className =
      'absolute bg-blue-500 text-white text-xs px-2 py-1 rounded-md shadow-md pointer-events-none';

  const rect = event.target.getBoundingClientRect();
  notification.style.top = `${rect.top + window.scrollY}px`;
  notification.style.left = `${rect.right + window.scrollX + 8}px`;

  document.body.appendChild(notification);

  setTimeout(() => {
      notification.remove();
  }, 1000);
};

// Обработчик кликов на уровне документа
const handleDocumentClick = (event) => {
  if (event.target.tagName === 'CODE' || event.target.tagName === 'PRE') {
      const codeText = event.target.textContent;
      copyToClipboard(codeText, event);
  }
};

// Отслеживание изменений DOM с помощью MutationObserver
let observer;
onMounted(() => {
  document.addEventListener('click', handleDocumentClick);

  observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
              if (node.nodeType === Node.ELEMENT_NODE && (node.querySelector('code') || node.querySelector('pre'))) {
                  console.log('Новый тег <code> или <pre> обнаружен');
              }
          });
      });
  });

  if (body.value) {
      observer.observe(body.value, {
          childList: true,
          subtree: true,
      });
  }
});

onUnmounted(() => {
  document.removeEventListener('click', handleDocumentClick);
  if (observer) {
      observer.disconnect();
  }
});
</script>