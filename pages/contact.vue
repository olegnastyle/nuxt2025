<template>
    <h1 class="my-4 text-2xl text-blue-700 darl:blue-500 font-medium">Контакты</h1>
    <p class="my-4 text-black dark:text-white">Кулинарный блог — это пространство для вдохновения и обмена опытом, где любители вкусной еды и искусства готовки делятся рецептами, советами и историями о своем кулинарном творчестве. Здесь вы найдете пошаговые инструкции приготовления блюд различной сложности, от классических домашних ужинов до изысканных десертов и экзотических кулинарных экспериментов. Блог также предлагает идеи для праздничных застолий, здорового питания и быстрых решений для повседневной жизни. Каждый рецепт сопровождается подробными описаниями, фотографиями и личными рекомендациями автора, чтобы сделать процесс готовки понятным и увлекательным для всех: как для начинающих поваров, так и для опытных гурманов. Присоединяйтесь к нам, чтобы открывать новые вкусовые горизонты и превращать обычные ингредиенты в настоящие шедевры!</p>
    <h2 class="my-4 text-black text-xl font-medium dark:text-white">Контакты:</h2>
    <ul class="my-4 text-black dark:text-white">
        <li>Номер: <a class="underline hover:text-blue-500" href="tel:79933079829">+7 (993) 307-98-29</a></li>
        <li>Почта: <a class="underline hover:text-blue-500" href="mailto:oleg@nastyle.pro">oleg@nastyle.pro</a></li>
    </ul>
    <h2 class="my-4 text-black text-xl font-medium dark:text-white">Форма обратной связи:</h2>
    <AppFeedback />
</template>

<script setup>
const index = useIndexStore();
const seo = ref({});

// Загружаем данные с SSR
const { data } = await useAsyncData('seo', () => 
  $fetch('https://908bd2082661.vps.myjino.ru/api/contact?populate=*'),
  { server: true }
);

// Заполняем seo после загрузки
if (data.value?.data?.seo) {
  seo.value = data.value.data.seo;
}

// Используем useHead после загрузки данных
useHead({
  title: () => seo.value?.metaTitle ? `${seo.value.metaTitle} | Секреты Шефа` : 'Секреты Шефа',
  meta: [
    { name: 'description', content: () => seo.value?.metaDescription || '' }
  ],
});
</script>