// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const TodoManager = require('./todoManager'); // Assuming you have a TodoManager class handling todo operations

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Initialize TodoManager
const todoManager = new TodoManager();

// Routes
app.get('/api/todos', (req, res) => {
  const todos = todoManager.getAllTodos();
  res.json(todos);
});

app.post('/api/todos', (req, res) => {
  const { task, dueDate } = req.body;
  const newTodo = todoManager.addTodo(task, dueDate);
  res.json(newTodo);
});

app.put('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const { task } = req.body;
  const updatedTodo = todoManager.editTodo(id, task);
  res.json(updatedTodo);
});

app.delete('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  todoManager.deleteTodo(id);
  res.json({ message: 'Todo deleted successfully' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
