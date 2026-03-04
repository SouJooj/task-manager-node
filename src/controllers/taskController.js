//ponte do processo Requisição HTTP → Model → Resposta HTTP
const Task = require('../models/taskModel');
// Controlador responsável por retornar todas as tarefas
exports.getAllTasks = (req, res) => {
  Task.findAll((err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

exports.getTaskById = (req, res) => {
  const { id } = req.params;

  Task.findById(id, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results[0]);
  });
};

exports.createTask = (req, res) => {
  const newTask = req.body;

  Task.create(newTask, (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(201).json({ message: "Tarefa criada!" });
  });
};

exports.updateTask = (req, res) => {
  const { id } = req.params;
  const updatedTask = req.body;

  Task.update(id, updatedTask, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Tarefa atualizada!" });
  });
};

exports.deleteTask = (req, res) => {
  const { id } = req.params;

  Task.delete(id, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Tarefa deletada!" });
  });
};