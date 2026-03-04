//código que conversa com o bd
const db = require('../config/db');

const Task = {
// Busca todas as tarefas no banco
  findAll: (callback) => {
    const sql = 'SELECT * FROM tasks';
    db.query(sql, callback);
  },

  findById: (id, callback) => {
    const sql = 'SELECT * FROM tasks WHERE id = ?';
    db.query(sql, [id], callback);
  },

  create: (task, callback) => {
    const sql = 'INSERT INTO tasks (title, description, completed) VALUES (?, ?, ?)';
    db.query(sql, [task.title, task.description, task.completed], callback);
  },

  update: (id, task, callback) => {
    const sql = 'UPDATE tasks SET title = ?, description = ?, completed = ? WHERE id = ?';
    db.query(sql, [task.title, task.description, task.completed, id], callback);
  },

  delete: (id, callback) => {
    const sql = 'DELETE FROM tasks WHERE id = ?';
    db.query(sql, [id], callback);
  }

};

module.exports = Task;