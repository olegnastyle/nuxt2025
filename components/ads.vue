<template>
    <div v-if="view" class="relative w-full">
        <button @click="view = false" class="absolute top-4 right-4 lg:top-8 lg:right-8 z-50 cursor-pointer">
            <svg class="size-4 lg:size-8 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10.5859 12L2.79297 4.20706L4.20718 2.79285L12.0001 10.5857L19.793 2.79285L21.2072 4.20706L13.4143 12L21.2072 19.7928L19.793 21.2071L12.0001 13.4142L4.20718 21.2071L2.79297 19.7928L10.5859 12Z"></path></svg>
        </button>
        <NuxtLink to="https://craftum.com/?id=629285&ref=pluspixel" target="_blank">
            <img src="~/public/banner-craftum-dark-lg.png" alt="Craftum" class="object-cover h-24 lg:h-auto w-full">
        </NuxtLink>
    </div>
</template>

<script setup>
const view = ref(true);

onMounted(() => {
    setInterval(() => {
        view.value = !view.value
    }, 150000) // 2,5 минуты в миллисекундах
});
</script>