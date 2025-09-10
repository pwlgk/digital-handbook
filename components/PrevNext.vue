<!-- components/PrevNext.vue -->
<template>
  <div class="prev-next-nav" v-if="prev || next">
    <!-- Ссылка НАЗАД -->
    <NuxtLink v-if="prev" :to="prev._path" class="nav-link prev">
      <span class="arrow">←</span>
      <div class="content">
        <span class="label">Назад</span>
        <span class="text">{{ getTrimmedTitle(prev.title) }}</span>
      </div>
    </NuxtLink>
    <!-- Пустой span для выравнивания, если есть только одна кнопка -->
    <span v-else></span>

    <!-- Ссылка ВПЕРЕД -->
    <NuxtLink v-if="next" :to="next._path" class="nav-link next">
      <div class="content">
        <span class="label">Вперед</span>
        <span class="text">{{ getTrimmedTitle(next.title) }}</span>
      </div>
      <span class="arrow">→</span>
    </NuxtLink>
  </div>
</template>

<script setup>
defineProps({
  prev: {
    type: Object,
    required: false
  },
  next: {
    type: Object,
    required: false
  }
});

// Убираем числовые префиксы из заголовков для чистоты
function getTrimmedTitle(title) {
  if (!title) return '';
  return title.replace(/^\d+\.\s*/, '');
}
</script>

<style scoped>
/* Главный контейнер */
.prev-next-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid var(--border-color);
  padding-top: 1.5rem;
  margin-top: 3rem;
  gap: 1rem;
}

/* Общий стиль для ссылок-кнопок */
.nav-link {
  display: flex;
  align-items: center;
  gap: 0.75rem; /* Расстояние между стрелкой и текстом */
  text-decoration: none;
  border: 1px solid var(--border-color);
  padding: 0.75rem 1rem;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.nav-link:hover {
  border-color: var(--link-color);
  background-color: var(--bg-color-soft);
}

/* Блок с текстом */
.content {
  display: flex;
  flex-direction: column;
}

/* Подсказка "Назад" / "Вперед" */
.label {
  font-size: 0.8rem;
  color: var(--text-color-light);
}

/* Основной заголовок */
.text {
  font-weight: 500;
  color: var(--heading-color);
}

/* Стрелки */
.arrow {
  font-size: 1.5rem;
  line-height: 1;
  color: var(--text-color-light);
  transition: color 0.2s ease;
}

.nav-link:hover .arrow {
  color: var(--link-color);
}

/* Выравнивание текста для кнопки "Вперед" */
.nav-link.next .content {
  align-items: flex-end;
}

.nav-link:hover {
  border-color: var(--link-color);
  background-color: var(--bg-color-soft);
  /* ДОБАВЬТЕ ЭТУ СТРОКУ */
  text-decoration: none;
}
</style>