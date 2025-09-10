<!-- components/ContentTabs.vue -->
<template>
  <div v-if="siblings && siblings.length > 1" class="content-tabs">
    <NuxtLink 
      v-for="tab in siblings" 
      :key="tab._path" 
      :to="tab._path" 
      class="tab-link"
    >
      {{ getTabTitle(tab.title) }}
    </NuxtLink>
  </div>
</template>

<script setup>
import { computed } from 'vue';
const { path } = useRoute();

const isNestedRoute = path.split('/').filter(Boolean).length > 1;

const { data: siblings } = await useAsyncData(`tabs-${path}`, async () => {
  if (isNestedRoute) {
    const parentPath = path.substring(0, path.lastIndexOf('/'));
    
    // Находим все страницы в директории
    const pages = await queryContent(parentPath)
      .only(['_path', 'title'])
      .find();

    // --- КЛЮЧЕВОЕ ИЗМЕНЕНИЕ ЗДЕСЬ ---
    // Фильтруем результат, чтобы убрать саму родительскую папку (_dir.yml)
    return pages.filter(page => !page._path.endsWith('/_dir'));
  }
  return null;
});

function getTabTitle(title) {
  if (!title) return '';
  return title.replace(/^\d+\.\s*/, '');
}
</script>

<style scoped>
.content-tabs {
  display: flex;
  border-bottom: 2px solid var(--border-color);
  margin-bottom: 2rem;
}
.tab-link {
  padding: 10px 20px;
  text-decoration: none;
  color: var(--text-color-light);
  font-weight: 500;
  border-bottom: 2px solid transparent;
  margin-bottom: -2px; /* чтобы нижняя граница активной ссылки перекрывала общую */
  transition: color 0.2s, border-color 0.2s;
}
.tab-link:hover {
  color: var(--text-color);
}
.tab-link.router-link-exact-active {
  color: var(--link-color);
  border-bottom-color: var(--link-color);
}
</style>