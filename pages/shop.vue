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
                <div class="inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle container dark:bg-gray-800">
                    <div class="bg-white dark:bg-gray-800">
                        <div class="pt-6">
                            <!-- Хлебные крошки -->
                            <nav aria-label="Breadcrumb">
                                <ol role="list" class="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                                    <li>
                                        <div class="flex items-center">
                                            <a href="/" class="mr-2 text-sm font-medium text-gray-900 dark:text-white">Главная</a>
                                            <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" aria-hidden="true" class="h-5 w-4 text-gray-300">
                                                <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                            </svg>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="flex items-center">
                                            <a href="/shop" class="mr-2 text-sm font-medium text-gray-900 dark:text-white">Магазин</a>
                                            <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" aria-hidden="true" class="h-5 w-4 text-gray-300">
                                                <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                            </svg>
                                        </div>
                                    </li>
                                    <li class="text-sm">
                                        <a href="#" aria-current="page" class="font-medium text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300">{{ selectedProduct.name }}</a>
                                    </li>
                                </ol>
                            </nav>

                            <!-- Галерея изображений -->
                            <div class="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
                                <img v-if="selectedProduct.cover" 
                                     :src="`https://static.dublecode.ru${selectedProduct.cover.formats.medium.url}`" 
                                     :alt="selectedProduct.name" 
                                     class="hidden size-full rounded-lg object-cover lg:block">
                                <div v-if="selectedProduct.images && selectedProduct.images.length > 0" class="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                                    <img v-for="(image, index) in selectedProduct.images.slice(0, 2)" 
                                         :key="index"
                                         :src="`https://static.dublecode.ru${image.formats.medium.url}`" 
                                         :alt="`${selectedProduct.name} - изображение ${index + 1}`" 
                                         class="aspect-3/2 w-full rounded-lg object-cover">
                                </div>
                                <img v-if="selectedProduct.cover" 
                                     :src="`https://static.dublecode.ru${selectedProduct.cover.formats.medium.url}`" 
                                     :alt="selectedProduct.name" 
                                     class="aspect-4/5 size-full object-cover sm:rounded-lg lg:aspect-auto">
                            </div>

                            <!-- Информация о товаре -->
                            <div class="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
                                <div class="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                                    <h1 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">{{ selectedProduct.name }}</h1>
                                </div>

                                <!-- Опции -->
                                <div class="mt-4 lg:row-span-3 lg:mt-0">
                                    <h2 class="sr-only">Информация о товаре</h2>
                                    <p class="text-3xl tracking-tight text-gray-900 dark:text-white">{{ selectedProduct.price }} ₽</p>

                                    <!-- Отзывы -->
                                    <div class="mt-6">
                                        <h3 class="sr-only">Отзывы</h3>
                                        <div class="flex items-center">
                                            <div class="flex items-center">
                                                <svg class="size-5 shrink-0 text-gray-900 dark:text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                                    <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" clip-rule="evenodd" />
                                                </svg>
                                                <svg class="size-5 shrink-0 text-gray-900 dark:text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                                    <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" clip-rule="evenodd" />
                                                </svg>
                                                <svg class="size-5 shrink-0 text-gray-900 dark:text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                                    <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" clip-rule="evenodd" />
                                                </svg>
                                                <svg class="size-5 shrink-0 text-gray-900 dark:text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                                    <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" clip-rule="evenodd" />
                                                </svg>
                                                <svg class="size-5 shrink-0 text-gray-200" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                                    <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" clip-rule="evenodd" />
                                                </svg>
                                            </div>
                                            <p class="sr-only">4 из 5 звезд</p>
                                            <a href="#" class="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">117 отзывов</a>
                                        </div>
                                    </div>

                                    <form class="mt-10">
                                        <!-- Цвета -->
                                        <div>
                                            <h3 class="text-sm font-medium text-gray-900 dark:text-white">Цвет</h3>

                                            <fieldset aria-label="Выберите цвет" class="mt-4">
                                                <div class="flex items-center gap-x-3">
                                                    <label aria-label="Белый" class="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 ring-gray-400 focus:outline-hidden">
                                                        <input type="radio" name="color-choice" value="White" class="sr-only">
                                                        <span aria-hidden="true" class="size-8 rounded-full border border-black/10 bg-white"></span>
                                                    </label>
                                                    <label aria-label="Серый" class="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 ring-gray-400 focus:outline-hidden">
                                                        <input type="radio" name="color-choice" value="Gray" class="sr-only">
                                                        <span aria-hidden="true" class="size-8 rounded-full border border-black/10 bg-gray-200"></span>
                                                    </label>
                                                    <label aria-label="Черный" class="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 ring-gray-900 focus:outline-hidden">
                                                        <input type="radio" name="color-choice" value="Black" class="sr-only">
                                                        <span aria-hidden="true" class="size-8 rounded-full border border-black/10 bg-gray-900"></span>
                                                    </label>
                                                </div>
                                            </fieldset>
                                        </div>

                                        <!-- Размеры -->
                                        <div class="mt-10">
                                            <div class="flex items-center justify-between">
                                                <h3 class="text-sm font-medium text-gray-900 dark:text-white">Размер</h3>
                                                <a href="#" class="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">Таблица размеров</a>
                                            </div>

                                            <fieldset aria-label="Выберите размер" class="mt-4">
                                                <div class="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                                                    <label class="group relative flex cursor-pointer items-center justify-center rounded-md border bg-white px-4 py-3 text-sm font-medium text-gray-900 uppercase shadow-xs hover:bg-gray-50 focus:outline-hidden sm:flex-1 sm:py-6 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700">
                                                        <input type="radio" name="size-choice" value="S" class="sr-only">
                                                        <span>S</span>
                                                        <span class="pointer-events-none absolute -inset-px rounded-md" aria-hidden="true"></span>
                                                    </label>
                                                    <label class="group relative flex cursor-pointer items-center justify-center rounded-md border bg-white px-4 py-3 text-sm font-medium text-gray-900 uppercase shadow-xs hover:bg-gray-50 focus:outline-hidden sm:flex-1 sm:py-6 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700">
                                                        <input type="radio" name="size-choice" value="M" class="sr-only">
                                                        <span>M</span>
                                                        <span class="pointer-events-none absolute -inset-px rounded-md" aria-hidden="true"></span>
                                                    </label>
                                                    <label class="group relative flex cursor-pointer items-center justify-center rounded-md border bg-white px-4 py-3 text-sm font-medium text-gray-900 uppercase shadow-xs hover:bg-gray-50 focus:outline-hidden sm:flex-1 sm:py-6 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700">
                                                        <input type="radio" name="size-choice" value="L" class="sr-only">
                                                        <span>L</span>
                                                        <span class="pointer-events-none absolute -inset-px rounded-md" aria-hidden="true"></span>
                                                    </label>
                                                    <label class="group relative flex cursor-pointer items-center justify-center rounded-md border bg-white px-4 py-3 text-sm font-medium text-gray-900 uppercase shadow-xs hover:bg-gray-50 focus:outline-hidden sm:flex-1 sm:py-6 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700">
                                                        <input type="radio" name="size-choice" value="XL" class="sr-only">
                                                        <span>XL</span>
                                                        <span class="pointer-events-none absolute -inset-px rounded-md" aria-hidden="true"></span>
                                                    </label>
                                                </div>
                                            </fieldset>
                                        </div>

                                        <button type="submit" class="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-[brown]/80 px-8 py-3 text-base font-medium text-white hover:bg-[brown] focus:ring-2 focus:ring-[brown] focus:ring-offset-2 focus:outline-hidden">Добавить в корзину</button>
                                    </form>
                                </div>

                                <div class="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pr-8 lg:pb-16 dark:border-gray-700">
                                    <!-- Описание и детали -->
                                    <div>
                                        <h3 class="sr-only">Описание</h3>

                                        <div class="space-y-6">
                                            <div class="prose dark:prose-invert max-w-none">
                                                <div v-html="descriptionHtml" class="text-base text-gray-900 dark:text-white"></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="mt-10">
                                        <h3 class="text-sm font-medium text-gray-900 dark:text-white">Особенности</h3>

                                        <div class="mt-4">
                                            <ul role="list" class="list-disc space-y-2 pl-4 text-sm">
                                                <li class="text-gray-400"><span class="text-gray-600 dark:text-gray-300">Высокое качество материалов</span></li>
                                                <li class="text-gray-400"><span class="text-gray-600 dark:text-gray-300">Долговечность и надежность</span></li>
                                                <li class="text-gray-400"><span class="text-gray-600 dark:text-gray-300">Современный дизайн</span></li>
                                                <li class="text-gray-400"><span class="text-gray-600 dark:text-gray-300">Удобство в использовании</span></li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div class="mt-10">
                                        <h2 class="text-sm font-medium text-gray-900 dark:text-white">Детали</h2>

                                        <div class="mt-4 space-y-6">
                                            <p class="text-sm text-gray-600 dark:text-gray-300">Товар поставляется с полной гарантией качества. При возникновении вопросов, пожалуйста, свяжитесь с нашей службой поддержки.</p>
                                        </div>
                                    </div>
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