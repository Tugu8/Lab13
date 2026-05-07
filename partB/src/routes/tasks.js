const express = require('express');
const router = express.Router();
const service = require('../services/taskService');
const labelService = require('../services/labelService');

router.get('/', (req, res) => {
  const { search, priority, status, label } = req.query;
  const tasks = service.getTasks({ search, priority, status, label });
  res.json({ data: tasks, meta: { total: tasks.length } });
});

router.get('/:id', (req, res) => {
  const task = service.getTask(Number(req.params.id));
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json({ data: task });
});

router.post('/', (req, res) => {
  try {
    const task = service.createTask(req.body);
    res.status(201).json({ data: task });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

router.put('/:id', (req, res) => {
  try {
    const task = service.updateTask(Number(req.params.id), req.body);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json({ data: task });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

router.delete('/:id', (req, res) => {
  const deleted = service.deleteTask(Number(req.params.id));
  if (!deleted) return res.status(404).json({ error: 'Task not found' });
  res.status(200).json({ data: null, meta: { message: 'Task deleted' } });
});

router.post('/:id/labels/:labelId', (req, res) => {
  try {
    labelService.addLabelToTask(Number(req.params.id), Number(req.params.labelId));
    res.status(200).json({ data: null, meta: { message: 'Label added to task' } });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

router.delete('/:id/labels/:labelId', (req, res) => {
  try {
    labelService.removeLabelFromTask(Number(req.params.id), Number(req.params.labelId));
    res.status(200).json({ data: null, meta: { message: 'Label removed from task' } });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

module.exports = router;
