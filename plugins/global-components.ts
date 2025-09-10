// plugins/global-components.ts

import MermaidDiagram from '~/components/MermaidDiagram.vue';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('MermaidDiagram', MermaidDiagram);
});