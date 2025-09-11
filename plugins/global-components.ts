// plugins/global-components.ts
import MermaidDiagram from '~/components/MermaidDiagram.vue';
import DownloadLink from '~/components/DownloadLink.vue';
import ProseImg from '~/components/ProseImg.vue'; // <-- Добавляем импорт

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('MermaidDiagram', MermaidDiagram);
  nuxtApp.vueApp.component('DownloadLink', DownloadLink);
  nuxtApp.vueApp.component('ProseImg', ProseImg); // <-- Добавляем регистрацию
});