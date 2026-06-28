import { createRouter, createWebHistory } from 'vue-router'
import KanbanView from '../views/KanbanView.vue'
import ListView from '../views/ListView.vue'

const routes = [
  { path: '/', redirect: '/kanban' },
  { path: '/kanban', name: 'Kanban', component: KanbanView },
  { path: '/list', name: 'List', component: ListView },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})