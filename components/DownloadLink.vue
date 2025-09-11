<!-- components/DownloadLink.vue -->
<template>
  <a :href="url" class="download-link" download>
    <div class="icon">
      <!-- Простая SVG иконка скачивания -->
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
    </div>
    <div class="info">
      <span class="title"><slot /></span>
      <span v-if="type" class="type">Тип файла: {{ type }}</span>
    </div>
  </a>
</template>

<script setup>
defineProps({
  url: { type: String, required: true },
  type: { type: String, default: '' }
});
</script>

<style scoped>
.download-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  text-decoration: none;
  margin: 1em 0;
  transition: all 0.2s ease;
}
.download-link:hover {
  border-color: var(--link-color);
  background-color: var(--bg-color-soft);
}
.icon {
  color: var(--link-color);
  flex-shrink: 0;
}
.title {
  color: var(--heading-color);
  font-weight: 500;
}
.type {
  display: block;
  font-size: 0.85rem;
  color: var(--text-color-light);
}
</style>