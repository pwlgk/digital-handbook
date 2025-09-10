import Prism from 'prismjs';

// --- ПОДКЛЮЧЕНИЕ ЯЗЫКОВ ---
// Вы можете добавлять или удалять языки в зависимости от того,
// какой код вы планируете показывать в пособии.
// 'clike' является основой для многих C-подобных языков.
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-markup-templating'; // Для HTML, Vue, JSX

export default defineNuxtPlugin((nuxtApp) => {
  // Регистрируем директиву 'highlight' для всего Vue-приложения
  nuxtApp.vueApp.directive('highlight', {
    /**
     * getSSRProps - это хук для серверного рендеринга.
     * Он должен существовать, чтобы Nuxt/Vue не выдавал ошибку на сервере.
     * Мы возвращаем пустой объект, так как на сервере подсветка не нужна.
     */
    getSSRProps() {
      return {};
    },
    
    /**
     * mounted - этот хук вызывается на клиенте, когда элемент,
     * к которому применена директива, вставлен в DOM.
     */
    mounted(el) {
      // Проверяем, что код выполняется в браузере
      if (process.client) {
        // Запускаем Prism для поиска и подсветки всех блоков кода внутри `el`
        Prism.highlightAllUnder(el);
      }
    },

    /**
     * updated - этот хук вызывается, когда содержимое элемента
     * (или его дочерних элементов) обновляется.
     */
    updated(el) {
      if (process.client) {
        Prism.highlightAllUnder(el);
      }
    }
  });

  // Также можно предоставить глобальный метод $highlight для ручного вызова, если потребуется
  if (process.client) {
    nuxtApp.provide('highlight', () => Prism.highlightAll());
  }
});