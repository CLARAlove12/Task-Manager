<template>
  <div class="kanban">
    <SearchBar />
    <div class="kanban__board">
      <div class="kanban__column" v-for="col in columns" :key="col.key">
        <div class="kanban__column-header">
          <span>{{ col.label }}</span>
          <span class="kanban__count">{{ store.byStatus(col.key).length }}</span>
        </div>
        <TaskCard
          v-for="task in store.byStatus(col.key)"
          :key="task.id"
          :task="task"
          @edit="openEdit"
          @delete="removeTask"
        />
      </div>
    </div>
    <button class="btn-add" @click="openCreate">+ New Task</button>
    <TaskModal v-if="showModal" :task="selectedTask" @close="closeModal" @submit="handleSubmit" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useTaskStore } from '../store/taskStore.js'
import TaskCard from '../components/TaskCard.vue'
import TaskModal from '../components/TaskModal.vue'
import SearchBar from '../components/SearchBar.vue'

const store = useTaskStore()
const showModal = ref(false)
const selectedTask = ref(null)

const columns = [
  { key: 'todo', label: 'To Do' },
  { key: 'in_progress', label: 'In Progress' },
  { key: 'done', label: 'Done' },
]

onMounted(() => store.fetchTasks())

function openCreate() { selectedTask.value = null; showModal.value = true }
function openEdit(task) { selectedTask.value = task; showModal.value = true }
function closeModal() { showModal.value = false; selectedTask.value = null }

async function handleSubmit(form) {
  if (form.id) { await store.updateTask(form.id, form) }
  else { await store.createTask(form) }
  closeModal()
}

async function removeTask(id) { await store.deleteTask(id) }
</script>

<style scoped>
.kanban { padding: 24px; max-width: 1200px; margin: 0 auto; }
.kanban__board { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.kanban__column { background: #f4f5f7; border-radius: 10px; padding: 16px; min-height: 400px; }
.kanban__column-header { display: flex; justify-content: space-between; align-items: center; font-weight: 700; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; color: #444; margin-bottom: 14px; }
.kanban__count { background: #e0e0e0; border-radius: 12px; padding: 2px 8px; font-size: 12px; font-weight: 600; }
.btn-add { margin-top: 24px; padding: 10px 20px; background: #4f46e5; color: #fff; border: none; border-radius: 6px; font-size: 14px; font-weight: 600; cursor: pointer; }
</style>