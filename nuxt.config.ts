// nuxt.config.ts

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  // Включаем DevTools для удобной разработки
  devtools: { enabled: true },

  // --- МОДУЛИ ---
  // Здесь мы подключаем все расширения для нашего проекта
  modules: [
    // Модуль для работы с контентом из markdown-файлов
    '@nuxt/content',
    // Модуль для переключения цветовой темы (светлая/темная)
    '@nuxtjs/color-mode',
    // Модуль для легкой интеграции Google Fonts
    '@nuxtjs/google-fonts'
  ],

  // --- ГЛОБАЛЬНЫЕ СТИЛИ ---
  // Подключаем наш основной файл со стилями и CSS-переменными
  css: [
    '~/assets/css/main.css'
  ],

  // --- НАСТРОЙКИ МОДУЛЕЙ ---

  // Настройки для @nuxt/content
  content: {
    // Настраиваем подсветку синтаксиса в блоках кода
    highlight: {
      // Выбираем тему для подсветки. 'github-dark' выглядит отлично в обеих темах.
      theme: 'github-dark'
    }
  },

  // Настройки для @nuxtjs/color-mode
  colorMode: {
    // Убираем суффикс '-mode' у класса.
    // Теперь к <html> будет добавляться просто класс 'dark', а не 'dark-mode'.
    classSuffix: ''
  },

  // Настройки для @nuxtjs/google-fonts
  googleFonts: {
    // Указываем, какие шрифты и с какими начертаниями мы хотим загрузить
    families: {
      // Загружаем шрифт Inter с нормальным, средним и жирным начертанием
      Inter: [400, 500, 700]
    }
  }
})