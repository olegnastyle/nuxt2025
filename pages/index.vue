<script setup>
import { useSwiper } from '#imports'

const containerRef = ref(null)
const swiper = ref(null)
const slides = ref([
    {
        id: 1,
        url: 'https://avatars.mds.yandex.net/i?id=9871bb490e49701860b34a4f5834bd2e_l-8176266-images-thumbs&n=13',
        alt: 'Slide 1'
    },
    {
        id: 2,
        url: 'https://cs13.pikabu.ru/post_img/2023/02/11/8/og_og_167612238721281779.jpg',
        alt: 'Slide 2'
    },
    {
        id: 3,
        url: 'https://i.pinimg.com/originals/c5/2f/b0/c52fb0e9de148e812c542414ee46206e.jpg',
        alt: 'Slide 3'
    }
])

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

const handlePrev = () => {
  swiper.value?.prev()
}

const handleNext = () => {
  swiper.value?.next()
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <section class="relative">
      <ClientOnly>
        <swiper-container ref="containerRef" class="w-full h-40">
          <swiper-slide v-for="slide in slides" :key="slide.id"
            class="w-full h-full flex justify-center items-center"
          >
            <img :src="slide.url" class="w-full h-full object-cover">
          </swiper-slide>
        </swiper-container>
      </ClientOnly>

      <!-- Go back one slide -->
      <button @click="handlePrev" class="absolute left-4 top-1/2 -translate-y-1/2 text-white text-2xl hover:text-blue-600 transition-colors rounded-full p-2 cursor-pointer z-10">
        <svg class="size-12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M4 3C3.44772 3 3 3.44772 3 4V20C3 20.5523 3.44772 21 4 21H20C20.5523 21 21 20.5523 21 20V4C21 3.44772 20.5523 3 20 3H4ZM6.34277 11.9996L12.2925 6.0498V10.9996H17.6565V12.9996H12.2925V17.9493L6.34277 11.9996Z"></path></svg>
      </button>
      <!-- Go forward one slide -->
      <button @click="handleNext" class="absolute right-4 top-1/2 -translate-y-1/2 text-white text-2xl hover:text-blue-600 transition-colors rounded-full p-2 cursor-pointer z-10">
        <svg class="size-12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M4 3C3.44772 3 3 3.44772 3 4V20C3 20.5523 3.44772 21 4 21H20C20.5523 21 21 20.5523 21 20V4C21 3.44772 20.5523 3 20 3H4ZM17.6575 11.9996L11.7077 17.9493V12.9996H6.34375V10.9996H11.7077V6.0498L17.6575 11.9996Z"></path></svg>
      </button>
    </section>
  </div>
</template>
  