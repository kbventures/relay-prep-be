import { Request, Response } from 'express';
import { Todo } from '../models/todo'; // Import the Todo model

export const getTodos = async (req: Request, res: Response) => {
  try {
    const todos = await Todo.findAll();
    res.json(todos);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
};

export const addTodo = async (req: Request, res: Response) => {
  const { text } = req.body;
  try {
    const todo = await Todo.create({ text });
    res.status(201).json(todo);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
};

export const toggleTodo = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const todo = await Todo.findByPk(id);
    if (todo) {
      todo.completed = !todo.completed;
      await todo.save();
      res.json(todo);
    } else {
      res.status(404).json({ error: 'Todo not found' });
    }
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const todo = await Todo.findByPk(id);
    if (todo) {
      await todo.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Todo not found' });
    }
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
};
