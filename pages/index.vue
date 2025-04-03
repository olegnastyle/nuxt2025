<template>
  <div class="flex flex-col">
    <!-- первый блок -->
    <section v-if="block1" class="flex flex-col lg:flex-row items-center gap-12 md:gap-24"
      :class="'order-3'">
      <!-- левая сторона -->
      <div class="flex flex-col gap-4 text-black dark:text-white">
        <h1 class="text-4xl md:text-5xl font-medium uppercase">Самый <span
            class="text-cyan-700 text-5xl md:text-6xl font-bold ">космические</span> практики для разработчиков</h1>
        <p class="text-lg md:text-2xl">Вдохновляйтесь передовыми техниками и решениями от профессионалов индустрии,
          чтобы создавать код, который впечатляет и работает как часы!</p>
      </div>

      <!-- правая сторона -->
      <div class="grid grid-cols-2 grid-rows-2 items-center gap-8">
        <article v-for="(post, index) in posts.slice(0, 3)" :key="post.id"
          :class="index === 0 ? 'row-span-2 *:*:h-60 md:*:*:h-80 *:*:w-3xs' : ''"
          class="hover:scale-105 transition-transform">
          <NuxtLink :to="`/${post.category?.slug}/${post.slug}`">
            <img class="object-cover rounded-3xl" :src="'https://static.dublecode.ru' + post.cover.url"
              :alt="post.cover.alternativeText">
          </NuxtLink>
        </article>
      </div>
    </section>

    <!-- второй блок -->
    <section v-if="block2" class="text-black dark:text-white" :class="'order-4'">
      <h2 class="my-1.5 text-3xl font-medium uppercase">Популярные статьи</h2>
      <nav class="my-3">
        <ul class="flex gap-4">
          <li v-for="item in 10">
            <NuxtLink to="/">Дома и быт</NuxtLink>
          </li>
        </ul>
      </nav>
      <!-- список популярные статей -->
      <div class="flex justify-between">
        <article v-for="item in 4">
          <NuxtLink to="/">
            <img class="w-60 h-80 object-cover rounded-xl"
              src="https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&h=1000&q=80"
              alt="">
          </NuxtLink>
          <NuxtLink to="/">
            <h3>Название статьи</h3>
          </NuxtLink>
          <NuxtLink to="/">Название категории</NuxtLink>
        </article>
      </div>
    </section>

    <!-- третий блок -->
    <section class="bg-white dark:bg-gray-900"
      :class="'order-2'">
      <div
        class="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
        <img class="w-full dark:hidden" alt="dashboard image"
          src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup.svg"
        >
        <img class="w-full hidden dark:block" alt="dashboard image"
          src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup-dark.svg"
        >
        <div class="mt-4 md:mt-0">
          <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">У нас собрано много инструментов для разработчиков</h2>
          <p class="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">
            В нашем блоге вы найдете инструменты для разработчиков: ресурсы, курсы и статьи по веб-разработке. Мы предлагаем актуальные материалы и советы для вашего самообразования и развития навыков
          </p>
          <a href="#" class="inline-flex items-center text-white bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-cyan-900">
            Подробнее
            <svg class="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
          </a>
        </div>
      </div>
    </section>

    <!-- четвертый блок -->
    <section class="bg-white py-8 antialiased dark:bg-gray-900 md:py-16" :class="'order-1'">
      <div class="mx-auto grid max-w-screen-xl px-4 pb-8 md:grid-cols-12 lg:gap-12 lg:pb-16 xl:gap-0">
        <div class="content-center justify-self-start md:col-span-7 md:text-start">
          <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight dark:text-white md:max-w-2xl md:text-5xl xl:text-6xl">
            Limited Time Offer!<br />Up to 50% OFF!</h1>
          <p class="mb-4 max-w-2xl text-gray-500 dark:text-gray-400 md:mb-12 md:text-lg lg:mb-5 lg:text-xl">Don't
            Wait - Limited Stock at Unbeatable Prices!</p>  
          <a href="#" class="inline-block rounded-lg bg-cyan-700 px-6 py-3.5 text-center font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800">Shop
            Now</a>
        </div>
        <div class="hidden md:col-span-5 md:mt-0 md:flex">
          <img class="dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/girl-shopping-list.svg" alt="shopping illustration" />
          <img class="hidden dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/girl-shopping-list-dark.svg" alt="shopping illustration" />
        </div>
      </div>
      <div
        class="mx-auto grid max-w-screen-xl grid-cols-2 gap-8 text-gray-500 dark:text-gray-400 sm:grid-cols-3 sm:gap-12 lg:grid-cols-6 px-4">
        <a href="https://sochi.top-academy.ru/">
          <svg class="h-8 hover:text-gray-900 dark:hover:text-white" viewBox="0 0 568 286" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="306" width="262" height="39" fill="currentColor"/><rect x="529" width="39" height="243" fill="currentColor"/><path d="M25.5 62.5H65.5V97.5H102V130.5H65.5V176C66 187 75.4 204.7 109 187.5L123 215.5C93.1667 232.333 31.9 248 25.5 176V130.5H0V97.5H25.5V62.5Z" fill="currentColor"/><path fill-rule="evenodd" clip-rule="evenodd" d="M204.5 95.5C229.333 95.5 279 109.9 279 167.5C279 176 267.5 231 204.5 231C141.5 231 130.5 178 130.5 167.5C130.5 157 136.5 95.5 204.5 95.5ZM235.5 167.5C235.5 133.9 214.833 126.833 204.5 127.5C173.5 127.5 174 157 174 167.5C174 178 182.5 198 204.5 198C226.5 198 231 183.5 235.5 167.5Z" fill="currentColor"/><path fill-rule="evenodd" clip-rule="evenodd" d="M294 98.5H358.5V122.5C366.667 112.833 390 93.5 418 93.5C453 93.5 470 139 470 164.5C470 190 438.5 258 358.5 217V253.5H383.5V286H294V253.5H319V131.5H294V98.5ZM358.5 185.5V154C416 97.5 424.5 154 424.5 164.5C420.1 205.7 378.667 195.667 358.5 185.5Z" fill="currentColor"/></svg>
        </a>
        <a href="https://dublecode.ru/">
          <svg width="230" height="38" viewBox="0 0 230 38" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.54688 37C2.85938 37 0.515625 34.6562 0.515625 29.9688V18.25C0.515625 13.5625 2.85938 11.2188 7.54688 11.2188H12.9375C14 11.2188 14.7812 11.4609 15.2812 11.9453V2.78125L19.7344 0.671875H19.9688V29.9688C19.9688 34.6562 17.625 37 12.9375 37H7.54688ZM7.54688 32.7812H12.9375C14.5 32.7812 15.2812 31.8438 15.2812 29.9688V18.25C15.2812 16.375 14.5 15.4375 12.9375 15.4375H7.54688C5.98438 15.4375 5.20312 16.375 5.20312 18.25V29.9688C5.20312 31.8438 5.98438 32.7812 7.54688 32.7812ZM35.2031 37C30.5156 37 28.1719 34.6562 28.1719 29.9688V12.3906L32.625 10.2812H32.8594V29.9688C32.8594 31.8438 33.6406 32.7812 35.2031 32.7812H40.5938C42.1562 32.7812 42.9375 31.8438 42.9375 29.9688V12.3906L47.3906 10.2812H47.625V29.9688C47.625 34.6562 45.2812 37 40.5938 37H35.2031ZM62.8594 32.7812H68.25C69.8125 32.7812 70.5938 31.8438 70.5938 29.9688V18.25C70.5938 16.375 69.8125 15.4375 68.25 15.4375H62.8594C61.2969 15.4375 60.5156 16.375 60.5156 18.25V29.9688C60.5156 31.8438 61.2969 32.7812 62.8594 32.7812ZM62.8594 37C58.1719 37 55.8281 34.6562 55.8281 29.9688V2.78125L60.2812 0.671875H60.5156V11.9453C61.1406 11.4609 61.9219 11.2188 62.8594 11.2188H68.25C72.9375 11.2188 75.2812 13.5625 75.2812 18.25V29.9688C75.2812 34.6562 72.9375 37 68.25 37H62.8594ZM83.4844 37.9375V2.78125L87.9375 0.671875H88.1719V35.8281L83.7188 37.9375H83.4844ZM103.406 37C98.7188 37 96.375 34.6562 96.375 29.9688V18.25C96.375 13.5625 98.7188 11.2188 103.406 11.2188H108.797C113.484 11.2188 115.828 13.5625 115.828 18.25V19.4922L101.133 30.8594C101.352 32.1406 102.109 32.7812 103.406 32.7812H108.797C110.359 32.7812 111.141 31.8438 111.141 29.9688V28.7266L115.594 26.6172H115.828V29.9688C115.828 34.6562 113.484 37 108.797 37H103.406ZM101.062 25.9609L111.117 17.8516C111.023 16.2422 110.25 15.4375 108.797 15.4375H103.406C101.844 15.4375 101.062 16.375 101.062 18.25V25.9609ZM132.234 37C126.766 37 124.031 34.2656 124.031 28.7969V9.8125C124.031 4.34375 126.766 1.60938 132.234 1.60938H139.5C144.969 1.60938 147.703 4.34375 147.703 9.8125V12.3906L143.25 14.5H143.016V9.8125C143.016 7.15625 141.844 5.82812 139.5 5.82812H132.234C129.891 5.82812 128.719 7.15625 128.719 9.8125V28.7969C128.719 31.4531 129.891 32.7812 132.234 32.7812H139.5C141.844 32.7812 143.016 31.4531 143.016 28.7969V26.2188L147.469 24.1094H147.703V28.7969C147.703 34.2656 144.969 37 139.5 37H132.234ZM162.938 32.7812H168.328C169.891 32.7812 170.672 31.8438 170.672 29.9688V18.25C170.672 16.375 169.891 15.4375 168.328 15.4375H162.938C161.375 15.4375 160.594 16.375 160.594 18.25V29.9688C160.594 31.8438 161.375 32.7812 162.938 32.7812ZM162.938 37C158.25 37 155.906 34.6562 155.906 29.9688V18.25C155.906 13.5625 158.25 11.2188 162.938 11.2188H168.328C173.016 11.2188 175.359 13.5625 175.359 18.25V29.9688C175.359 34.6562 173.016 37 168.328 37H162.938ZM189.422 37C184.734 37 182.391 34.6562 182.391 29.9688V18.25C182.391 13.5625 184.734 11.2188 189.422 11.2188H194.812C195.875 11.2188 196.656 11.4609 197.156 11.9453V2.78125L201.609 0.671875H201.844V29.9688C201.844 34.6562 199.5 37 194.812 37H189.422ZM189.422 32.7812H194.812C196.375 32.7812 197.156 31.8438 197.156 29.9688V18.25C197.156 16.375 196.375 15.4375 194.812 15.4375H189.422C187.859 15.4375 187.078 16.375 187.078 18.25V29.9688C187.078 31.8438 187.859 32.7812 189.422 32.7812ZM217.078 37C212.391 37 210.047 34.6562 210.047 29.9688V18.25C210.047 13.5625 212.391 11.2188 217.078 11.2188H222.469C227.156 11.2188 229.5 13.5625 229.5 18.25V19.4922L214.805 30.8594C215.023 32.1406 215.781 32.7812 217.078 32.7812H222.469C224.031 32.7812 224.812 31.8438 224.812 29.9688V28.7266L229.266 26.6172H229.5V29.9688C229.5 34.6562 227.156 37 222.469 37H217.078ZM214.734 25.9609L224.789 17.8516C224.695 16.2422 223.922 15.4375 222.469 15.4375H217.078C215.516 15.4375 214.734 16.375 214.734 18.25V25.9609Z" fill="white"/></svg>
        </a>
      </div>
    </section>
  </div>
</template>

<script setup>
const posts = ref([])
const index = useIndexStore();

const fetch = async () => {
  try {
    // включаем loader
    index.loader = true;

    const res = await $fetch('https://static.dublecode.ru/api/posts?populate=*')

    return posts.value = res.data
  } catch (error) {
    console.log(error);
  } finally {
    // выключаем loader
    index.loader = false;
  }
}
const block1 = ref('')
const block2 = ref('')
const seo = ref({})
const fetchSeo = async () => {
  try {
    index.loader = true;
    const res = await $fetch(`https://static.dublecode.ru/api/global?populate=*`);

    if (res.data.seo) {
      seo.value = res.data.seo;
    }

    block1.value = res.data.block1
    block2.value = res.data.block2

    useHead({
      title: `${seo.value.metaTitle} | PlusPixel`,
      meta: [
        { name: 'description', content: seo.value.metaDescription }
      ],
    })

  } catch (error) {
    console.log(error);
  } finally {
    index.loader = false;
  }
};

onMounted(() => {
  fetch()
  fetchSeo()
})
</script>