<!-- pages/[...slug].vue -->
<template>
  <div>
    <ContentTabs />
    <main class="prose">
      <ContentDoc />
      <PrevNext :prev="prev" :next="next" />
    </main>
  </div>
</template>

<script setup>
const { path } = useRoute();

const [prev, next] = await queryContent()
  .only(['_path', 'title'])
  // Исключаем из поиска все файлы конфигурации директорий
  .where({ _path: { $not: /_dir$/ } })
  .findSurround(path);
</script>