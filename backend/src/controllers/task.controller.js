const TaskModel = require('../models/task.model');

const TaskController = {
  async getAll(req, res) {
    try {
      const filters = {
        search: req.query.search || null,
        priority: req.query.priority || null,
        status: req.query.status || null,
      };
      const tasks = await TaskModel.findAll(filters);
      res.json({ success: true, data: tasks });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async getOne(req, res) {
    try {
      const task = await TaskModel.findById(req.params.id);
      if (!task) return res.status(404).json({ success: false, message: 'Task not found' });
      res.json({ success: true, data: task });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async create(req, res) {
    try {
      const { title } = req.body;
      if (!title || title.trim() === '') {
        return res.status(400).json({ success: false, message: 'Title is required' });
      }
      const task = await TaskModel.create(req.body);
      res.status(201).json({ success: true, data: task });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async update(req, res) {
    try {
      const existing = await TaskModel.findById(req.params.id);
      if (!existing) return res.status(404).json({ success: false, message: 'Task not found' });
      const task = await TaskModel.update(req.params.id, req.body);
      res.json({ success: true, data: task });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async remove(req, res) {
    try {
      const deleted = await TaskModel.delete(req.params.id);
      if (!deleted) return res.status(404).json({ success: false, message: 'Task not found' });
      res.json({ success: true, message: 'Task deleted' });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },
};

module.exports = TaskController;