const db = require('../config/db');

const TaskModel = {
  async findAll(filters = {}) {
    let query = 'SELECT * FROM tasks';
    const params = [];
    const conditions = [];

    if (filters.search) {
      conditions.push('(title LIKE ? OR description LIKE ?)');
      params.push(`%${filters.search}%`, `%${filters.search}%`);
    }

    if (filters.priority) {
      conditions.push('priority = ?');
      params.push(filters.priority);
    }

    if (filters.status) {
      conditions.push('status = ?');
      params.push(filters.status);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY created_at DESC';
    const [rows] = await db.execute(query, params);
    return rows;
  },

  async findById(id) {
    const [rows] = await db.execute('SELECT * FROM tasks WHERE id = ?', [id]);
    return rows[0] || null;
  },

  async create(data) {
    const { title, description, status, priority, deadline } = data;
    const [result] = await db.execute(
      'INSERT INTO tasks (title, description, status, priority, deadline) VALUES (?, ?, ?, ?, ?)',
      [title, description || null, status || 'todo', priority || 'medium', deadline || null]
    );
    return this.findById(result.insertId);
  },

  async update(id, data) {
    const { title, description, status, priority, deadline } = data;
    await db.execute(
      'UPDATE tasks SET title = ?, description = ?, status = ?, priority = ?, deadline = ? WHERE id = ?',
      [title, description || null, status, priority, deadline || null, id]
    );
    return this.findById(id);
  },

  async delete(id) {
    const [result] = await db.execute('DELETE FROM tasks WHERE id = ?', [id]);
    return result.affectedRows > 0;
  },
};

module.exports = TaskModel;