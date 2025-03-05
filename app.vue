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

// if (import.meta.server) {
//   // These meta tags will only be added during server-side rendering
//   useSeoMeta({
//     title: 'fefe',
//     robots: 'index, follow',
//     description: 'Static description that does not need reactivity',
//     ogImage: 'https://example.com/image.png',
//     // other static meta tags...
//   })
// }
</script>