<!-- components/ProseImg.vue -->
<template>
  <figure class="prose-image" @click="openLightbox" :class="{ 'with-lightbox': lightbox }">
    <img :src="src" :alt="alt" :width="width" :height="height" loading="lazy">
    <figcaption v-if="$slots.caption">
      <ContentSlot :use="$slots.caption" />
    </figcaption>
  </figure>

  <!-- Модальное окно (Lightbox) -->
  <div v-if="isLightboxOpen" class="lightbox-overlay" @click="closeLightbox">
    <img :src="src" :alt="alt" class="lightbox-image">
    <button class="lightbox-close" aria-label="Закрыть изображение">&times;</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: '' },
  width: { type: [String, Number], default: null },
  height: { type: [String, Number], default: null },
  lightbox: { type: Boolean, default: false } // Пропс для включения лайтбокса
});

const isLightboxOpen = ref(false);

function openLightbox() {
  if (props.lightbox) {
    isLightboxOpen.value = true;
    document.body.style.overflow = 'hidden'; // Блокируем скролл страницы
  }
}

function closeLightbox() {
  isLightboxOpen.value = false;
  document.body.style.overflow = ''; // Возвращаем скролл
}
</script>

<style>
/* Стили для компонента. 'scoped' здесь не нужен, чтобы стили лайтбокса были глобальными */
.prose-image {
  margin: 2em auto;
  text-align: center;
}
.prose-image.with-lightbox img {
  cursor: zoom-in;
}
.prose-image img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  border: 1px solid var(--border-color);
}
.prose-image figcaption {
  margin-top: 0.75em;
  font-size: 0.9rem;
  color: var(--text-color-light);
  font-style: italic;
}

/* Стили для лайтбокса (модального окна) */
.lightbox-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.85);
  z-index: 2000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  box-sizing: border-box;
}
.lightbox-image {
  max-width: 90vw;
  max-height: 90vh;
  object-fit: contain;
}
.lightbox-close {
  position: absolute;
  top: 1rem;
  right: 1.5rem;
  font-size: 3rem;
  color: white;
  background: none;
  border: none;
  cursor: pointer;
  line-height: 1;
}
</style>