<template>
    <h1 class="my-4 text-2xl text-cyan-700 darl:blue-500 font-medium">Блог</h1>
    <div class="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <UiArticle />
    </div>
</template>

<script setup>
const posts = ref([])
const index = useIndexStore();

const fetch = async () => {
    try {
        // включаем loader
        index.loader = true;

        const res = await $fetch('https://static.dublecode.ru/api/posts?populate=*')

        return posts.value = res.data
    } catch (error) {
        console.log(error);
    } finally {
        // выключаем loader
        index.loader = false;
    }
}


// получаем мета данные
const seo = ref({});
const fetchSeo = async () => {
  try {
    index.loader = true;
    const res = await $fetch(`https://static.dublecode.ru/api/blog?populate=*`);
    if (res.data.seo) {
      seo.value = res.data.seo;
    }
  } catch (error) {
    console.log(error);
  } finally {
    index.loader = false;
  }
};

useSeoMeta({
  title: () => seo.value.metaTitle,
  description: () => seo.value.metaDescription,
  ogTitle: () => seo.value.metaTitle,
  ogDescription: () => seo.value.metaDescription,
  ogImage: () => seo.value
})

// watch( () => {

// })

onMounted(() => {
    fetchSeo()
    fetch()
})
</script>