<template>
  <div class="task-card" :class="task.priority">
    <div class="task-card__header">
      <span class="task-card__priority">{{ task.priority }}</span>
      <div class="task-card__actions">
        <button @click="$emit('edit', task)">Edit</button>
        <button @click="$emit('delete', task.id)" class="btn-danger">Delete</button>
      </div>
    </div>
    <h4 class="task-card__title">{{ task.title }}</h4>
    <p class="task-card__desc" v-if="task.description">{{ task.description }}</p>
    <div class="task-card__footer" v-if="task.deadline">
      <span class="task-card__deadline">{{ formatDate(task.deadline) }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({ task: Object })
defineEmits(['edit', 'delete'])
function formatDate(date) {
  return new Date(date).toLocaleDateString('fr-FR')
}
</script>

<style scoped>
.task-card { background: #fff; border-radius: 8px; padding: 14px; margin-bottom: 10px; border-left: 4px solid #ccc; box-shadow: 0 1px 4px rgba(0,0,0,0.08); }
.task-card.low { border-left-color: #4caf50; }
.task-card.medium { border-left-color: #ff9800; }
.task-card.high { border-left-color: #f44336; }
.task-card__header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
.task-card__priority { font-size: 11px; text-transform: uppercase; font-weight: 600; color: #888; }
.task-card__actions button { font-size: 12px; margin-left: 6px; padding: 3px 8px; border: none; border-radius: 4px; cursor: pointer; background: #e0e0e0; }
.task-card__actions .btn-danger { background: #fdecea; color: #f44336; }
.task-card__title { margin: 0 0 6px; font-size: 14px; font-weight: 600; color: #1a1a2e; }
.task-card__desc { font-size: 13px; color: #666; margin: 0 0 8px; }
.task-card__deadline { font-size: 12px; color: #999; }
</style>