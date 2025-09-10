<!-- components/MermaidDiagram.vue -->
<template>
  <ClientOnly>
    <div ref="container" class="mermaid-container"></div>
    <template #fallback>
      <div class="mermaid-placeholder">Загрузка диаграммы...</div>
    </template>
  </ClientOnly>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue';

const props = defineProps({
  code: {
    type: String,
    required: true
  }
});

const container = ref(null);
const colorMode = useColorMode();

const renderDiagram = async () => {
  if (!process.client || !container.value || !props.code) {
    return;
  }
  const sourceText = props.code.trim();

  try {
    const mermaid = (await import('mermaid')).default;
    mermaid.initialize({
      startOnLoad: false,
      theme: colorMode.value === 'dark' ? 'dark' : 'default',
    });
    const diagramId = 'mermaid-svg-' + Math.random().toString(16).slice(2);
    const { svg } = await mermaid.render(diagramId, sourceText);
    container.value.innerHTML = svg;
  } catch (e) {
    container.value.innerHTML = `<pre class="error-placeholder">Ошибка рендеринга:\n${e.message}</pre>`;
    console.error("Mermaid render error:", e);
  }
};

onMounted(() => {
  nextTick(renderDiagram);
});

watch(colorMode, renderDiagram);
</script>

<style>
.mermaid-container, .mermaid-placeholder {
  min-height: 100px; display: flex; justify-content: center; align-items: center; margin: 1.5em 0;
}
.mermaid-placeholder {
  font-family: monospace; color: var(--text-color-light);
}
.error-placeholder {
  color: #ff4d4d; white-space: pre-wrap; text-align: left; border: 1px solid #ff4d4d; padding: 1em; border-radius: 8px; width: 100%;
}
.mermaid svg {
  max-width: 100%; height: auto;
}
</style>