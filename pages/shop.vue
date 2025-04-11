<template>
    <div>
        <h1 class="my-4 text-2xl text-cyan-700 darl:blue-500 font-medium">Магазин</h1>
        <div v-if="products.length > 0" class="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <article v-for="product in products" :key="product.id" class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                <div class="relative">
                    <img class="rounded-t-lg h-44 w-full object-cover" :src="'https://aquaelle.ru/_sh/22/2285.jpg'" :alt="product.attributes?.title" />
                    <div class="absolute top-2 right-2 bg-[brown]/80 text-white px-2 py-1 rounded text-sm">
                        {{ product.attributes?.price }} ₽
                    </div>
                </div>
                <div class="p-5">
                    <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {{ product.attributes?.title }}
                    </h5>
                    <p class="mb-3 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                        {{ product.attributes?.description }}
                    </p>
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
                <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full dark:bg-gray-800">
                    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 dark:bg-gray-800">
                        <div class="sm:flex sm:items-start">
                            <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
                                <div class="relative">
                                    <img :src="'https://aquaelle.ru/_sh/22/2285.jpg'" :alt="selectedProduct.attributes?.title" class="w-full h-64 object-cover rounded-lg mb-4">
                                    <div class="absolute top-2 right-2 bg-[brown]/80 text-white px-3 py-1 rounded text-lg">
                                        {{ selectedProduct.attributes?.price }} ₽
                                    </div>
                                </div>
                                <h3 class="text-2xl leading-6 font-medium text-gray-900 dark:text-white mb-2">
                                    {{ selectedProduct.attributes?.title }}
                                </h3>
                                <div class="mt-2">
                                    <p class="text-sm text-gray-500 dark:text-gray-400">
                                        {{ selectedProduct.attributes?.description }}
                                    </p>
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
const index = useIndexStore();
const products = ref([]);
const isModalOpen = ref(false);
const selectedProduct = ref(null);

const fetchProducts = async () => {
    try {
        index.loader = true;
        // Демо данные
        products.value = [
            {
                id: 1,
                attributes: {
                    title: 'Ноутбук MacBook Pro 16"',
                    description: 'Мощный ноутбук для профессионалов с процессором M2 Pro, 16 ГБ памяти и 512 ГБ SSD',
                    price: '199 990',
                    cover: {
                        data: {
                            attributes: {
                                url: 'https://aquaelle.ru/_sh/22/2285.jpg'
                            }
                        }
                    }
                }
            },
            {
                id: 2,
                attributes: {
                    title: 'iPhone 15 Pro Max',
                    description: 'Смартфон с камерой 48 МП, процессором A17 Pro и титановым корпусом',
                    price: '149 990',
                    cover: {
                        data: {
                            attributes: {
                                url: 'https://aquaelle.ru/_sh/22/2285.jpg'
                            }
                        }
                    }
                }
            },
            {
                id: 3,
                attributes: {
                    title: 'iPad Pro 12.9"',
                    description: 'Планшет с дисплеем Liquid Retina XDR, процессором M2 и поддержкой Apple Pencil',
                    price: '129 990',
                    cover: {
                        data: {
                            attributes: {
                                url: 'https://aquaelle.ru/_sh/22/2285.jpg'
                            }
                        }
                    }
                }
            },
            {
                id: 4,
                attributes: {
                    title: 'AirPods Pro 2',
                    description: 'Наушники с активным шумоподавлением и пространственным звуком',
                    price: '24 990',
                    cover: {
                        data: {
                            attributes: {
                                url: 'https://aquaelle.ru/_sh/22/2285.jpg'
                            }
                        }
                    }
                }
            },
            {
                id: 5,
                attributes: {
                    title: 'Apple Watch Series 9',
                    description: 'Умные часы с Always-On дисплеем и датчиком ЭКГ',
                    price: '39 990',
                    cover: {
                        data: {
                            attributes: {
                                url: 'https://aquaelle.ru/_sh/22/2285.jpg'
                            }
                        }
                    }
                }
            },
            {
                id: 6,
                attributes: {
                    title: 'Mac Studio',
                    description: 'Профессиональный компьютер с процессором M2 Max и 32 ГБ памяти',
                    price: '249 990',
                    cover: {
                        data: {
                            attributes: {
                                url: 'https://aquaelle.ru/_sh/22/2285.jpg'
                            }
                        }
                    }
                }
            },
            {
                id: 7,
                attributes: {
                    title: 'Magic Keyboard',
                    description: 'Беспроводная клавиатура с подсветкой и Touch ID',
                    price: '12 990',
                    cover: {
                        data: {
                            attributes: {
                                url: 'https://aquaelle.ru/_sh/22/2285.jpg'
                            }
                        }
                    }
                }
            },
            {
                id: 8,
                attributes: {
                    title: 'Magic Mouse',
                    description: 'Беспроводная мышь с Multi-Touch поверхностью',
                    price: '8 990',
                    cover: {
                        data: {
                            attributes: {
                                url: 'https://aquaelle.ru/_sh/22/2285.jpg'
                            }
                        }
                    }
                }
            },
            {
                id: 9,
                attributes: {
                    title: 'AirTag',
                    description: 'Трекер для поиска потерянных вещей с точностью до сантиметра',
                    price: '3 990',
                    cover: {
                        data: {
                            attributes: {
                                url: 'https://aquaelle.ru/_sh/22/2285.jpg'
                            }
                        }
                    }
                }
            },
            {
                id: 10,
                attributes: {
                    title: 'HomePod mini',
                    description: 'Умная колонка с пространственным звуком и Siri',
                    price: '9 990',
                    cover: {
                        data: {
                            attributes: {
                                url: 'https://aquaelle.ru/_sh/22/2285.jpg'
                            }
                        }
                    }
                }
            },
            {
                id: 11,
                attributes: {
                    title: 'Apple TV 4K',
                    description: 'Медиаплеер с поддержкой 4K и Dolby Atmos',
                    price: '19 990',
                    cover: {
                        data: {
                            attributes: {
                                url: 'https://aquaelle.ru/_sh/22/2285.jpg'
                            }
                        }
                    }
                }
            },
            {
                id: 12,
                attributes: {
                    title: 'Magic Trackpad',
                    description: 'Беспроводной трекпад с Multi-Touch жестами',
                    price: '10 990',
                    cover: {
                        data: {
                            attributes: {
                                url: 'https://aquaelle.ru/_sh/22/2285.jpg'
                            }
                        }
                    }
                }
            }
        ];
        // const res = await $fetch('https://static.dublecode.ru/api/products?populate=*');
        // if (res.data) {
        //     products.value = res.data;
        // }
    } catch (error) {
        console.error('Ошибка при загрузке товаров:', error);
    } finally {
        index.loader = false;
    }
}

const selectProduct = (product) => {
    selectedProduct.value = product;
    isModalOpen.value = true;
}

const closeModal = () => {
    isModalOpen.value = false;
    selectedProduct.value = null;
}

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