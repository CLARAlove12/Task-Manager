<template>
  <div class="list-view">
    <SearchBar />
    <table class="task-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Status</th>
          <th>Priority</th>
          <th>Deadline</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in store.tasks" :key="task.id">
          <td>{{ task.title }}</td>
          <td><span class="badge" :class="task.status">{{ task.status }}</span></td>
          <td><span class="badge" :class="task.priority">{{ task.priority }}</span></td>
          <td>{{ task.deadline ? formatDate(task.deadline) : '-' }}</td>
          <td>
            <button @click="openEdit(task)">Edit</button>
            <button @click="store.deleteTask(task.id)" class="btn-danger">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <button class="btn-add" @click="openCreate">+ New Task</button>
    <TaskModal v-if="showModal" :task="selectedTask" @close="closeModal" @submit="handleSubmit" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useTaskStore } from '../store/taskStore.js'
import TaskModal from '../components/TaskModal.vue'
import SearchBar from '../components/SearchBar.vue'

const store = useTaskStore()
const showModal = ref(false)
const selectedTask = ref(null)

onMounted(() => store.fetchTasks())

function formatDate(date) { return new Date(date).toLocaleDateString('fr-FR') }
function openCreate() { selectedTask.value = null; showModal.value = true }
function openEdit(task) { selectedTask.value = task; showModal.value = true }
function closeModal() { showModal.value = false; selectedTask.value = null }

async function handleSubmit(form) {
  if (form.id) { await store.updateTask(form.id, form) }
  else { await store.createTask(form) }
  closeModal()
}
</script>

<style scoped>
.list-view { padding: 24px; max-width: 1100px; margin: 0 auto; }
.task-table { width: 100%; border-collapse: collapse; font-size: 14px; }
.task-table th { text-align: left; padding: 10px 14px; background: #f4f5f7; font-weight: 700; color: #444; border-bottom: 2px solid #e0e0e0; }
.task-table td { padding: 10px 14px; border-bottom: 1px solid #eee; color: #333; }
.badge { padding: 3px 8px; border-radius: 4px; font-size: 11px; font-weight: 600; text-transform: uppercase; }
.badge.todo { background: #e3f2fd; color: #1565c0; }
.badge.in_progress { background: #fff8e1; color: #f57f17; }
.badge.done { background: #e8f5e9; color: #2e7d32; }
.badge.low { background: #e8f5e9; color: #2e7d32; }
.badge.medium { background: #fff8e1; color: #f57f17; }
.badge.high { background: #fdecea; color: #c62828; }
.task-table button { font-size: 12px; padding: 4px 10px; margin-right: 6px; border: none; border-radius: 4px; cursor: pointer; background: #e0e0e0; }
.btn-danger { background: #fdecea; color: #f44336; }
.btn-add { margin-top: 20px; padding: 10px 20px; background: #4f46e5; color: #fff; border: none; border-radius: 6px; font-size: 14px; font-weight: 600; cursor: pointer; }
</style>