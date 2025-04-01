<template>
    <h1 class="my-4 text-2xl text-cyan-700 darl:blue-500 font-medium">{{ id }}</h1>
    <div class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <article v-for="post in posts" :key="post.id" class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <NuxtLink :to="`/${post.category?.slug}/${post.slug}`">
                <img class="rounded-t-lg" :src="'https://static.dublecode.ru'+post.cover.url" alt="" />
            </NuxtLink>
            <div class="p-5">
                <NuxtLink :to="`/${post.category?.slug}/${post.slug}`">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ post.title }}</h5>
                </NuxtLink>
                <NuxtLink :to="`/${post.category?.slug}/${post.slug}`" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[brown]/80 rounded-lg hover:bg-[brown] focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800">
                    Подробнее
                    <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                </NuxtLink>
            </div>
        </article>
    </div>
</template>

<script setup>
const posts = ref([])
const index = useIndexStore();

const { id } = useRoute().params;

const fetch = async () => {
    try {
        // включаем loader
        index.loader = true;
        const res = await $fetch(`https://static.dublecode.ru/api/posts?populate=*&filters[categories][slug][$eqi]=${id}`)
        return posts.value = res.data   
    } catch (error) {
        console.log(error);
    } finally {
        // выключаем loader
        index.loader = false;
    }
}

onMounted(() => fetch())
</script>