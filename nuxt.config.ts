// nuxt.config.ts

export default defineNuxtConfig({
  compatibilityDate: '2024-09-10',

  devtools: { enabled: true },

  // --- МОДУЛИ ---
  modules: [
    '@nuxt/content',
    '@nuxtjs/color-mode',
    '@nuxtjs/google-fonts',
  ],

  // --- ГЛОБАЛЬНЫЕ СТИЛИ ---
  css: [
    '~/assets/css/main.css',
    'katex/dist/katex.min.css',     // Стили для формул KaTeX
    '~/assets/css/prism-theme.css'  // Стили для подсветки кода Prism.js
  ],

  // --- НАСТРОЙКИ МОДУЛЕЙ ---

  // Настройки для @nuxt/content
  content: {
    // Мы полностью отключаем встроенную подсветку, чтобы избежать ошибок
    highlight: false,

    // Настраиваем парсер Markdown для поддержки математики
    markdown: {
      remarkPlugins: {
        'remark-math': {},
        'remark-gfm': {}
      },
      rehypePlugins: {
        'rehype-katex': {}
      }
    }
  },

  // Настройки для @nuxtjs/color-mode
  colorMode: {
    classSuffix: ''
  },

  // Настройки для @nuxtjs/google-fonts
  googleFonts: {
    families: {
      Inter: [400, 500, 700]
    }
  }
});