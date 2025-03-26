<template>
    <!-- компонент регистрация / авторизация -->
    <div v-if="true">
        <UiSignin v-if="index.authToggle" />
        <UiLogin v-else />
    </div>
</template>

<script setup>
const index = useIndexStore();
</script>