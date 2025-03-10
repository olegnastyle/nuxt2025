<template>
  <!-- первый блок -->
  <section class="flex flex-col lg:flex-row items-center gap-24">
    <!-- левая сторона -->
    <div class="flex flex-col gap-4 text-black dark:text-white">
      <h1 class="text-6xl uppercase">Самый <span class="text-blue-700 text-7xl font-bold ">космические</span> рецепты от Шефа</h1>
      <p class="text-2xl">Вдохновляйтесь кулинарными шедеврами от профессионального шеф-повара и создавайте настоящие кулинарные произведения искусства на своей кухне!</p>
    </div>
    <!-- правая сторона -->
    <div class="grid grid-cols-2 grid-rows-2 items-center gap-8">
      <article v-for="(post, index) in posts" :key="post.id" :class="index === 0 ? 'row-span-2 *:*:h-80 *:*:w-3xs' : ''">
        <NuxtLink :to="`/${post.category?.slug}/${post.slug}`">
          <img class="object-cover rounded-3xl" :src="'http://localhost:1337'+post.cover.url" :alt="post.cover.alternativeText">
        </NuxtLink>
      </article>
    </div>
  </section>

</template>

<script setup>
const posts = ref([])
const index = useIndexStore();

const fetch = async () => {
    try {
        // включаем loader
        index.loader = true;

        const res = await $fetch('http://localhost:1337/api/posts?populate=*')

        return posts.value = res.data
    } catch (error) {
        console.log(error);
    } finally {
        // выключаем loader
        index.loader = false;
    }
}

const seo = ref({})
const fetchSeo = async () => {
  try {
    index.loader = true;
    const res = await $fetch(`http://localhost:1337/api/global?populate=*`);

    if (res.data.seo) {
       seo.value = res.data.seo;
    }

    useHead({
        title: `${seo.value.metaTitle} | Секреты Шефа`,
        meta: [
            { name: 'description', content: seo.value.metaDescription }
        ],
    })
    
  } catch (error) {
    console.log(error);
  } finally {
    index.loader = false;
  }
};

onMounted(() => {
  fetch()
  fetchSeo()
})
</script>