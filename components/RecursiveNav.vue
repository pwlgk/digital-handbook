<!-- components/RecursiveNav.vue -->
<template>
  <ul class="nav-list">
    <li v-for="link in links" :key="link._path" class="nav-item">
      <NuxtLink :to="resolveLink(link)" class="nav-link" :class="{ 'is-active-parent': isParentActive(link) }">
        <span class="title">{{ getTrimmedTitle(link.title) }}</span>
        <span v-if="link.children" class="chevron" :class="{ 'is-open': isParentActive(link) }">›</span>
      </NuxtLink>
      
      <!-- Показываем дочерние элементы только если текущая ветка активна -->
      <RecursiveNav v-if="link.children && isParentActive(link)" :links="link.children" />
    </li>
  </ul>
</template>

<script setup>
const route = useRoute();

const props = defineProps({
  links: {
    type: Array,
    default: () => []
  }
});

/**
 * Проверяет, является ли текущий маршрут или один из его дочерних элементов активным.
 * @param {object} link - Объект навигационной ссылки
 */
function isParentActive(link) {
  if (!link.children) {
    return false;
  }
  // Проверяем, начинается ли текущий URL с пути этой папки
  return route.path.startsWith(link._path);
}

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
  transition: color 0.2s, background-color 0.2s, font-weight 0.2s;
}

.nav-link:hover {
  color: var(--text-color);
  background-color: var(--bg-color-soft);
}

/* Активная ссылка (конечная страница) */
.nav-link.router-link-exact-active {
  color: var(--link-color);
  font-weight: 700;
  background-color: transparent;
}
/* Активный родитель (раскрытая папка) */
.nav-link.is-active-parent {
  color: var(--heading-color);
  font-weight: 600;
}
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
  transition: transform 0.3s;
  transform: rotate(0deg); /* Начальное положение */
}
/* Поворачиваем шеврон для открытой папки */
.chevron.is-open {
  transform: rotate(90deg);
}
</style>