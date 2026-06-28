<template>
  <div class="search-bar">
    <input
      :value="store.filters.search"
      @input="store.setFilter('search', $event.target.value)"
      type="text"
      placeholder="Search tasks..."
    />
    <select :value="store.filters.priority" @change="store.setFilter('priority', $event.target.value)">
      <option value="">All priorities</option>
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
    </select>
  </div>
</template>

<script setup>
import { useTaskStore } from '../store/taskStore.js'
const store = useTaskStore()
</script>

<style scoped>
.search-bar { display: flex; gap: 10px; margin-bottom: 24px; }
.search-bar input { flex: 1; padding: 9px 14px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px; outline: none; }
.search-bar input:focus { border-color: #4f46e5; }
.search-bar select { padding: 9px 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px; outline: none; }
</style>