<template>
  <!-- первый блок -->
  <section v-if="block1" class="flex flex-col lg:flex-row items-center gap-12 md:gap-24">
    
    <!-- левая сторона -->
    <div class="flex flex-col gap-4 text-black dark:text-white">
      <h1 class="text-4xl md:text-5xl font-medium uppercase">Самый <span class="text-blue-700 text-5xl md:text-6xl font-bold ">космические</span> практики для разработчиков</h1>
      <p class="text-lg md:text-2xl">Вдохновляйтесь передовыми техниками и решениями от профессионалов индустрии, чтобы создавать код, который впечатляет и работает как часы!</p>
    </div>

    <!-- правая сторона -->
    <div class="grid grid-cols-2 grid-rows-2 items-center gap-8">
      <article v-for="(post, index) in posts" :key="post.id" :class="index === 0 ? 'row-span-2 *:*:h-60 md:*:*:h-80 *:*:w-3xs' : ''"
        class="hover:scale-105 transition-transform">
        <NuxtLink :to="`/${post.category?.slug}/${post.slug}`">
          <img class="object-cover rounded-3xl" :src="'https://908bd2082661.vps.myjino.ru'+post.cover.url" :alt="post.cover.alternativeText">
        </NuxtLink>
      </article>
    </div>
  </section>

  <!-- второй блок -->
  <section v-if="block2" class="text-black dark:text-white">
    <h2 class="my-1.5 text-3xl font-medium uppercase">Популярные статьи</h2>
    <nav class="my-3">
      <ul class="flex gap-4">
        <li v-for="item in 10">
          <NuxtLink to="/">Дома и быт</NuxtLink>
        </li>
      </ul>
    </nav>
    <!-- список популярные статей -->
    <div class="flex justify-between">
      <article v-for="item in 4">
        <NuxtLink to="/">
          <img class="w-60 h-80 object-cover rounded-xl" src="https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&h=1000&q=80" alt="">
        </NuxtLink>
        <NuxtLink to="/">
          <h3>Название статьи</h3>
        </NuxtLink>
        <NuxtLink to="/">Название категории</NuxtLink>
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

        const res = await $fetch('https://908bd2082661.vps.myjino.ru/api/posts?populate=*')

        return posts.value = res.data
    } catch (error) {
        console.log(error);
    } finally {
        // выключаем loader
        index.loader = false;
    }
}
const block1 = ref('')
const block2 = ref('')
const seo = ref({})
const fetchSeo = async () => {
  try {
    index.loader = true;
    const res = await $fetch(`https://908bd2082661.vps.myjino.ru/api/global?populate=*`);

    if (res.data.seo) {
       seo.value = res.data.seo;
    }

    block1.value = res.data.block1
    block2.value = res.data.block2

    useHead({
        title: `${seo.value.metaTitle} | PlusPixel`,
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