<!-- error.vue -->
<template>
  <div class="error-page">
    <div class="container">
      <h1>{{ error.statusCode }}</h1>
      <p>{{ message }}</p>
      <NuxtLink to="/" class="home-button">Вернуться на главную</NuxtLink>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  error: Object
})

const message = computed(() => {
  return props.error.statusCode === 404
    ? "Упс! Страница не найдена."
    : "Произошла ошибка."
})

useHead({
  title: `${props.error.statusCode} - ${message.value}`
})
</script>

<style scoped>
.error-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
  background-color: var(--bg-color-soft, #f9f9f9);
  color: var(--text-color, #213547);
}
.container h1 {
  font-size: 6rem;
  font-weight: 700;
  margin: 0;
  color: var(--heading-color, #111827);
}
.container p {
  font-size: 1.25rem;
  margin: 1rem 0 2rem;
}
.home-button {
  display: inline-block;
  padding: 12px 24px;
  background-color: var(--link-color, #007bff);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 500;
  transition: background-color 0.2s;
}
.home-button:hover {
  background-color: var(--link-hover-color, #0056b3);
}
</style>