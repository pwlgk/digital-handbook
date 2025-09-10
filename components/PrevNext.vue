<!-- components/PrevNext.vue -->
<template>
  <div class="prev-next-nav">
    <!-- Ссылка НАЗАД -->
    <NuxtLink v-if="prev" :to="prev._path" class="nav-link prev">
      <span class="arrow">←</span>
      <div class="content">
        <span class="label">Назад</span>
        <span class="text">{{ getTrimmedTitle(prev.title) }}</span>
      </div>
    </NuxtLink>
    <!-- 
      Этот пустой div нужен, чтобы кнопка "Вперед" оставалась справа, 
      если кнопки "Назад" нет.
    -->
    <div v-else></div>

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

function getTrimmedTitle(title) {
  if (!title) return '';
  return title.replace(/^\d+(\.\d+)*\.\s*/, '');
}
</script>

<style scoped>
/* Главный контейнер */
.prev-next-nav {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  border-top: 1px solid var(--border-color);
  padding-top: 1.5rem;
  margin-top: 3rem;
}

/* Общий стиль для ссылок-кнопок */
.nav-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  border: 1px solid var(--border-color);
  padding: 0.75rem 1rem;
  border-radius: 8px;
  transition: all 0.2s ease;
  flex-basis: 0;
  flex-grow: 1;
  min-width: 0;
  overflow: hidden;
}

.nav-link:hover {
  border-color: var(--link-color);
  background-color: var(--bg-color-soft);
  text-decoration: none;
}

/* Блок с текстом */
.content {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-width: 0;
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
  font-size: 0.9rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left; /* По умолчанию текст слева */
}

/* Стрелки */
.arrow {
  font-size: 1.25rem;
  color: var(--text-color-light);
  flex-shrink: 0;
}

.nav-link:hover .arrow {
  color: var(--link-color);
}

/* Стили для кнопки "Вперед" */

.nav-link.next .label,
.nav-link.next .text {
  text-align: right; /* Текст внутри кнопки "Вперед" выравниваем вправо */
}
.nav-link.next .arrow {
  order: 1;
}
</style>