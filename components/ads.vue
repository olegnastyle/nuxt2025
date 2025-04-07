<template>
    <div v-if="view" class="relative w-full">
        <button @click="view = false" class="absolute -bottom-4 top-auto right-4 md:bottom-auto md:top-8 md:right-8 z-50 cursor-pointer">
            <svg class="size-8 p-1 md:p-0 text-white bg-cyan-500/50 md:bg-cyan-500/0 rounded-lg shadow-2xl" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10.5859 12L2.79297 4.20706L4.20718 2.79285L12.0001 10.5857L19.793 2.79285L21.2072 4.20706L13.4143 12L21.2072 19.7928L19.793 21.2071L12.0001 13.4142L4.20718 21.2071L2.79297 19.7928L10.5859 12Z"></path></svg>
        </button>
        <NuxtLink to="https://craftum.com/?id=629285&ref=pluspixel" target="_blank">
            <img src="~/public/banner-craftum-dark-lg.png" alt="Craftum" class="object-cover h-24 md:h-auto w-full">
        </NuxtLink>
    </div>
</template>

<script setup>
const view = ref(false);

// onMounted(() => {
//     setInterval(() => {
//         view.value = !view.value
//     }, 150000) // 2,5 минуты в миллисекундах
// });
</script>