<!-- layouts/default.vue -->
<template>
  <div class="app-layout" :class="{ 'sidebar-open': isSidebarOpen }">
    <!-- Оверлей для затемнения контента при открытом сайдбаре на мобильных -->
    <div class="sidebar-overlay" @click="toggleSidebar"></div>
    
    <!-- Боковая панель -->
    <aside class="sidebar">
      <div class="sidebar-header">
        <h3>Содержание</h3>
        <ThemeSwitcher />
      </div>
      <nav @click="closeSidebarOnMobile">
        <ContentNavigation v-slot="{ navigation }">
          <RecursiveNav :links="navigation" />
        </ContentNavigation>
      </nav>
    </aside>

    <!-- Объединяем шапку и контент в один блок -->
    <div class="main-container">
      <!-- Мобильная шапка -->
      <header class="mobile-header">
        <button class="mobile-nav-toggle" @click="toggleSidebar">
          <span></span><span></span><span></span>
        </button>
        <span class="header-title">{{ pageTitle }}</span>
      </header>

      <!-- Основной контент -->
      <main class="main-content">
        <slot />
      </main>
      <footer class="main-footer">
        <div class="footer-content">
          <p>© 2025. Все права защищены. Разработка платформы – <a href="https://github.com/pwlgk" target="_blank">P.Geiko</a>.</p>
          <!-- <p>Разработка платформы – <a href="https://github.com/pwlgk" target="_blank">P.Geiko</a>.</p> -->
          <p><NuxtLink to="/contributors">Все участники проекта</NuxtLink></p>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { usePageTitle } from '~/composables/states';

const isSidebarOpen = ref(false);

// Мы просто читаем заголовок из глобального хранилища. Больше ничего не нужно.
const pageTitle = usePageTitle();

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
}

function closeSidebarOnMobile() {
  if (window.innerWidth < 992) {
    isSidebarOpen.value = false;
  }
}
</script>

<style scoped>
/* --- ОБЩИЕ СТИЛИ ЛАЙАУТА --- */
.app-layout {
  display: flex;
  position: relative;
}

/* --- САЙДБАР --- */
.sidebar {
  width: 320px; /* Увеличена ширина */
  flex-shrink: 0;
  padding: 1.5rem;
  border-right: 1px solid var(--border-color);
  background-color: var(--bg-color-soft);
  transition: transform 0.3s ease-in-out;
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  overflow-y: auto;
  z-index: 1000;
  box-sizing: border-box;

  /* Скрываем скроллбар */
  -ms-overflow-style: none;  /* IE и Edge */
  scrollbar-width: none;  /* Firefox */
}
.sidebar::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.sidebar h3 {
  margin: 0;
  color: var(--heading-color);
}

nav {
  margin-top: 1rem;
}

/* --- КОНТЕЙНЕР ДЛЯ ШАПКИ И КОНТЕНТА --- */
.main-container {
  flex-grow: 1;
  margin-left: 320px; /* Обновлен отступ под новую ширину сайдбара */
  width: calc(100% - 320px);
}

.main-content {
  padding: 2rem;
}

/* --- МОБИЛЬНАЯ ШАПКА --- */
.mobile-header {
  display: none;
  position: sticky;
  top: 0;
  z-index: 998;
  padding: 0 1rem;
  height: 60px;
  background-color: var(--bg-color);
  border-bottom: 1px solid var(--border-color);
  align-items: center;
  gap: 1rem;
}

.header-title {
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.mobile-nav-toggle {
  background: transparent;
  border: none;
  width: 44px;
  height: 44px;
  padding: 8px;
  cursor: pointer;
  flex-shrink: 0;
}

.mobile-nav-toggle span {
  display: block;
  width: 24px;
  height: 2px;
  background-color: var(--text-color);
  margin: 5px 0;
  transition: transform 0.3s, opacity 0.3s;
}

.sidebar-overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

/* --- МЕДИА-ЗАПРОС ДЛЯ АДАПТИВНОСТИ --- */
@media (max-width: 992px) {
  .sidebar {
    transform: translateX(-100%);
  }
  
  .main-container {
    width: 100%;
    margin-left: 0;
  }
  
  .main-content {
    padding: 1.5rem;
  }
  
  .mobile-header {
    display: flex;
  }

  /* Стили для открытого сайдбара */
  .app-layout.sidebar-open .sidebar {
    transform: translateX(0);
    box-shadow: 2px 0 15px rgba(0,0,0,0.1);
  }

  .app-layout.sidebar-open .sidebar-overlay {
    display: block;
  }

  /* Анимация "крестика" для бургера */
  .app-layout.sidebar-open .mobile-nav-toggle span:nth-child(1) {
    transform: translateY(7px) rotate(45deg);
  }
  .app-layout.sidebar-open .mobile-nav-toggle span:nth-child(2) {
    opacity: 0;
  }
  .app-layout.sidebar-open .mobile-nav-toggle span:nth-child(3) {
    transform: translateY(-7px) rotate(-45deg);
  }
}
.main-footer {
  padding: 2rem;
  margin-top: 2rem;
  border-top: 1px solid var(--border-color);
  text-align: center;
}
.footer-content {
  max-width: 90ch;
  margin: 0 auto;
}
.main-footer p {
  margin: 0.5rem 0;
  font-size: 0.9rem;
  color: var(--text-color-light);
}
.main-footer a {
  color: var(--text-color);
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 2px;
}
.main-footer a:hover {
  color: var(--link-color);
}
@media (max-width: 992px) {
  .main-footer {
    padding: 1.5rem;
    margin-top: 1.5rem;
  }
}
</style>