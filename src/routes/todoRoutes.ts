import { Router } from 'express';
import { getTodos, addTodo, toggleTodo, deleteTodo } from '../controllers/todoController';

const router = Router();

router.get('/todos', getTodos);
router.post('/todos', addTodo);
router.patch('/todos/:id', toggleTodo);
router.delete('/todos/:id', deleteTodo);

export default router;
