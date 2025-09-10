<!-- app.vue -->
<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
// Здесь можно разместить глобальную логику, которая должна выполняться
// при каждом запуске приложения. Например, установка мета-тегов по умолчанию.
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Электронное пособие` : 'Электронное пособие';
  },
  htmlAttrs: {
    lang: 'ru'
  }
})
</script>

<style>
/* 
  Стили здесь будут глобальными для всего приложения. 
  Они не "scoped". Это хорошее место для сброса стилей (reset.css) 
  или для определения CSS-переменных.
  Мы уже подключили глобальные стили через nuxt.config.ts, 
  но этот способ тоже работает.
*/
</style>