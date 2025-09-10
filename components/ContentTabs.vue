<!-- components/ContentTabs.vue -->
<template>
  <div v-if="tabsData?.showTabs && tabsData.siblings.length > 1" class="content-tabs">
    <NuxtLink 
      v-for="tab in tabsData.siblings" 
      :key="tab._path" 
      :to="tab._path" 
      class="tab-link"
    >
      {{ getTabTitle(tab.title) }}
    </NuxtLink>
  </div>
</template>

<script setup>
const { path } = useRoute();
const { data: tabsData } = await useAsyncData(`tabs-data-${path}`, async () => {
  // 1. Определяем путь к родительской директории
  const parentPath = path.substring(0, path.lastIndexOf('/'));
  if (!parentPath) return { showTabs: false, siblings: [] };

  // 2. Ищем метаданные родительской папки (_dir.yml)
  // ИЩЕМ ВНУТРИ ДИРЕКТОРИИ, А НЕ ТОЛЬКО САМУ ДИРЕКТОРИЮ
  const parentDir = await queryContent(parentPath).where({ _path: `${parentPath}/_dir` }).only(['tabs']).findOne();

  // 3. Проверяем флаг.
  const showTabs = parentDir?.tabs === true;
  if (!showTabs) {
    return { showTabs: false, siblings: [] };
  }
  
  // 4. Ищем соседние страницы
  const siblings = await queryContent(parentPath)
    .only(['_path', 'title'])
    .where({ _path: { $not: /_dir$/ } })
    .find();

  // Добавим проверку: показывать табы, только если страниц 2 или больше
  if (siblings.length < 2) {
    return { showTabs: false, siblings: [] };
  }

  return { showTabs: true, siblings };
});

function getTabTitle(title) {
  if (!title) return '';
  return title.replace(/^\d+(\.\d+)*\.\s*/, '');
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