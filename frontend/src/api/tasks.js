import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

export const taskApi = {
  getAll(params = {}) { return api.get('/tasks', { params }) },
  getOne(id) { return api.get(`/tasks/${id}`) },
  create(data) { return api.post('/tasks', data) },
  update(id, data) { return api.put(`/tasks/${id}`, data) },
  remove(id) { return api.delete(`/tasks/${id}`) },
}