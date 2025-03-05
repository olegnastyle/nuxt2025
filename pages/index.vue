<template>
  <h1 class="my-4 text-2xl text-blue-700 dark:blue-500 font-medium">Главная страница</h1>
</template>

<script setup>
const index = useIndexStore();

const seo = ref({});
const fetchSeo = async () => {
  try {
    index.loader = true;

    const res = await $fetch(`http://localhost:1337/api/global?populate=*`);
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

onMounted(() => fetchSeo());
</script>