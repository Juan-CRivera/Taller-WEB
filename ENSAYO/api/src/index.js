const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.disable('x-powered-by');
app.use(express.json());
app.use(cors({ origin: process.env.ALLOWED_ORIGIN || '*' }));

// Healthcheck
app.get('/api/v1/health', (req, res) => res.json({ ok: true, ts: Date.now() }));

// Demo de recurso
const todos = [
  { id: 1, title: 'Aprender REST', done: false },
  { id: 2, title: 'Unir con frontend', done: true }
];
let nextId = 3;

app.get('/api/v1/todos', (req, res) => res.json({ data: todos }));

app.post('/api/v1/todos', (req, res) => {
  const { title } = req.body || {};
  if (!title) return res.status(400).json({ error: 'title es requerido' });
  const nuevo = { id: nextId++, title, done: false };
  todos.push(nuevo);
  res.status(201).json(nuevo);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`API escuchando en http://localhost:${port}`));
