<!-- pages/sandbox.vue -->
<template>
  <div class="sandbox-layout">
    <div class="editor-pane">
      <h2>Редактор Markdown</h2>
      <p class="help-text">Введите Markdown, чтобы увидеть результат. Работают компоненты, KaTeX и Prism.js.</p>
      <textarea v-model="markdownInput" placeholder="Введите ваш Markdown здесь..."></textarea>
    </div>
    <div class="preview-pane">
      <h2>Предпросмотр</h2>
      <div class="prose">
        <!-- 
          ContentRenderer - "сердце" Nuxt Content.
          Мы передаем ему распарсенное дерево (AST).
        -->
        <ContentRenderer :value="parsedContent" />
      </div>
    </div>
  </div>
</template>

<!-- pages/sandbox.vue -->
<script setup>
import { ref, watch, onMounted, nextTick } from 'vue';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';

// --- ИЗМЕНЕНИЕ 1: Правильная инициализация ---
// Инициализируем parser сразу, он нам понадобится
const parser = unified().use(remarkParse).use(remarkGfm);

// Инициализируем parsedContent с валидным, но пустым AST
const initialAst = parser.parse('');
const parsedContent = ref({ body: initialAst });

const markdownInput = ref(`
# Тестовый заголовок

Это **жирный** и *курсивный* текст.

## Формула KaTeX
$$
H(X) = -\\sum_{i=1}^N p_i \\log p_i
$$

## Диаграмма Mermaid
::MermaidDiagram
---
code: |
  graph TD
    A[Начало] --> B{Решение}
---
::
`);

// Функция для парсинга Markdown
function parseMarkdown() {
  if (process.client) {
    try {
      // --- ИЗМЕНЕНИЕ 2: Обработка пустого ввода ---
      // Если ввод пустой, используем пустой AST, чтобы не было ошибок
      const ast = markdownInput.value ? parser.parse(markdownInput.value) : parser.parse('');
      parsedContent.value = { body: ast };
    } catch (error) {
      console.error("Markdown parsing error:", error);
      const errorAst = parser.parse(`\`\`\`\n${error.message}\n\`\`\``);
      parsedContent.value = { body: errorAst };
    }
  }
}

// Следим за изменениями в поле ввода
watch(markdownInput, parseMarkdown);

// --- ИЗМЕНЕНИЕ 3: Вызываем парсинг при монтировании ---
// Чтобы начальное значение отобразилось
onMounted(parseMarkdown);


const { $highlight } = useNuxtApp();
watch(parsedContent, () => {
  nextTick(() => {
    if (process.client && $highlight) {
      $highlight();
    }
  });
});
</script>

<style scoped>
.sandbox-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: calc(100vh - 60px); /* 60px - высота мобильной шапки */
  gap: 1rem;
  padding: 1rem;
  box-sizing: border-box;
}

.editor-pane, .preview-pane {
  display: flex;
  flex-direction: column;
  height: 100%;
}

textarea {
  width: 100%;
  flex-grow: 1;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 1rem;
  font-family: 'Fira Code', monospace;
  font-size: 1rem;
  background-color: var(--bg-color-soft);
  color: var(--text-color);
  resize: none;
  box-sizing: border-box;
}

.preview-pane {
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 0 2rem;
  overflow-y: auto;
}

h2 {
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}
.help-text {
  font-size: 0.9rem;
  color: var(--text-color-light);
  margin-top: 0;
  margin-bottom: 1rem;
}

/* Адаптивность для мобильных */
@media (max-width: 992px) {
  .sandbox-layout {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
    height: auto;
  }
}
</style>