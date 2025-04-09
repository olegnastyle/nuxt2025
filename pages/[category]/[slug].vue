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

const route = useRoute()
const { category, slug } = route.params
const post = ref({});
const index = useIndexStore();

console.log('Route params:', route.params);
console.log('Category:', category);
console.log('Slug:', slug);
console.log('Full route path:', route.path);

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
      
      // Проверяем, что у нас есть slug и category
      if (!slug || !category) {
          console.error('Slug or category is undefined');
          return;
      }
      
      console.log('Fetching post with slug:', slug, 'and category:', category);
      const res = await $fetch(`https://static.dublecode.ru/api/posts?filters[slug][$eqi]=${slug}&filters[categories][slug][$eqi]=${category}&populate=*`);
      console.log('API response:', res);
      
      post.value = res.data[0];
      if (post.value) {
          console.log('Post found:', post.value);
          updateViews(post.value.documentId);
          seo.value = res.data[0].seo;
          useSeoMeta({
              title: `${seo.value.metaTitle} | PlusPixel`,
              description: seo.value.metaDescription,
              ogTitle: seo.value.metaTitle,
              ogDescription: seo.value.metaDescription,
          });
      } else {
          console.error('Post not found for slug:', slug, 'and category:', category);
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
          views: (post.value.views || 0) + 1
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => fetch());
</script> 