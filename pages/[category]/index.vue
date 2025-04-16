<template>
    <div>
        <h1 class="my-4 text-2xl text-cyan-700 darl:blue-500 font-medium">{{ categoryName }}</h1>
        <div v-if="posts.length > 0" class="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <UiArticle v-for="post in posts" :key="post.id" :post="post" />
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