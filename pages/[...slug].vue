<!-- pages/[...slug].vue -->
<template>
  <!-- Добавляем директиву v-highlight сюда -->
  <div v-highlight>
    <ClientOnly><ContentTabs /></ClientOnly>
    
    <main class="prose">
      <ContentDoc />
      
      <ClientOnly>
        <PrevNext :prev="prev" :next="next" />
        <template #fallback><div class="prev-next-nav-fallback"></div></template>
      </ClientOnly>
    </main>
  </div>
</template>

<script setup>
const { path } = useRoute();
const pageTitle = usePageTitle(); // 1. Получаем доступ к нашему хранилищу

// 2. Находим текущий документ, чтобы получить его заголовок
const { data: doc } = await useAsyncData(path, () => 
  queryContent().where({ _path: path }).findOne()
);

// 3. Устанавливаем заголовок страницы, очищая его от префиксов
if (doc.value?.title) {
  pageTitle.value = doc.value.title.replace(/^\d+(\.\d+)*\.\s*/, '');
}

// Логика для Prev/Next остается без изменений
const [prev, next] = await queryContent()
  .only(['_path', 'title'])
  .where({ _path: { $not: /_dir$/ } })
  .findSurround(path);
</script>

<style scoped>
/* Стиль для "скелета" загрузки PrevNext */
.prev-next-nav-fallback {
    border-top: 1px solid var(--border-color);
    margin-top: 3rem;
    height: 90px;
}
</style>