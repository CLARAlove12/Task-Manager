<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal">
      <h3>{{ form.id ? 'Edit Task' : 'New Task' }}</h3>
      <div class="form-group">
        <label>Title</label>
        <input v-model="form.title" type="text" placeholder="Task title" />
      </div>
      <div class="form-group">
        <label>Description</label>
        <textarea v-model="form.description" rows="3" placeholder="Optional description"></textarea>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Priority</label>
          <select v-model="form.priority">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div class="form-group">
          <label>Status</label>
          <select v-model="form.status">
            <option value="todo">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
      </div>
      <div class="form-group">
        <label>Deadline</label>
        <input v-model="form.deadline" type="date" />
      </div>
      <div class="modal__actions">
        <button @click="$emit('close')" class="btn-cancel">Cancel</button>
        <button @click="submit" class="btn-submit">{{ form.id ? 'Update' : 'Create' }}</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({ task: Object })
const emit = defineEmits(['close', 'submit'])

const form = reactive({ id: null, title: '', description: '', priority: 'medium', status: 'todo', deadline: '' })

watch(() => props.task, (val) => {
  if (val) {
    form.id = val.id
    form.title = val.title
    form.description = val.description || ''
    form.priority = val.priority
    form.status = val.status
    form.deadline = val.deadline ? val.deadline.substring(0, 10) : ''
  } else {
    form.id = null
    form.title = ''
    form.description = ''
    form.priority = 'medium'
    form.status = 'todo'
    form.deadline = ''
  }
}, { immediate: true })

function submit() {
  if (!form.title.trim()) return
  emit('submit', { ...form })
}
</script>

<style scoped>
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; z-index: 100; }
.modal { background: #fff; border-radius: 10px; padding: 28px; width: 480px; max-width: 95vw; }
.modal h3 { margin: 0 0 20px; font-size: 18px; color: #1a1a2e; }
.form-group { margin-bottom: 14px; display: flex; flex-direction: column; gap: 5px; }
.form-group label { font-size: 13px; font-weight: 600; color: #555; }
.form-group input, .form-group select, .form-group textarea { padding: 9px 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px; outline: none; }
.form-group input:focus, .form-group select:focus, .form-group textarea:focus { border-color: #4f46e5; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.modal__actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px; }
.btn-cancel { padding: 9px 18px; border: 1px solid #ddd; border-radius: 6px; background: #fff; cursor: pointer; }
.btn-submit { padding: 9px 18px; border: none; border-radius: 6px; background: #4f46e5; color: #fff; cursor: pointer; font-weight: 600; }
</style>