<template>
    <div>
        <h1 class="my-4 text-2xl text-cyan-700 darl:blue-500 font-medium">{{ categoryName }}</h1>
        <div v-if="posts.length > 0" class="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <article v-for="post in posts" :key="post.id" class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                <NuxtLink :to="`/${post.categories[0]?.slug}/${post.slug}`">
                    <img class="rounded-t-lg h-44 w-full object-cover" :src="'https://static.dublecode.ru'+post.cover.url" :alt="post.cover.alternativeText" :title="post.cover.caption" />
                </NuxtLink>
                <div class="inline-flex flex-col gap-3.5 p-5">
                    <NuxtLink :to="`/${post.categories[0]?.slug}/${post.slug}`">
                        <h5 class="min-h-20 md:min-h-24 text-lg md:text-2xl font-bold tracking-tight text-gray-900
                            line-clamp-3 overflow-hidden text-ellipsis whitespace-normal
                            dark:text-white">{{ post.title }}</h5>
                    </NuxtLink>
                    <NuxtLink :to="`/${post.categories[0]?.slug}/${post.slug}`" class="inline-flex items-center px-3 py-2 w-max text-sm font-medium text-center text-white bg-[brown]/80 rounded-lg hover:bg-[brown] focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800">
                        Подробнее
                        <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </NuxtLink>
                </div>
            </article>
        </div>
        <div v-else class="text-center py-8">
            <p class="text-lg text-gray-600 dark:text-gray-400">В данной категории статей пока нет</p>
        </div>
    </div>
</template>

<script setup>
const { category } = useRoute().params;
const index = useIndexStore();
const posts = ref([]);
const categoryName = ref('');

const fetchPosts = async () => {
    try {
        index.loader = true;

        // Получаем все категории с подкатегориями
        const categoryRes = await $fetch(`https://static.dublecode.ru/api/categories?populate=subcategories`);
        
        // Ищем категорию или подкатегорию по slug
        let foundCategory = null;
        let foundSubcategory = null;
        let parentCategory = null;
        
        if (categoryRes.data && categoryRes.data.length > 0) {
            // Сначала ищем в основных категориях
            foundCategory = categoryRes.data.find(cat => cat.slug === category);
            
            // Если не нашли, ищем в подкатегориях
            if (!foundCategory) {
                for (const cat of categoryRes.data) {
                    if (cat.subcategories && cat.subcategories.length > 0) {
                        foundSubcategory = cat.subcategories.find(sub => sub.slug === category);
                        if (foundSubcategory) {
                            // Сохраняем родительскую категорию отдельно
                            parentCategory = cat;
                            break;
                        }
                    }
                }
            }
        }
        
        // Устанавливаем название категории
        if (foundCategory) {
            categoryName.value = foundCategory.name;
        } else if (foundSubcategory) {
            categoryName.value = foundSubcategory.name;
        } else {
            categoryName.value = category;
        }
        
        // Получаем статьи категории или подкатегории
        let res;
        if (foundCategory) {
            // Если нашли категорию, получаем посты категории
            res = await $fetch(`https://static.dublecode.ru/api/posts?populate=*&filters[categories][slug][$eqi]=${category}`);
        } else if (foundSubcategory) {
            // Если нашли подкатегорию, получаем посты подкатегории
            res = await $fetch(`https://static.dublecode.ru/api/posts?populate=*&filters[subcategories][slug][$eqi]=${category}`);
        } else {
            // Если ничего не нашли, устанавливаем пустой массив постов
            posts.value = [];
            return;
        }
        
        if (res.data) {
            posts.value = res.data;
        }
    } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
    } finally {
        index.loader = false;
    }
}

onMounted(() => fetchPosts())
</script>