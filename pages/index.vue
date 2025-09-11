<!-- pages/index.vue -->
<template>
  <div class="prose home-page">
    <h1>Добро пожаловать в электронное пособие</h1>
    <p class="subtitle">
      Этот интерактивный ресурс предназначен для изучения курса "Информатика".
      Он содержит теоретические материалы, примеры решения задач и задания для самостоятельной работы.
    </p>
    
    <p>
      Для навигации по главам и разделам используйте меню слева.
      Чтобы начать, перейдите к первому разделу.
    </p>

    <div class="start-button-container">
      <NuxtLink to="/handbook_of_computer_science/title_page" class="start-button">
        Начать обучение
      </NuxtLink>
    </div>

  </div>
</template>

<script setup>
import { usePageTitle } from '~/composables/states';
const pageTitle = usePageTitle();
pageTitle.value = 'Главная страница';
</script>
<style scoped>
.home-page {
  max-width: 70ch;
  margin: 4rem auto;
  text-align: center;
}

.subtitle {
  font-size: 1.15rem;
  color: var(--text-color-light);
  margin-top: 1rem;
  margin-bottom: 2rem;
}

.start-button-container {
  margin-top: 3rem;
}

.start-button {
  display: inline-block;
  padding: 12px 28px;
  background-color: var(--link-color);
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.2s ease;
  box-shadow: 0 4px 15px rgba(109, 40, 217, 0.2);
}

.start-button:hover {
  transform: translateY(-2px);
  background-color: var(--link-hover-color);
  box-shadow: 0 6px 20px rgba(109, 40, 217, 0.3);
  color: white; /* Гарантируем, что текст останется белым */
}
</style>