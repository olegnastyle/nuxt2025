<template>
  <AppLoader v-if="loader.loader" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
const loader = useIndexStore();

useHead({
  bodyAttrs: {
    class: 'bg-white dark:bg-gray-900'
  },
})
</script>