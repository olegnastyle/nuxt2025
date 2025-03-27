<template>
    <div v-if="view" class="w-full">
        <NuxtLink to="https://craftum.com/?id=629285&ref=pluspixel">
            <img src="~/public/banner-craftum-dark-lg.png" alt="Craftum">
        </NuxtLink>
    </div>
</template>

<script setup>
const view = ref(true)

onMounted(() => {
    setInterval(() => {
        view.value = !view.value
    }, 150000) // 2,5 минуты в миллисекундах
})
</script>