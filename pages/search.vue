<template>
    <h1 class="my-4 text-2xl text-cyan-700 darl:blue-500 font-medium">
        Поиск <q>{{ index.search }}</q>
    </h1>
    <!-- все посты по запросу -->
    <div v-if="posts.length > 0" class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <UiArticle v-for="post in posts" :key="post.id" :post="post" />
    </div>
    <div v-else class="text-xl ">
        Совпадений не найденно...
    </div>
</template>

<script setup>
const index = useIndexStore();
const posts = ref([])

const fetch = async (search) => {
    try {
        const res = await $fetch(`https://static.dublecode.ru/api/posts?filters[$or][0][title][$containsi]=${search}&filters[$or][1][body][$containsi]=${search}&populate=*`)

        return posts.value = res.data
    } catch (error) {
        console.log(error);
    }
}

watch( () => index.search, (search) =>{
    fetch(search)

    useHead({
        title: `${search} | PlusPixel`,
    })
});

// получаем мета данные
const seo = ref({})
const fetchSeo = async () => {
  try {
    index.loader = true;
    const res = await $fetch(`https://static.dublecode.ru/api/seatrch?populate=*`);

    if (res.data.seo) {
       seo.value = res.data.seo;
    }

    useHead({
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
    fetchSeo()
    fetch()
})
</script>