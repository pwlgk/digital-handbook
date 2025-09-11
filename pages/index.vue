<!-- pages/index.vue -->
<template>
  <div class="prose home-page">
    <h1>Платформа электронных пособий</h1>
    <p class="subtitle">
      Добро пожаловать в нашу библиотеку интерактивных учебных материалов.
      Здесь собраны пособия и лекции, созданные для современного и удобного обучения.
    </p>
    
    <p>
      Выберите одно из доступных пособий в меню навигации слева, чтобы начать.
    </p>

    <!-- Контейнер для баннеров-карточек -->
    <div class="card-container">
      
      <!-- Карточка "О проекте" -->
      <NuxtLink to="/info" class="info-card">
        <div class="card-content">
          <h3>О проекте</h3>
          <p>Узнайте больше о концепции, технологиях и преимуществах этой платформы.</p>
        </div>
      </NuxtLink>

      <!-- Карточка "Руководство для авторов" -->
      <NuxtLink to="/author-guide/content-rules" class="info-card">
        <div class="card-content">
          <h3>Стать автором</h3>
          <p>Присоединяйтесь к развитию проекта! Узнайте, как добавлять и редактировать материалы.</p>
        </div>
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
  max-width: 90ch; /* Сделаем чуть шире для карточек */
  margin: 4rem auto;
  padding: 0 1rem; /* Добавим отступы на мобильных */
  box-sizing: border-box;
}

.prose h1 {
  text-align: center;
}

.subtitle {
  font-size: 1.2rem;
  color: var(--text-color-light);
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 2.5rem;
  max-width: 65ch;
  margin-left: auto;
  margin-right: auto;
}

p {
  text-align: center;
}

.card-container {
  display: grid;
  grid-template-columns: 1fr 1fr; /* Две колонки */
  gap: 1.5rem;
  margin-top: 3.5rem;
  text-align: left; /* Возвращаем выравнивание для текста в карточках */
}

.info-card {
  display: block;
  padding: 1.5rem;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.info-card:hover {
  border-color: var(--link-color);
  transform: translateY(-4px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.07);
}

html.dark .info-card:hover {
  box-shadow: 0 6px 25px rgba(0,0,0,0.2);
  background-color: var(--bg-color-soft);
}

.info-card h3 {
  margin: 0 0 0.5rem 0;
  color: var(--link-color);
  font-size: 1.15rem;
  border: none;
  padding: 0;
}

.info-card p {
  margin: 0;
  color: var(--text-color-light);
  font-size: 0.95rem;
  text-align: left;
}

/* Адаптивность для карточек */
@media (max-width: 768px) {
  .card-container {
    grid-template-columns: 1fr; /* Одна колонка на мобильных */
  }
}
</style>