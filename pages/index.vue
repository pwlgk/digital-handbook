<!-- pages/index.vue -->
<template>
  <div class="prose">
    <h1>Добро пожаловать в электронную библиотеку</h1>
    <p>
      Это центральная страница, предоставляющая доступ ко всем учебным материалам.
      Пожалуйста, выберите интересующее вас пособие в меню навигации слева.
    </p>

    <hr>

    <h2>Доступные пособия:</h2>
    
    <!-- 
      Этот компонент автоматически сгенерирует список ссылок
      на корневые разделы вашего контента.
    -->
    <ContentList path="/" v-slot="{ list }">
      <ul class="course-list">
        <li v-for="course in list" :key="course._path">
          <NuxtLink :to="course._path">
            <h3>{{ course.title }}</h3>
            <p v-if="course.description">{{ course.description }}</p>
          </NuxtLink>
        </li>
      </ul>
    </ContentList>

  </div>
</template>

<script setup>
// Устанавливаем заголовок для этой конкретной страницы
import { usePageTitle } from '~/composables/states';
const pageTitle = usePageTitle();
pageTitle.value = 'Главная страница';
</script>

<style scoped>
.course-list {
  list-style: none;
  padding: 0;
  margin-top: 2rem;
}
.course-list li {
  margin-bottom: 1.5rem;
}
.course-list li a {
  display: block;
  padding: 1.5rem;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.2s ease;
}
.course-list li a:hover {
  border-color: var(--link-color);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
}
html.dark .course-list li a:hover {
  box-shadow: 0 4px 20px rgba(0,0,0,0.2);
}
.course-list h3 {
  margin: 0 0 0.5rem 0;
  color: var(--link-color);
  font-size: 1.25rem;
  border: none;
  padding: 0;
}
.course-list p {
  margin: 0;
  color: var(--text-color-light);
  font-size: 1rem;
}
</style>