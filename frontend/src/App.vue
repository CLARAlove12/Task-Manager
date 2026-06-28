<template>
  <div id="app">
    <nav class="navbar">
      <span class="navbar__brand">Task Manager</span>
      <div class="navbar__links">
        <RouterLink to="/kanban">Kanban</RouterLink>
        <RouterLink to="/list">List</RouterLink>
      </div>
    </nav>
    <main>
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Inter', sans-serif; background: #f9fafb; color: #1a1a2e; }
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 32px;
  background: #1a1a2e;
  color: #fff;
}
.navbar__brand { font-weight: 700; font-size: 18px; }
.navbar__links { display: flex; gap: 20px; }
.navbar__links a { color: #ccc; text-decoration: none; font-size: 14px; font-weight: 500; }
.navbar__links a.router-link-active { color: #fff; font-weight: 700; }
main { min-height: calc(100vh - 60px); }
</style>