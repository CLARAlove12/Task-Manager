import { defineStore } from 'pinia'
import { taskApi } from '../api/tasks.js'

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    tasks: [],
    loading: false,
    error: null,
    filters: { search: '', priority: '', status: '' },
  }),

  getters: {
    byStatus: (state) => (status) => state.tasks.filter((t) => t.status === status),
  },

  actions: {
    async fetchTasks() {
      this.loading = true
      this.error = null
      try {
        const params = {}
        if (this.filters.search) params.search = this.filters.search
        if (this.filters.priority) params.priority = this.filters.priority
        if (this.filters.status) params.status = this.filters.status
        const res = await taskApi.getAll(params)
        this.tasks = res.data.data
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    async createTask(data) {
      const res = await taskApi.create(data)
      this.tasks.unshift(res.data.data)
    },

    async updateTask(id, data) {
      const res = await taskApi.update(id, data)
      const index = this.tasks.findIndex((t) => t.id === id)
      if (index !== -1) this.tasks[index] = res.data.data
    },

    async deleteTask(id) {
      await taskApi.remove(id)
      this.tasks = this.tasks.filter((t) => t.id !== id)
    },

    setFilter(key, value) {
      this.filters[key] = value
      this.fetchTasks()
    },
  },
})