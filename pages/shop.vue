<template>
    <div>
        <h1 class="my-4 text-2xl text-cyan-700 darl:blue-500 font-medium">Магазин</h1>
        <div v-if="products.length > 0" class="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <article v-for="product in products" :key="product.id" class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                <div class="relative">
                    <img class="rounded-t-lg h-44 w-full object-cover" 
                         :src="product.cover?.formats?.medium?.url ? `https://static.dublecode.ru${product.cover.formats.medium.url}` : 'https://aquaelle.ru/_sh/22/2285.jpg'" 
                         :alt="product.name" />
                    <div class="absolute top-2 right-2 bg-[brown]/80 text-white px-2 py-1 rounded text-sm">
                        {{ product.price }} ₽
                    </div>
                </div>
                <div class="p-5">
                    <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {{ product.name }}
                    </h5>
                    <button @click="selectProduct(product)" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[brown]/80 rounded-lg hover:bg-[brown] focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800">
                        Подробнее
                        <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </button>
                </div>
            </article>
        </div>
        <div v-else class="text-center py-8">
            <p class="text-lg text-gray-600 dark:text-gray-400">Товаров пока нет</p>
        </div>

        <!-- Модальное окно -->
        <div v-if="isModalOpen && selectedProduct" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div class="inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-2xl dark:bg-gray-800">
                    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 dark:bg-gray-800">
                        <div class="sm:flex sm:items-start">
                            <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
                                <!-- Слайдер изображений -->
                                <div class="relative mb-4">
                                    <swiper-container ref="containerRef" class="w-full h-64">
                                        <swiper-slide v-for="(image, index) in [selectedProduct.cover, ...selectedProduct.images]" :key="index"
                                            class="w-full h-full flex justify-center items-center"
                                        >
                                            <img :src="`https://static.dublecode.ru${image.formats.medium.url}`" 
                                                 :alt="selectedProduct.name" 
                                                 class="w-full h-full object-cover rounded-lg">
                                        </swiper-slide>
                                    </swiper-container>
                                    <div class="absolute top-2 right-2 bg-[brown]/80 text-white px-3 py-1 rounded text-lg">
                                        {{ selectedProduct.price }} ₽
                                    </div>
                                </div>
                                <h3 class="text-2xl leading-6 font-medium text-gray-900 dark:text-white mb-2">
                                    {{ selectedProduct.name }}
                                </h3>
                                <div class="mt-2 prose dark:prose-invert max-w-none">
                                    <div v-html="descriptionHtml" class="text-sm text-gray-500 dark:text-gray-400"></div>
                                </div>
                                <div class="mt-4">
                                    <button type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[brown]/80 text-base font-medium text-white hover:bg-[brown] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 sm:text-sm">
                                        Купить
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse dark:bg-gray-700">
                        <button type="button" @click="closeModal" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm dark:bg-gray-600 dark:text-white dark:border-gray-500 dark:hover:bg-gray-500">
                            Закрыть
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useSwiper } from '#imports'
import markdownit from 'markdown-it';
const md = markdownit();

const index = useIndexStore();
const products = ref([]);
const isModalOpen = ref(false);
const selectedProduct = ref(null);
const containerRef = ref(null);
const swiper = ref(null);
const descriptionHtml = ref('');

onMounted(() => {
    swiper.value = useSwiper(containerRef, {
        loop: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        pagination: false,
        navigation: false,
    })
})

onBeforeUnmount(() => {
    if (swiper.value?.destroy) {
        swiper.value.destroy()
    }
})

const fetchProducts = async () => {
    try {
        index.loader = true;
        const res = await $fetch('https://static.dublecode.ru/api/shops?populate=*');
        if (res.data) {
            products.value = res.data;
        }
    } catch (error) {
        console.error('Ошибка при загрузке товаров:', error);
    } finally {
        index.loader = false;
    }
}

const selectProduct = (product) => {
    selectedProduct.value = product;
    descriptionHtml.value = md.render(product.description);
    isModalOpen.value = true;
}

const closeModal = () => {
    isModalOpen.value = false;
    selectedProduct.value = null;
    descriptionHtml.value = '';
}

// Обработчик клавиши Esc
const handleEscKey = (event) => {
    if (event.key === 'Escape' && isModalOpen.value) {
        closeModal();
    }
}

// Добавляем и удаляем обработчик клавиши Esc
onMounted(() => {
    window.addEventListener('keydown', handleEscKey);
})

onUnmounted(() => {
    window.removeEventListener('keydown', handleEscKey);
})

// SEO
const seo = ref({
    title: 'Магазин',
    description: 'Магазин товаров',
    keywords: 'магазин, товары, покупки',
    ogTitle: 'Магазин',
    ogDescription: 'Магазин товаров',
    ogImage: 'https://static.dublecode.ru/uploads/shop_og_image.jpg',
    twitterTitle: 'Магазин',
    twitterDescription: 'Магазин товаров',
    twitterImage: 'https://static.dublecode.ru/uploads/shop_twitter_image.jpg'
});

useHead({
    title: seo.value.title,
    meta: [
        { name: 'description', content: seo.value.description },
        { name: 'keywords', content: seo.value.keywords },
        { property: 'og:title', content: seo.value.ogTitle },
        { property: 'og:description', content: seo.value.ogDescription },
        { property: 'og:image', content: seo.value.ogImage },
        { name: 'twitter:title', content: seo.value.twitterTitle },
        { name: 'twitter:description', content: seo.value.twitterDescription },
        { name: 'twitter:image', content: seo.value.twitterImage }
    ]
})

onMounted(() => fetchProducts())
</script>