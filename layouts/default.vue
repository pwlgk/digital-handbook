<!-- layouts/default.vue -->
<template>
  <div class="app-layout">
    <aside class="sidebar">
      <div class="sidebar-header">
        <h3>Содержание</h3>
        <ThemeSwitcher />
      </div>
      
      <ContentNavigation v-slot="{ navigation }">
        <RecursiveNav :links="navigation" />
      </ContentNavigation>

    </aside>
    <main class="main-content">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.app-layout {
  display: flex;
  min-height: 100vh;
}
.sidebar {
  width: 280px;
  flex-shrink: 0;
  padding: 2rem;
  border-right: 1px solid var(--border-color);
  background-color: var(--bg-color-soft);
  transition: border-color 0.3s, background-color 0.3s;
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
.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.sidebar ul ul {
  padding-left: 1rem;
}
.sidebar li {
  margin: 0.5rem 0;
}
.sidebar a {
  text-decoration: none;
  color: var(--text-color-light);
  font-weight: 500;
  display: block;
  padding: 4px 8px;
  border-radius: 6px;
  transition: color 0.2s, background-color 0.2s;
}
.sidebar a:hover {
  color: var(--text-color);
}
.sidebar a.router-link-exact-active {
  background-color: var(--link-color);
  color: white;
}
html.dark .sidebar a.router-link-exact-active {
  color: var(--heading-color);
}

.main-content {
  flex-grow: 1;
  padding: 2rem 4rem;
}
/* Обертка для контента, чтобы ограничить ширину текста для читабельности */
:deep(.prose) {
  max-width: 80ch;
}
</style>