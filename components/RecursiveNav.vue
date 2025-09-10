<!-- components/RecursiveNav.vue -->
<template>
  <ul class="nav-list">
    <li v-for="link in links" :key="link._path" class="nav-item">
      <NuxtLink :to="resolveLink(link)" class="nav-link">
        <span class="title">{{ getTrimmedTitle(link.title) }}</span>
        <!-- Показываем иконку, если есть дочерние элементы -->
        <span v-if="link.children" class="chevron">›</span>
      </NuxtLink>
      <RecursiveNav v-if="link.children" :links="link.children" />
    </li>
  </ul>
</template>

<script setup>
defineProps({
  links: {
    type: Array,
    default: () => []
  }
});

function resolveLink(link) {
  if (link.children && link.children.length > 0) {
    return findFirstChildPath(link.children[0]);
  }
  return link._path;
}

function findFirstChildPath(link) {
  if (link.children && link.children.length > 0) {
    return findFirstChildPath(link.children[0]);
  }
  return link._path;
}

// Новая функция для очистки заголовка от префиксов
function getTrimmedTitle(title) {
  if (!title) return '';
  return title.replace(/^\d+(\.\d+)*\.\s*/, '');
}
</script>

<style scoped>
.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-list .nav-list {
  padding-left: 12px;
  margin-left: 12px;
  /* Более светлая и тонкая линия-индикатор */
  border-left: 1px solid rgba(128, 128, 128, 0.2);
}

.nav-item {
  margin: 2px 0;
}

.nav-link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  border-radius: 6px;
  text-decoration: none;
  color: var(--text-color-light);
  font-weight: 500;
  transition: color 0.2s, background-color 0.2s;
}

.nav-link:hover {
  /* При наведении меняем цвет текста на основной */
  color: var(--text-color);
  background-color: var(--bg-color-soft);
}

/* Стили для активной ссылки - теперь без фона */
.nav-link.router-link-exact-active {
  color: var(--link-color);
  font-weight: 700; /* Делаем шрифт жирнее */
  background-color: transparent; /* Убираем фон */
}
/* В темной теме тоже убираем специальный цвет текста для активной ссылки */
html.dark .nav-link.router-link-exact-active {
  color: var(--link-color);
}

.title {
  flex-grow: 1;
}

.chevron {
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--text-color-light);
  opacity: 0.5;
  margin-left: 8px;
}
</style>